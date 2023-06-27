import { useRef } from "react";
import "./ReviewForm.css" ; 

export default function ReviewForm() {
    const formref = useRef()
    const handleReviewSubmit = ( e ) =>{
        e.preventDefault()
        console.log( Object.fromEntries( new FormData( formref.current ) ) )

    }
  return (
    <div>
        <h2>Write a Review for this gig</h2>
        <form ref={formref} className="review-form" onSubmit={handleReviewSubmit}>
            <label className="review-form-label" htmlFor="review-area"> Review :</label>
            <textarea placeholder="write review" className="review-form-textarea" required={true} aria-required={true} id="review-area" name="review">

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
