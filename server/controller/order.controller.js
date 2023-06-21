/*
-> create the new order
-> confirm the order
-> view all the orders related to user

*/

const createError = require("../utils/createError");
const Order = require("../models/order.model");
const Gig = require("../models/gig.model");


const getOrders = async (req, res, next) => {
  try {
    const query = { 
      isCompleted : true , 
      ...(req.isSeller ? {
        seller : req.userId
    } : {
        buyer : req.userId
    }) };
    const orders = await Order.find( query );
    res.status( 200 ).send( orders )
  } catch (error) {
    console.log("getOrder()", error);
    next(error);
  }
};

const newOrder = async ( req , res , next ) =>{
    try {
        const gig = await Gig.findById( req.params.id );
        if ( req.isSeller ) return next ( createError( 403 , "sellers are not allowed to make order" ) )
        const order = new Order( {
            gigId : gig._id , 
            price : gig.price,
            img : gig.cover,
            title : gig.title, 
            buyer : req.userId,
            seller : gig.user , 
            payment_intent : "gibrish value",

        } );
        await order.save()
        res.status( 200 ).send( "order created" )
    } catch (error) {
        console.log( "newOrder()" , error );
        next ( error );
    }
};


module.exports  = { newOrder , getOrders };