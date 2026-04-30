const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()

// 1. CORS — aplica a todas las rutas
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// 2. Raw body para webhook de Stripe — debe ir ANTES de express.json()
app.use('/api/pagos/webhook', express.raw({ type: 'application/json' }))

// 3. JSON parser global
app.use(express.json())

// 4. Rutas
const authRoutes = require('./routes/auth')
const agricultoresRoutes = require('./routes/agricultores')
const adminRoutes = require('./routes/admin')
const productosRoutes = require('./routes/productos')
const pedidosRoutes = require('./routes/pedidos')
const valoracionesRoutes = require('./routes/valoraciones')
const pagosRoutes = require('./routes/pagos')

app.use('/api/pagos', pagosRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/agricultores', agricultoresRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/productos', productosRoutes)
app.use('/api/pedidos', pedidosRoutes)
app.use('/api/valoraciones', valoracionesRoutes)

// Rutas de prueba
const verificarToken = require('./middleware/auth')
app.get('/', (req, res) => res.json({ mensaje: 'FarmerHand API funcionando' }))
app.get('/api/protegida', verificarToken, (req, res) => {
  res.json({ mensaje: `Hola ${req.usuario.rol}, estás autenticado` })
})
console.log("ENV CHECK:", {
  SUPABASE_URL: !!process.env.SUPABASE_URL,
  JWT_SECRET: !!process.env.JWT_SECRET,
  STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
