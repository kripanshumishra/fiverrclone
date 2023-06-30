import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import  newRequest from "../../utils/makeRequest";
export default function Success() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log( searchParams , "searchParams" )
    const payment_intent = searchParams.get( "payment_intent" ) ;
    const makeSuccessRequest = async () =>{
        try {
            const res =  await newRequest.put( "/orders" , { 
                payment_intent
             } );
             return res.data
        } catch (error) {
            return Promise.reject( error )
        }
    }
    useEffect(() => {
      
        makeSuccessRequest()
        .then( res=>{
            setTimeout( ()=>{
                navigate( "/orders" , { replace : true  }  ) ; 
            } , 4000 )
        } )
        .catch( err=>{
            console.log( "success" , err )
        } );
    
      return () => {
        
      }
    }, [])
    
  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  )
}
