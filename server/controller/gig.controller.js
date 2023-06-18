const createError = require( "../utils/createError" )
const Gig = require( "../models/gig.model" );
const createGig = async ( req , res , next  ) =>{

    if( ! req.isSeller ) return next(createError( 403 , "only sellers can create the gig" )) ;

    const newgig  = new Gig( {
        ...req.body , 
        userId : req.userId
    } ) ;

    try{
        const saved = await newgig.save()
        res.status( 201 ). json( saved  )

    }catch(err){
        console.log( "createGig()" , err );
        next(err);
    }
    
}
const deleteGig = async( req , res , next  ) =>{
    try {
        const gigId = req.params.id
        const gig = await Gig.findById( gigId )
        if ( gig.userId.toString() !== req.userId.toString() ) return next( createError( 403 , "Not authorised to delete this gig " ) )
        await Gig.findByIdAndDelete( req.params.id );
        res.status( 200 ).send("deleted successfully!")
    } catch (error) {
        console.log( "deleteGig()" , error );
        next( error );
    }

};
const getGig = async( req , res , next  ) =>{
    const gigId = req.params.id 
    try{
        const gig = await Gig.findById( gigId );
        if ( !gig ) return next( createGig( 404 , 'not found' ) );
        res.status( 200  ).send( gig )
    }
    catch( err ){
        console.log( "getGig()" , err );
        next( err );
    }

};
const getGigs = async( req , res , next  ) =>{

    const query = req.query
    const filter = {};
    if ( "userId" in query ){
        filter["userId"] = query.userId
    }
    if ( "category" in query ){
        filter["category"] = query.category
    }
    if ( "minprice" in query ){
        const pre = filter["price"]
        filter["price"] = {
            ...pre ,
            $gt: query.minprice
        }
    }
    if ( "maxprice" in query ){
        const pre = filter["price"];
        filter["price"] = {
            ...pre , 
            $lt : query.maxprice
        }
    }
    if ( "search" in query ){
        filter["title"] = {$regex : query.search , $options:"i"}
    };

    try {
        const gigs = await Gig.find( filter );
        res.status ( 200 ).send( gigs );

    } catch (error) {
        console.log( "gigGigs()" , error )
        next( error );
    }

}

module.exports = { createGig , deleteGig , getGig , getGigs } ; 