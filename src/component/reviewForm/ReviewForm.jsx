import { useRef, useState } from "react";
import "./ReviewForm.css" ; 
import makeRequest from "../../utils/makeRequest";
import Popup from "../popup/Popup";

export default function ReviewForm( { gigId , setReviews } ) {
    const formref = useRef()
    const [ error , setError ] = useState( "" )
    const handleReviewSubmit = async ( e ) =>{
        e.preventDefault()
        try {
            const data = { ...Object.fromEntries( new FormData( formref.current ) ) }
        data['gigId'] = gigId;
        const res = await makeRequest.post( "/reviews" , data );
        setReviews( pre =>  [ ...pre , res.data  ] )
        } catch (error) {
            console.log( "review form " , error );
            setError( error?.response?.data?.msg || "something went wrong " );
            setTimeout( () =>{
                setError("")
            } , 5000 ) ; 
        }
        finally{
            formref.current.reset()
        }

    }
  return (
    <div>
        <h2>Write a Review for this gig</h2>
        { error  ? <Popup message={error} type={'alert'} /> : <></> }
        <form ref={formref} className="review-form" onSubmit={handleReviewSubmit}>
            <label className="review-form-label" htmlFor="stars" > Select stars</label>
            <select className="review-form-select" name="star"  id= "stars" >
                <option value={1}>1</option> 
                <option value={2}>2</option> 
                <option value={3}>3</option> 
                <option value={4}>4</option> 
                <option value={5}>5</option> 

            </select>
            <label className="review-form-label" htmlFor="review-area"> Review :</label>
            <textarea placeholder="write review" className="review-form-textarea" required={true} aria-required={true} id="review-area" name="desc" >

            </textarea>
            <div>
                <button className="btn btn-primary">
                   Post <span className="visually-hidden">  the Review </span>
                </button>
            </div>
        </form>
    </div>
  )
}
