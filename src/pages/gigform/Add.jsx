import { useReducer, useState , useRef } from "react";
import FormStateHeader from "../../component/formStateHeader/FormStateHeader";
import useMultipageForm from "../../hooks/useMultipageForm";
import "./Add.css";
import Popup from "../../component/popup/Popup";
import GigFeatureAndKeywords from "./component/GigFeatureAndKeywords";

import uploadimg from "../../utils/uploadimg";

import {
  change_input,
  add_feature,
  remove_feature,
  add_images,
  INITIAL_STATE,
  gigReducer,
} from "../../reducers/gigReducer";
import makeRequest from "../../utils/makeRequest";
import { mainCategories } from "../../../data/data";
import { useNavigate } from "react-router-dom";
import Tablests from "../../component/Tablets/Tablests";
const AboutGig = ({ handleInput }) => {
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
            include keywords that buyers would likely use to search for a
            service like yours.
          </div>
        </div>
        <div className="gig-field--right">
          <textarea
            id="gigtitle"
            aria-describedby="gigtitle-help"
            aria-errormessage="title-feedback"
            type="text"
            name="title"
            placeholder="eg :I will do something...."
            required={true}
            aria-required={true}
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
            <option value={null}> Select the Category </option>
            {mainCategories.map((cat, ind) => {
              return (
                <option value={cat.name} key={ind}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <div className="gig-feedback">
            <span aria-live="assertive" id="category-error"></span>
          </div>
        </div>
      </div>
    </>
  );
};

const GigFeatures = ({ handleInput }) => {
  return (
    <div className="gig-field-wrapper gig-do-cont">
      <div className="gig-desc-wrap">
        <label htmlFor="gigdescription required">
          Description
          <span className="visually-hidden"> about your service </span>
        </label>
        <textarea
          required={true}
          id="gigdescription"
          placeholder="Brief description to introduce your service to customers"
          name="desc"
          onChange={handleInput}
        ></textarea>
      </div>
      <div className="gig-other-wrap">
        <div>
          <label htmlFor="gigrevision">Revision Number</label>
          <input
            required={true}
            type="number"
            id="gigrevision"
            placeholder="eg : 2 "
            name="revisionNumber"
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="gigdelivery  required">Delivery Time (days) </label>
          <input
            required={true}
            type="number"
            id="gigdelivery"
            name="deliveryTime"
            placeholder="eg : 1"
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="gigprice required">Price</label>
          <input
            required={true}
            type="number"
            id="gigprice"
            placeholder="eg : 100"
            name="price"
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  );
};

const GigImageUpload = ({ handleImage }) => {
  return (
    <fieldset className="gig-field-wrapper gig-file">
      <legend>Upload the files</legend>
      <div>
        <label htmlFor="gigcover">Cover Image</label>
        <input type="file" id="gigcover" name="cover" />
      </div>
      <div>
        <label htmlFor="gigdoc">Upload Images</label>
        <input
          type="file"
          multiple
          id="gigdoc"
          name="images"
          onChange={handleImage}
        />
      </div>
    </fieldset>
  );
};

export default function Add() {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainMessage, setMainMessage] = useState({ msg: "", type: null });
  const navigate = useNavigate();
  const steps = [
    <AboutGig handleInput={handleInput} />,
    <GigImageUpload handleImage={handleImage} />,
    <GigFeatures handleInput={handleInput} />,
    <GigFeatureAndKeywords features={state.features} handleAddFeature={handleAddFeature} handleRemoveFeature={handleRemoveFeature} />
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLastPage()) {
      const req = await makeRequest.post("/gigs", {
        ...state,
        cover: state["images"][0],
      });
      const res = req.data;
      console.log(res);
      setMainMessage((pre) => {
        return { msg: "form submitted successfully", type: "success" };
      });
      return setTimeout(() => {
        navigate("/mygigs");
      }, 1000);
    }
    // image form page
    if (currentPage === totalPage - 1) {
      if (!files.length) {
        setMainMessage((pre) => {
          return { msg: "Please add atleast one image ! ", type: "alert" };
        });
        setTimeout(() => {
          setMainMessage((pre) => {
            return { msg: "", type: null };
          });
        }, 5500);
        return;
      }
      try {
        await handleImageSubmit();
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsSubmitting(false);
      }
    }
    next();
  };

  function handleInput(e) {
    change_input(e.target.name, e.target.value, dispatch);
  }

  function handleImage(e) {
    setFiles(e.target.files);
  }

  function handleAddFeature( feature ){
    add_feature( feature , dispatch );
  }
  function handleRemoveFeature ( feature ){
    remove_feature( feature , dispatch )
  }

  const handleImageSubmit = async () => {
    try {
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await uploadimg(file);
          return url;
        })
      );
      add_images(images, dispatch);
    } catch (error) {
      console.log("handleImageSubmit()", error);
    }
  };

  const [currentPage, totalPage, isLastPage, previous, next] = useMultipageForm(
    steps.length
  );

  return (
    <section className="gig-form-page">
      <div className="container gig-form-container">
        <h2>Add new Gig</h2>
        <div className="gig-form-wrapper">
          {mainMessage?.msg ? (
            <Popup message={mainMessage.msg} type={mainMessage.type} />
          ) : (
            <></>
          )}
          <form onSubmit={handleSubmit} className="gig-form">
            <FormStateHeader totalPage={totalPage} currentPage={currentPage} />
            {steps[currentPage-1]}
            <div className="gig-form-btn-grp">
              <button
                className="btn btn-dark"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
              >
                previous
              </button>
              <button
                disabled={isSubmitting}
                className="btn btn-primary "
                type="submit"
              >
                {isLastPage() ? "submit" : "next" }
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
