const BASE_URL = 'http://localhost:3001'
const STRIPE_PK = 'pk_test_51TGQw70lqcMUELNH6acCWjNq0q5cBsD2hHKq6Oc7kQIdq27JvF3GPSxqFhsO47yoOamNlwxDqvaZEoajjQgFY4hO00Uue40aRr'

const token = localStorage.getItem('token')
if (!token) window.location.href = '/pages/login.html'

const carrito = JSON.parse(localStorage.getItem('carrito') || '[]')

const total = carrito.reduce((s, i) => s + i.precio_unidad * i.cantidad, 0)
const totalConComision = (total * 1.05).toFixed(2)

document.getElementById('resumen').innerHTML = `
  <strong>Productos:</strong> ${carrito.length}<br>
  <strong>Total:</strong> €${totalConComision}
`

const stripe = Stripe(STRIPE_PK)
let elements

async function iniciarPago() {
  const items = carrito.map(i => ({
    producto_id: i.producto_id,
    cantidad: i.cantidad
  }))

  const resp = await fetch(`${BASE_URL}/api/pagos/crear-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  })

  const data = await resp.json()

  if (!resp.ok) {
    document.getElementById('mensaje-error').textContent = data.error
    return
  }

  elements = stripe.elements({ clientSecret: data.clientSecret })
  const paymentElement = elements.create('payment')
  paymentElement.mount('#payment-element')
}

iniciarPago()

document.getElementById('form-pago').addEventListener('submit', async (e) => {
  e.preventDefault()

  const btn = document.getElementById('btn-pagar')
  btn.disabled = true
  btn.textContent = 'Procesando...'

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/pages/pagos-completado.html`
    }
  })

  if (error) {
    document.getElementById('mensaje-error').textContent = error.message
    btn.disabled = false
    btn.textContent = 'Pagar ahora'
  }
})