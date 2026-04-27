const express = require('express')
const supabase = require('../config/supabase')
const verificarToken = require('../middleware/auth')
const verificarRol = require('../middleware/roles')

const router = express.Router()

// POST /api/pedidos - consumidor crea pedido
 router.post('/', verificarToken, verificarRol('consumidor'), async (req, res) => {
    try {
      const { direccion_envio, items, stripe_payment_id } = req.body || {}

      if (!direccion_envio || !items || !items.length) {
        return res.status(400).json({ error: 'Dirección de envío e items son obligatorios' })
      }

      if (!stripe_payment_id) {
        return res.status(400).json({ error: 'stripe_payment_id es obligatorio' })
      }

      const total = items.reduce((sum, i) => sum + i.precio_unidad * i.cantidad, 0)
      const comision = parseFloat((total * 0.05).toFixed(2))

      const { data: pedido, error: errorPedido } = await supabase
        .from('pedidos')
        .insert([{
          consumidor_id: req.usuario.id,
          total,
          comision,
          estado: 'pendiente',
          direccion_envio,
          stripe_payment_id
        }])
        .select()
        .single()

      if (errorPedido) return res.status(400).json({ error: errorPedido.message })

      const lineas = items.map(i => ({
        pedido_id: pedido.id,
        producto_id: i.producto_id,
        opcion_caja_id: i.opcion_caja_id || null,
        agricultor_id: i.agricultor_id,
        cantidad: i.cantidad,
        precio_unidad: i.precio_unidad
      }))

      const { error: errorLineas } = await supabase
        .from('lineas_pedido')
        .insert(lineas)

      if (errorLineas) return res.status(400).json({ error: errorLineas.message })

      res.status(201).json({ mensaje: 'Pedido creado correctamente', pedido })

    } catch (err) {
      console.error('Error en POST /api/pedidos:', err.message)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  })


// GET /api/pedidos/mis-pedidos - consumidor
router.get('/mis-pedidos', verificarToken, verificarRol('consumidor'), async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*, lineas_pedido(*, productos(nombre))')
    .eq('consumidor_id', req.usuario.id)
    .order('created_at', { ascending: false })

  if (error) return res.status(400).json({ error: error.message })

  res.json(data)
})


// GET /api/pedidos/recibidos - agricultor
router.get('/recibidos', verificarToken, verificarRol('agricultor'), async (req, res) => {

  const { data: agricultor } = await supabase
    .from('agricultores')
    .select('id')
    .eq('usuario_id', req.usuario.id)
    .single()

  if (!agricultor) {
    return res.status(404).json({ error: 'No tienes perfil de agricultor' })
  }

  const { data, error } = await supabase
    .from('lineas_pedido')
    .select(`
      *,
      pedidos(estado, direccion_envio, created_at, consumidor_id),
      productos(nombre)
    `)
    .eq('agricultor_id', agricultor.id)
    .order('created_at', { ascending: false })

  if (error) return res.status(400).json({ error: error.message })

  res.json(data)
})


// PATCH /api/pedidos/:id/estado - agricultor actualiza estado
router.patch('/:id/estado', verificarToken, verificarRol('agricultor'), async (req, res) => {
  const { id } = req.params
  const { estado } = req.body

  const estadosValidos = ['confirmado', 'enviado', 'entregado']

  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({
      error: `Estado no válido. Usa: ${estadosValidos.join(', ')}`
    })
  }

  const { data: agricultor } = await supabase
    .from('agricultores')
    .select('id')
    .eq('usuario_id', req.usuario.id)
    .single()

  if (!agricultor) {
    return res.status(404).json({ error: 'No tienes perfil de agricultor' })
  }

  // Verificar que el agricultor tiene líneas en ese pedido
  const { data: linea } = await supabase
    .from('lineas_pedido')
    .select('id')
    .eq('pedido_id', id)
    .eq('agricultor_id', agricultor.id)
    .limit(1)

  if (!linea || linea.length === 0) {
    return res.status(403).json({ error: 'No tienes permiso para actualizar este pedido' })
  }

  const { data, error } = await supabase
    .from('pedidos')
    .update({ estado })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })

  res.json({ mensaje: 'Estado actualizado', pedido: data })
})

module.exports = router