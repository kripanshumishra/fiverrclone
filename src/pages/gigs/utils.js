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


  const handleGigs = async ( location)=>{
    try {
      const res = await makeRequest.get( "/gigs/"+location.search )
      return res
      
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
  
  function handleDrawerState(name, setDrawerOpen , drawerState) {
    const newState = {};
    Object.keys(drawerState).forEach((key) => {
      newState[key] = false;
    });
    const val = drawerState[name];
    newState[name] = !val;
    setDrawerOpen((pre) => newState);
    return;
  }


  export {handleCategoryChange , handleDeliveryChange , handleGigs , handlePriceChange , handleDrawerState};



