// import DragAndDrop from "../../../component/draganddrop/DragAndDrop"

import { useState , useRef } from "react";
import Popup from "../../../component/popup/Popup";

const GigImageUpload = ({ handleImage }) => {
    const [ error , setError  ] = useState()
    function handleImageSubmit (e) {
        if ( e.target.files.length > 0 ) {
            setTimeout( ()=>{
                setError( "" )
            } , 5000); 
            return   

        }
        handleImage(e)
    }
    return (
      <fieldset className="gig-field-wrapper gig-file">
        { error && error.length ? <Popup message={error} type={"alert"} /> : <></> }
        <legend>Upload the files</legend>
        <div>
          <label htmlFor="gigdoc">Upload Images</label>

          <input
            type="file"
            multiple
            id="gigdoc"
            name="images"
            onChange={handleImageSubmit}
          />
          <p> upto 4 Images </p>
        </div>
      </fieldset>
    );
  };

export default GigImageUpload