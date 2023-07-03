import "./GigFeatureAndKeywords.css";
import { useRef , useState } from "react";
import Tablests from "../../../component/Tablets/Tablests";
export default function GigFeatureAndKeywords ({
  handleAddFeature,
  handleRemoveFeature,
  features,
}){
  const [curFeature, setCurFeature] = useState("");
  const inputref = useRef();
  return (
    <div>
      <Tablests
          tablets_arr={features || []}
          onClickHandler={handleRemoveFeature}
        />
        <div className="feature-wrapper">
      <div className="feature--left">
        <label htmlFor="gigfeatureprovided">Add Features</label>
        <div className="gigtitle-help" id="gigfeature-help">
          Add the features which you think align with your skills
        </div>
      </div>
      <div className="feature--right">
        
        <div className="feature-input">
          <input
            ref={inputref}
            id="gigfeatureprovided"
            aria-describedby="gigfeature-help"
            aria-errormessage="feature-error"
            type="text"
            placeholder="eg : any.."
            onChange={(e) => {
              setCurFeature(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              console.log(curFeature);
              if (!curFeature) return;
              handleAddFeature(curFeature);
              setCurFeature("");
              inputref.current.value = "";
            }}
          >
            add
          </button>
        </div>
        <div className="gig-feedback">
          <span aria-live="polite" id="feature-error"></span>
        </div>
      </div>
    </div>
    </div>
  );
};
