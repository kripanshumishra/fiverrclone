import { loadStripe } from "@stripe/stripe-js";
import "./Pay.css";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import newRequest from "../../utils/makeRequest";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../component/checkoutForm/CheckoutForm";

const stripePromise = loadStripe( 
    "pk_test_51KkOy5SGs0tpzjeho4wz8CdIHPKr9gqsThQmLCrPgqR5GcjkRf2wabN6IYl2XN4a4AErp75DOKm9lESNihcX6f7V007UZDvxyv"
 );

export default function Pay() {
    const [ clientSecret , setClientSecret ] = useState("") ;
    const { id  } = useParams();
    const makeRequest = async (  ) =>{
        try {
            const res = await newRequest.post(
                `/orders/create-payment-intent/${id}`
            )
            return res.data;
        } catch (error) {
            return Promise.reject( error )
        }
    }
    useEffect( (  )=>{
        makeRequest()
        .then(res=>{
            setClientSecret( res.clientSecret );
        })
        .catch( err=>{
            console.log( "pay" , err );
        } )
    } , [] ) ;

    const appearance = {
        theme : 'stripe',
    };
    const options = { 
        clientSecret , 
        appearance
     };

  return (
    <div className="container">
        {

            clientSecret ?
            <Elements options={ options } stripe = { stripePromise }>
                <CheckoutForm />
            </Elements>
            :<></>
        }

    </div>
  )
}
