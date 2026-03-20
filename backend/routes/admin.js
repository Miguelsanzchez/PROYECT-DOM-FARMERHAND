const express = require ('express')
const supabase = require ('../config/supabase')
const verificarToken= require('../middleware/auth')
const verificarRol = require('../middleware/roles')

const router = express.Router()

//GET /api/admin/solicitudes
//Ver todas las solicitudes pendientes

router.get('/solicitudes', verificarToken, verificarRol('admin'), async (req, res) => {
    const {data, error } = await supabase
    .from('agricultores')
    .select(`*, usuarios (nombre, email) `)
    .eq('estado', 'pendiente')

    if (error) {
        return res.status(400).json({ error: error.message})
         }
         res.json(data)
    })
    
    //PATCH api/admin/solicitud/:id
    //Aprobar o rechazar una solicitud
    
    router.patch('/solicitudes/:id' , verificarToken, verificarRol('admin'), async (req, res) => {
    
        const { id } = req.params
        const {estado} = req.body

        if (!['aprobado', 'rechazado'].includes(estado)) {
            return res.status(400).json({ error:'Estado debe ser aprobado o rechazado'})
              }

        const {data, error} = await supabase
        .from('agricultores')
        .update({estado})
        .eq('id', id)
        .select()

        if (error) {
            return res.status(400).json ({ error: error.message})
        }
      
        //Si se aprueba, ambiar el rol del Usuario a agricultor

        if (estado === 'aprobado') {
            await supabase
            .from('usuarios')
            .update({rol:'agricultor'})
          .eq('id',data[0].usuario_id)
             }
            
    res.json({ mensaje:`Solicitud ${estado} correctamente`, agricultor: data [0]})
    })

    //GET api/admin/usuarios
    //Ver todos los usuarios
    router.get('/usuarios', verificarToken,verificarRol('admin'), async (req, res)=> {
        const {data, error } = await supabase
        .from ('usuarios')
        .select('id, nombre, email, rol, created_at')

        if (error) {
            return res.status(400).json({ error: error.message})
        }

        res.json(data)
    })
    
    module.exports = router