const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// =========================
// WEBHOOK STRIPE (IMPORTANTE)
// =========================
router.post('/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    let event

    try {
      const signature = req.headers['stripe-signature']

      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook error:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // 👉 aquí procesas eventos reales
    if (event.type === 'payment_intent.succeeded') {
      console.log('Pago exitoso:', event.data.object.id)
    }

    res.json({ received: true })
  }
)

// =========================
// EJEMPLO DE RUTA NORMAL
// =========================
router.post('/crear-pago', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'eur'
    })

    res.json(paymentIntent)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router