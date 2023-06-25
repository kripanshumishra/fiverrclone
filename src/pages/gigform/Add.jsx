import { useReducer , useState } from "react";
import FormStateHeader from "../../component/formStateHeader/FormStateHeader";
import useMultipageForm from "../../hooks/useMultipageForm";
import "./Add.css";

import uploadimg from "../../utils/uploadimg"

import { change_input , add_feature , remove_feature , add_images , INITIAL_STATE , gigReducer } from "../../reducers/gigReducer"
import makeRequest from "../../utils/makeRequest";
const AboutGig = ( { handleInput } ) => {
  return (
    <>
      <div className="gig-field-wrapper">
      <div className="gig-field--left">
        <label htmlFor="gigtitle">
          Gig title
          <span className="visually-hidden">
            must be between 15 - 80 character
          </span>
        </label>
        <div className="gigtitle-help" id="gigtitle-help">
          As your Gig storefront, your title is the most important place to
          include keywords that buyers would likely use to search for a service
          like yours.
        </div>
      </div>
      <div className="gig-field--right">
        <textarea
          id="gigtitle"
          aria-describedby="gigtitle-help"
          aria-errormessage="title-error title-feedback"
          type="text"
          name="title"
          placeholder="eg :I will do something...."
          required={true}
          aria-required = { true }
          maxLength={80}
          minLength={10}
          onChange={handleInput}
        />
        <div className="gig-feedback">
          <span aria-live="polite" id="title-feedback"></span>
          <span aria-hidden="true"> 0/80 max</span>
        </div>
      </div>
    </div>
    <div className="gig-field-wrapper">
    <div className="gig-field--left">
      <label htmlFor="gigcategory">Category</label>
      <div id="gigfield-help" className="gigtitle-help">
        Choose the category most suitable for your Gig.
      </div>
    </div>
    <div className="gig-field--right">
      <select
        className="gig-field__select"
        name="category"
        id="gigcategory"
        aria-describedby="gigfield-help"
        aria-errormessage="category-error"
        onChange={handleInput}
      >
        <option value={null} > Select the Category </option>
        <option value="Graphics Design"> Graphics Design </option>
        <option value="Content Writing"> Content Writing </option>
      </select>
      <div className="gig-feedback">
        <span aria-live="assertive" id="category-error"></span>
      </div>
    </div>
  </div>
    </>
  );
};

const GigFeatures = ({handleInput}) => {
  return (
    <div className="gig-field-wrapper gig-do-cont">
      <div className="gig-desc-wrap">
        <label htmlFor="gigdescription required">
          Description
          <span className="visually-hidden"> about your service </span>
        </label>
        <textarea
          required = { true }
          id="gigdescription"
          placeholder="Brief description to introduce your service to customers"
          name = "desc"
          onChange={handleInput}
        ></textarea>
      </div>
      <div className="gig-other-wrap">
        <div>
          <label htmlFor="gigrevision">Revision Number</label>
          <input required = { true } type="number" id="gigrevision" placeholder="eg : 2 "
          name="revisionNumber"
          onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="gigdelivery  required">Delivery Time (days) </label>
          <input required={true} type="number" id="gigdelivery" 
          name="deliveryTime"
          placeholder="eg : 1" 
          onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="gigprice required">Price</label>
          <input required={true} type="number" id="gigprice" placeholder="eg : 100" 
          name="price"
          onChange = { handleInput }
          />
        </div>
      </div>
    </div>
  );
};

const GigImageUpload = ({handleImage}) => {
  return (
    <fieldset className="gig-field-wrapper gig-file">
      <legend>Upload the files</legend>
      <div>
        <label htmlFor="gigcover">Cover Image</label>
        <input type="file" id="gigcover" name="cover"
        />
      </div>
      <div>
        <label htmlFor="gigdoc">Upload Images</label>
        <input type="file" multiple id="gigdoc"
        name="images"
        onChange={handleImage}
        />
      </div>
    </fieldset>
  );
};
export default function Add() {
  
  
  const steps = [<AboutGig handleInput={handleInput} />, <GigFeatures  handleInput={handleInput}/> , <GigImageUpload handleImage={handleImage} />];

  const [ state , dispatch ] = useReducer( gigReducer , INITIAL_STATE ) ;
  const [files , setFiles] = useState( [] )
  
  const handleSubmit = async ( e ) =>{
    e.preventDefault()
    if ( isLastPage() ){
      if ( !files.length ) alert( "pls add images" )
      await handleImageSubmit()
      const req = await makeRequest.post( "/gigs" , state )
      const res = req.data
      console.log( res  )
    }
    else next()
  }
  
  function handleInput( e ){
    change_input( e.target.name , e.target.value , dispatch )
  }
  
  function handleImage( e ){
    setFiles( e.target.files )
  }
  
  const handleImageSubmit = async (  )=>{
    
    try {
      const images = await Promise.all( 
        [...files].map (
          async ( file ) =>{
            const url = await uploadimg( file );
            return url
          }
          )
          )
          
          add_images( images , dispatch )
          
        } catch (error) {
          console.log( "handleImageSubmit()" , error )
        }
        
      }
      
      const [currentPage, totalPage, isLastPage, previous, next] =
  useMultipageForm( steps.length );

  return (
    <section className="gig-form-page">
      <div className="container gig-form-container">
        <h2>Add new Gig</h2>
        <div className="gig-form-wrapper">
          <form onSubmit={handleSubmit} className="gig-form"    >
            <FormStateHeader totalPage={totalPage} currentPage={currentPage} />
            {
              steps[currentPage-1]
            }
            <div className="gig-form-btn-grp">
              <button className="btn btn-dark" type="button" onClick={(e) =>{
                e.preventDefault()
                previous()
              }} >
                previous
              </button>
              <button className="btn btn-primary " type="submit"  >
                next
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
