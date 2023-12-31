const User = require( "../models/user.model" );
const createError = require( "../utils/createError" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" )

const register = async (req, res, next) => {
  try { 
    let {  password , username   } = req.body
    username = username.trim()
    delete req.body["total_orders"] ;
    
    const user = await User.findOne( { username : username  } ) ;
    if ( user && user._id  ) return next( createError( 400, "user already exists!" ) );
    

    const hash = bcrypt.hashSync(password , 5);
    const newUser = new User({
        ...req.body , 
        password : hash
    });
    await newUser.save();
    res.status( 201 ).send( "user created ! " )



  } catch (err) {
    console.log( "register()" , err )
    next( err );
  }
};
const login = async (req, res, next) => {
  try {
    const  username   = req.body.username.trim();
    const pass = req.body.password;

    const user = await User.findOne( { username: username } ).select("+password");
    
    if ( !user ) return next( createError( 404 , "user not found !" ) );

    const comparePass = bcrypt.compareSync( pass , user.password );
    if ( !comparePass ) return next( createError( 400 , "Wrong password" ) ) ;
    const token =  jwt.sign({
        id: user._id , 
        isSeller:user.isSeller
    } , process.env.Jwt) ;
    const { password, ...info  } = user;
    res.cookie( "accessToken" , token , {
        httpOnly:true,
        maxAge: 30*24*60*60*1000,
        sameSite : "None",
        secure:true
    } )
    .status( 200 )
    .send( info._doc )
  } catch (err) {
    console.log( "login()" , err );
    next( err );
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie( "accessToken" , {
      sameSite : "None",
      secure:true
    } )
    .status( 200 )
    .send( "logged out successfully" );

  } catch (err) {
    console.log( "logout()" , err );
    next( err )
  }
};

const getMe = async( req, res, next )=>{
  try {
    const user = await ( User.findById( req.userId ) )
    res.status( 200 ).send( user );
  } catch (error) {
    console.log( "getMe()" , error )
    next( error ) ;
  }

};

module.exports = { register, login, logout , getMe };
