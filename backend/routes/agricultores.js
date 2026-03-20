const express = require ('express')
const supabase = require ('../config/supabase')
const verificarToken= require('../middleware/auth')
const verificarRol = require('../middleware/roles')


const router = express.Router()

//POST/api/agricultores/alta
//El agricultor envia su solicitud de alta

router.post('/alta', verificarToken, async (req, res)=> {
    const {
        nombre_finca,
        localizacion,
        descripcion,
        certificacion,
        foto_url,
        zonas_envio

    } = req.body
    
    if (!nombre_finca || !localizacion) {
        return res.status(400).json({ error: " El nombre de la finca y localizacion son obligatorios "}) 
    }

    //Comprobar que no tiene ya una solicitud
    const {data: existing} = await supabase
    .from('agricultores')
    .select('id')
    .eq('usuario_id', req.usuario.id)
    .single()

    if (existing) {
        return res.status(400).json({error:'Ya tienes una solicitud de alta enviada'})        
    }

    //Guardar la solicitud en Supabase
    const {data, error}= await supabase
    .from('agricultores')
    .insert([{
        usuario_id: req.usuario.id,
        nombre_finca,
        localizacion,
        descripcion,
        certificacion: certificacion || false,
        foto_url,
        zonas_envio,
        estado: 'pendiente'
    }])
    .select()

    if (error) {
        return res.status(400).json({ error: error.message})
        }

        res.status(201).json({ mensaje: 'Solicitud enviada correctamente', agricultor: data[0]})
    })
        //GET /api/agricultores
        //Lista pública de agricultores aprobados

        router.get('/', async (req, res)=> {
            const { data, error} = await supabase
            .from('agricultores')
            .select('*')
            .eq('estado','aprobado')

            if (error) {
                return res.status(400).json({ error: error.message})
                 }
                 res.json(data)
        })

        module.exports = router
