const express = require('express')
  const router = express.Router()
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  const supabase = require('../config/supabase')
  const verificarToken = require('../middleware/auth')
  const verificarRol = require('../middleware/roles')

  // POST /api/pagos/crear-intent
  router.post('/crear-intent', verificarToken, verificarRol('consumidor'), async (req, res) => {
    try {
      const { items } = req.body

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'items es obligatorio y debe ser un array no vacío' })
      }

      for (const item of items) {
        if (!item.producto_id || !item.cantidad || item.cantidad <= 0) {
          return res.status(400).json({ error: 'Cada item debe tener producto_id y cantidad válida' })
        }
      }

      const productoIds = items.map(i => i.producto_id)

      const { data: productos, error: errorProductos } = await supabase
        .from('productos')
        .select('id, precio_por_kg')
        .in('id', productoIds)

      if (errorProductos) return res.status(400).json({ error: errorProductos.message })

      if (productos.length !== productoIds.length) {
        return res.status(404).json({ error: 'Uno o más productos no encontrados' })
      }

      const precioMap = {}
      for (const p of productos) {
        precioMap[p.id] = p.precio_por_kg
      }

      let total = 0
      for (const item of items) {
        total += precioMap[item.producto_id] * item.cantidad
      }

      const totalConComision = parseFloat((total * 1.05).toFixed(2))
      const totalCentimos = Math.round(totalConComision * 100)

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCentimos,
        currency: 'eur',
      })

      res.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // POST /api/pagos/webhook
  // ⚠️  req.body es Buffer crudo aquí (registrado con express.raw en server.js)
  router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature']

    if (!sig) {
      return res.status(400).json({ error: 'Falta stripe-signature' })
    }

    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook firma inválida:', err.message)
      return res.status(400).json({ error: `Webhook error: ${err.message}` })
    }

    // Solo procesar payment_intent.succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      const stripePaymentId = paymentIntent.id

      console.log(`Webhook: payment_intent.succeeded → ${stripePaymentId}`)

      try {
        // Buscar el pedido por stripe_payment_id
        const { data: pedido, error: errorBusca } = await supabase
          .from('pedidos')
          .select('id, estado')
          .eq('stripe_payment_id', stripePaymentId)
          .maybeSingle()

        if (errorBusca) {
          console.error('Error buscando pedido:', errorBusca.message)
          return res.status(500).json({ error: errorBusca.message })
        }

        if (!pedido) {
          // El pedido aún no existe (race condition: webhook más rápido que el POST /api/pedidos)
          // Stripe no reintentará si devolvemos 200, pero el frontend crea el pedido igualmente
          console.warn(`Webhook: no se encontró pedido para ${stripePaymentId}`)
          return res.json({ recibido: true })
        }

        // Evitar procesamiento duplicado
        if (pedido.estado === 'pagado') {
          console.log(`Webhook: pedido ${pedido.id} ya estaba marcado como pagado`)
          return res.json({ recibido: true })
        }

        // Marcar como pagado
        const { error: errorUpdate } = await supabase
          .from('pedidos')
          .update({ estado: 'pagado' })
          .eq('id', pedido.id)

        if (errorUpdate) {
          console.error('Error actualizando estado:', errorUpdate.message)
          return res.status(500).json({ error: errorUpdate.message })
        }

        console.log(`Webhook: pedido ${pedido.id} marcado como pagado`)
      } catch (err) {
        console.error('Error procesando webhook:', err.message)
        return res.status(500).json({ error: err.message })
      }
    }

    res.json({ recibido: true })
  })

  module.exports = router