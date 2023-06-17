const router = require( "express" ).Router()
const { login , logout , register } = require( '../controller/auth.controller' )

router.post( "/register" , register )
router.post( "/login" , login )
router.post( "/logout" , logout )


module.exports = router