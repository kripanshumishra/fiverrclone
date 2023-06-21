const { getOrders, newOrder } = require("../controller/order.controller");
const { verifyToken } = require( "../middleware/jwt" )
const router = require( "express" ).Router();

router.get( "/" , verifyToken ,  getOrders  );
router.post( "/:id" , verifyToken , newOrder )

module.exports = router;