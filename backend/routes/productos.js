const express = require ('express')
const supabase = require ('../config/supabase')
const verificarToken= require ('../middleware/auth')
const verificarRol = require('../middleware/roles')

const router = express.Router()

//POST /api/productos
//EL agricultor crea un producto

router.post('/', verificarToken, verificarRol('agricultor'), async (req, res) => {
   const {
    nombre,
    descripcion,
    precio_por_kg,
    categoria,
    tiempo_envio,
    envio_refrigerado
} = req.body

if (!nombre || !precio_por_kg) {
    return res.status(400).json({ error: 'Nombre y precio por kg son obligatorios'})
}

//Buscar el perfil del agricultor

const { data: agricultor } = await supabase

.from('agricultores')
.select('id, estado')
.eq('usuario_id',req.usuario.id)
.single()

if (!agricultor || agricultor.estado !== 'aprobado') {
    return res.status(403).json({error: 'Tu perfil de agricultor no esta aprobado'})
}
 
const {data, error} = await supabase
.from('productos')
.insert([{
    agricultor_id: agricultor.id,
    nombre,
    descripcion,
    precio_por_kg,
    categoria,
    tiempo_envio,
    envio_refrigerado: envio_refrigerado || false,
    disponible: true
}])
.select()

if (error) {
    return res.status(400).json({error: error.message})   
}

res.status(201).json({ mensaje: 'Producto creado correctamente', producto: data[0]})
})

//GET /api/productos

//Listado público de todos los productos disponibles 

router.get('/', async (req,res)=>{
    const { data, error} = await supabase
    .from('productos')
    .select(`*, 
        agricultores (nombre_finca, localizacion, valoracion_media)
`)
    .eq('disponible', true)

    if (error) {
        return res.status(400).json({ error: error.message})
  }
    res.json(data)

})

//GET /api/productos/ mis-productos
//El agricultor ve sus propios productos

router.get('/mis-productos', verificarToken, verificarRol('agricultores'),async (req, res) => {

    const { data:agricultor} = await supabase
    .from('agricultores')
    .select('id')
    .eq ('usuario_id', req.usuario.id)
    .single()

    if (!agricultor) {

    return res.status(404).json({ error: 'No tiene perfil de agricultor'})
        
    }

    const {data , error} = await supabase
    .from ('productos')
    .select ('*')
    .eq ('agricultor_id', agricultor.id)

    if (error) {
        return res.status(400).json({ error: error.message})
    }
    res.json(data)
})

//PATCH /api/productos/id
// el agricultor edita un producto suyo

  router.patch ('/:id', verificarToken, verificarRol('agricultor'), async (req,res)=>{
    const {id} = req.params
    const {data: agricultor } = await supabase 
    .from('agricultores')
    .select('id')
    .eq('usuario_id', req.usuario.id)
    .single()

    //Verificar que el producto es suyo 
    const {data: producto } = await supabase
    .from ('productos')
    .select('id')
    .eq ('id',id)
    .eq ('agricultor_id', agricultor.id)
    .single()

    if (!producto) {
        return res.status(400).json ({error: 'No tienes permiso para editar este producto'})
     }

     const {data, error} = await supabase
     .from('productos')
     .update(req.body)
     .eq('id', id)
     .select()

     if (error) {
        return res.status(400).json({ error: error.message})
     }

     res.json({ mensaje:'Producto actualizado', producto: data [0]})

})


//DELETE /api/productos/ :id
// el agricultor elimina un producto suyo

router.delete('/:id', verificarToken, verificarRol('agricultor'), async (req, res) =>{
 const  { id } = req.params

 const {data: agricultor} = await supabase
 .from('agricultores')
 .select ('id')
 .eq('usuario_id', req.usuario.id)
 .single()

const {data : producto } = await supabase
.from('productos')
.select('id')
.eq('id',id)
.eq('agricultor_id', agricultor.id)
.single()

 if (!producto) {
    return res.status(403).json({error: 'No tienes permiso para eliminar este producto'})

 }
 
     const {error }= await supabase
     .from('productos')
     .delete()
     .eq('id',id)

     if (error) {
        return res.status(400).json({ error: error.message})
        
     }
     res.json({ mensaje: 'Producto eliminado correctamente'})
})

module.exports = router