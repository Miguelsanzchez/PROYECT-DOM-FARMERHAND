const express = require('express')
const cors = require ('cors')
require ('dotenv').config()

const app = express()

//Middlewares

app.use(cors())
app.use(express.json())

//Rutas
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const agricultoresRoutes = require('./routes/agricultores')
app.use('/api/agricultores', agricultoresRoutes)

const adminRoutes = require('./routes/admin')
app.use('/api/admin', adminRoutes)

const productosRoutes = require ('./routes/productos')
app.use('/api/productos', productosRoutes)

  const pedidosRoutes = require('./routes/pedidos')
  app.use('/api/pedidos', pedidosRoutes)

// Middleware de auth 
const verificarToken = require('./middleware/auth')


//ruta de prueba
app.get('/',(req,res)=>{
    res.json({mensaje: 'FarmerHand API funcionando'})
})

//Ruta protegida (prueba)
app.get('/api/protegida', verificarToken,(req,res)=> {
res.json({ mensaje: `Hola ${req.usuario.rol}, estás autenticado`})
})


//PUERTO
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    
})

//nota recordatoria)
/*## Por qué `/api/auth` Todas las rutas de autenticación empezarán por `/api/auth`.
```
/api/auth/registro    ← registro de usuario
/api/auth/login       ← login
/api/productos        ← catálogo
/api/pedidos          ← pedidos
/api/admin            ← panel admin */