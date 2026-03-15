 function verificarRol(...roles){
    return( req, res, next)=> {
        if (!roles.includes(res.usuario.rol)){
            return res.status(403).json({
                error: 'No tienes permiso para hacer esto'
            })
        }
        next()
    }
 }
  
 module.exports = verificarRol