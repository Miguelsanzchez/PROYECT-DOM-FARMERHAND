const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const supabase = require ('../config/supabase')

const router = express.Router()

//POST /api/auth/registro
router.post('/registro', async (req, res)=> {
    const { nombre, email , password} = req.body

    //Validación básica
    if (!nombre || !email || !password ) {
        return res.status(400).json({error:'Todos los campos son obligatorios'})
     }

     // Para cifrar la contraseña

     const password_hash = await bcrypt.hash(password,10)

     //Guardar en supabase 
      const { data, error } = await supabase
      .from('usuarios')
      .insert([{nombre, email, password_hash}])
      .select()

      if (error) {
        return res.status(400).json({ error: error.message})
    }

    //GENERADOR TOKEN JWT

    const token = jwt.sign(
        { id: data[0].id, rol: data[0].rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d'}
 )

  res.status(201).json({token, usuario: data[0] })
})

//POST /api/ auth/login

router.post('/login', async(req, res)=> {
    const { email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({error: 'Email y contraseña obligatorios'})      
    
}

//Se busca el usuario por el email

const { data, error} = await supabase
.from('usuarios')
.select('*')
.eq('email', email)
.single()

if (error || !data) {
    return res.status(401).json({ error: 'Email o contraseña incorrecta'})
}

//Comparar contraseña con el hash guardado

const passwordValida = await bcrypt.compare(password, data.password_hash)

if (!passwordValida) {
    return res.status(401).json({ error:'Email o contraseña incorrectos'})
    
}

 //Generar Token

 const token = jwt.sign(
    { id: data.id, rol:data.rol},
    process.env.JWT_SECRET,
 { expiresIn: '7d'}
 )
  res.json ({ token, usuario: data})

})
module.exports = router
