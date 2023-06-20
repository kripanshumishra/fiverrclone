import makeRequest from "../../utils/makeRequest"

const handleDeliveryChange = ( e ,setSearchParams ) =>{
    setSearchParams( param => {
      param.set( "delivery" , e.target.value )
      return param
    } )

  }
  const handleCategoryChange = ( e , setSearchParams ) =>{
    setSearchParams( param => {
      param.set( "category" , e.target.value )
      return param
    } )

  }


  const handleGigs = async (setGigs , location)=>{
    try {
      const res = await makeRequest.get( "/gigs/"+location.search )
      setGigs( res.data )
      
    } catch (error) {
      console.log( "handleGigs()" , error );
    }

  };

  const handlePriceChange = ( e , setSearchParams) =>{
    e.preventDefault()
    if ( e.target.minprice.value ){
      setSearchParams( param=>{
        param.set( "minprice" , e.target.minprice.value )
        return param
      }) ;
    }
    else{
      setSearchParams( param=>{
        param.delete( "minprice" )
        return param
      }) ;
    }
    if ( e.target.maxprice.value ){
      setSearchParams( param=>{
        param.set( "maxprice" , e.target.maxprice.value )
        return param
      }) ;
    }
    else{
      setSearchParams( param=>{
        param.delete( "maxprice" )
        return param
      }) ;
    }
  };

  export {handleCategoryChange , handleDeliveryChange , handleGigs , handlePriceChange};



