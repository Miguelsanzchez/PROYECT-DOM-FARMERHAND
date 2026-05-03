const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// POST /webhook — Verifica la firma de Stripe y procesa el evento
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

    if (event.type === 'payment_intent.succeeded') {
      console.log('Pago exitoso:', event.data.object.id)
    }

    res.json({ received: true })
  }
)

// POST /crear-intent — Crea un PaymentIntent en Stripe y devuelve el clientSecret
router.post('/crear-intent', async (req, res) => {
  try {
    const amount = Math.round(Number(req.body?.amount || 0))

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount inválido' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur'
    })

    res.json({ clientSecret: paymentIntent.client_secret })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
module.exports = router