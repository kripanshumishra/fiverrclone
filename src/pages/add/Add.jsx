import "./Add.css";
export default function Add() {
  return (
    <section className="gig-form-page">
      <div className='container gig-form-container'>
      <h2>Add new Gig</h2>
      <div className='gig-form-wrapper'>
        <form className="gig-form">
          <div className='gig-field-wrapper'>
            <div className="gig-field--left">
              <label htmlFor='gigtitle'>
                Gig title <span className='visually-hidden'>must be between 15 - 80 character</span>
              </label>
              <div className="gigtitle-help" id='gigtitle-help'>
              As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.
              </div>
            </div>
            <div className="gig-field--right">
              <textarea id='gigtitle' aria-describedby='gigtitle-help' aria-errormessage='title-error title-feedback' type="text" name="title" placeholder='eg :I will do something....' />
              <div className="gig-feedback">
              <span aria-live='polite' id="title-feedback"></span>
              <span aria-hidden= 'true'> 0/80 max</span>
              </div>
            </div>

          </div>
          <div className='gig-field-wrapper'>
            <div className="gig-field--left">
              <label htmlFor='gigcategory'>
                Category
              </label>
              <div id='gigfield-help' className="gigtitle-help">
                Choose the category most suitable for your Gig. 
              </div>
            </div>
            <div className="gig-field--right" >
              <select className="gig-field__select" name='category' id='gigcategory' aria-describedby='gigcategory-help' aria-errormessage='category-error'>
                <option value="none" > Select the Category </option>
                <option value="Graphics Design"> Graphics Design </option>
                <option value="Content Writing"> Content Writing </option>

              </select>
              <div className="gig-feedback">
              <span aria-live='assertive' id="category-error"></span>
              </div>
            </div>

          </div>
          <div className="gig-field-wrapper gig-do-cont">
            <div className="gig-desc-wrap">
              <label htmlFor='gigdescription'>Description <span className='visually-hidden'> about your service </span></label>
              <textarea id='gigdescription' placeholder='Brief description to introduce your service to customers'>

              </textarea>
            </div>
            <div className="gig-other-wrap">
              <div>
                <label htmlFor='gigrevision'>Revision Number</label>
                <input type='number' id="gigrevision" />
              </div>
              <div>
                <label htmlFor='gigdelivery'>Delivery Time</label>
                <input type='number' id="gigdelivery" />
              </div>
              <div>
                <label htmlFor='gigprice'>Price</label>
                <input type='number' id="gigprice" />
              </div>
            </div>
          </div>
          <fieldset className="gig-field-wrapper gig-file">
            <legend>Upload the files</legend>
            <div>
            <label htmlFor="gigcover">Cover Image</label>
            <input type="file" id='gigcover' />
            </div>
            <div>
              
            <label htmlFor="gigdoc">Upload Images</label>
            <input type="file" multiple id='gigdoc' />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    </section>
  )
}
