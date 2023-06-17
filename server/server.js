// module imports 
const express = require( "express" );
const mongoose = require( "mongoose" );
const cors = require( "cors" );
const cookieParser = require("cookie-parser");
require("dotenv").config();


const { authRoute , converstioinRoute , gigRoute, messageRoute, orderRoute, reviewRoute, userRoute } = require( "./routes" )
const app = express();

app.use(cors());
app.use( express.json() )
app.use( cookieParser() )





app.use( "/api/users" , userRoute )
app.use( "/api/auth" , authRoute )
app.use( "/api/gigs" , gigRoute )
app.use( "/api/orders" , orderRoute )
app.use( "/api/conversations" , converstioinRoute )
app.use( "/api/messages" , messageRoute )
app.use( "/api/reviews" , reviewRoute )


// error handles

app.use( ( err , req , res , next ) =>{
  const errstatus = err.status || 500;
  const errmsg = err.message || "something went wrong!! "
  return res.status( errstatus ).json( {msg : errmsg} )
} )

const connect = async(  ) =>{
  try {
      await mongoose.connect(process.env.Mongo);
      console.log( "connected to mongoose" )
    } catch (error) {
      console.log( "connect()" , error )
    }
};

app.listen( process.env.Port || 700 , async()=>{
    await connect()
    console.log( "listening" , process.env.Port || 700 )
} )