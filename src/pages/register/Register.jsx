import { useContext, useRef, useState } from "react";
import "./Register.css";
import makeRequest from "../../utils/makeRequest";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authProvider/authProvider";
import Popup from "../../component/popup/Popup";
import useMultipageForm from "../../hooks/useMultipageForm";
import FormStateHeader from "../../component/formStateHeader/FormStateHeader";

const FirstStep = () => {
  return (
    <>
      <div className="form-group">
        <label className="required" htmlFor="username">
          Username
        </label>
        <input
          className="required"
          type="text"
          id="username"
          aria-describedby="error-username-region"
          aria-required="true"
          placeholder="eg. abc"
          name="username"
        />
        <span aria-live="true" id="error-username-region"></span>
      </div>
      <div className="form-group">
        <label className="required" htmlFor="email">
          Email
        </label>
        <input
          aria-required="true"
          type="email"
          id="email"
          aria-describedby="error-email-region"
          required={true}
          placeholder="eg. abc@email.com"
          name="email"
        />
        <span aria-live="true" id="error-email-region"></span>
      </div>
      <div className="form-group">
        <label className="required" htmlFor="password">
          Password
        </label>
        <input
          aria-required="true"
          type="password"
          id="password"
          aria-describedby="error-password-region"
          required={true}
          placeholder="eg. password"
          name="password"
        />
        <span aria-live="true" id="error-password-region"></span>
      </div>
    </>
  );
};

const SecondStep = () => {
  return (
    <>
      <div className="form-inline-group">
        <div className="form-group form-seller-checkbox">
          <label className="required" htmlFor="isSeller">
            want to be seller
          </label>
          <input
            className="toggle-btn"
            type="checkbox"
            id="isSeller"
            aria-describedby="error-seller-region"
            name="isSeller"
          />
          <span aria-live="true" id="error-seller-region"></span>
        </div>
        <div className="form-group country-select-group">
          <label className="required" htmlFor="country">
            country
          </label>
          <select
            id="country"
            className="country-select"
            name="country"
            required={true}
            aria-required="true"
          >
            <option value={"india"}>India</option>
            <option value={"australia"}>Australia</option>
            <option value={"usa"}>Usa</option>
            <option value={"uae"}>UAE</option>
          </select>
          <span aria-live="true" id="error-country-region"></span>
        </div>
      </div>
      <div className="form-group">
        <label className="required" htmlFor="desc">
          Description
        </label>
        <textarea
          aria-required="true"
          type="desc"
          id="desc"
          aria-describedby="error-desc-region"
          required={true}
          placeholder="eg. I am someone..."
          name="desc"
        />
        <span aria-live="true" id="error-desc-region"></span>
      </div>
    </>
  );
};

export default function Register() {
  const steps = [<FirstStep />, <SecondStep />];
  const signupform = useRef();
  const navigate = useNavigate();
  const [preFormData, setPreFormData] = useState();
  const [mainError, setMainError] = useState("");
  const [currentPage, totalPage, isLastPage, previous, next] = useMultipageForm(
    steps.length
  );
  const { authData, setAuthData } = useContext(authContext);
  if (authData && Object.keys(authData).length) return navigate("/");

  const handleSubmit = async (e, isLastPage) => {
    e.preventDefault();
    if (isLastPage()) {
      const formdata = new FormData(signupform.current);
      const data = Object.fromEntries(formdata);
      data["isSeller"] = data["isSeller"] === "on";
      try {
        console.log({ ...preFormData, ...data });
        const req = await makeRequest.post("/auth/register", {
          ...preFormData,
          ...data,
        });
        const res = req.data;

        navigate("/login");
      } catch (error) {
        console.log(
          "signupform()",
          error?.response?.data.msg || "something went wrong"
        );
        setMainError(error?.response?.data.msg || "something went wrong");
        setTimeout(() => {
          setMainError("");
        }, 5500);
      }
    } else {
      const formdata = new FormData(signupform.current);
      const data = Object.fromEntries(formdata);

      setPreFormData({ ...data });
      next();
    }
  };
  return (
    <div className="register-page-wrapper inline-spacing">
      <section className="container register-container">
        <div className="register">
          <div className="register--left inline-spacing">
            {mainError && mainError.length ? (
              <Popup message={mainError} type={"alert"} />
            ) : (
              <></>
            )}
            <div role="contentinfo">
              <h2>Sign up</h2>
            </div>
            <form
              onSubmit={async (e) => {
                await handleSubmit(e, isLastPage);
              }}
              ref={signupform}
            >
              <FormStateHeader
                currentPage={currentPage}
                totalPage={totalPage}
              />
              {steps[currentPage - 1]}

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
                <button className="btn btn-primary " type="submit">
                  {
                    isLastPage() ? "submit" : "next"
                  }
                </button>
              </div>

              <div>
                Already have account{" "}
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                    marginLeft: "0.3em",
                  }}
                  to={"/login"}
                >
                  {" "}
                  click here{" "}
                </Link>
              </div>
            </form>
          </div>
          <div className="register--right inline-spacing">
            <header>
              <h2 className="signup-advertisement--heading">
                Success starts here
              </h2>
            </header>
            <ul className="signup-advertisement--list">
              <li>
                <div aria-hidden="true">
                  <img src="/img/greencheck.png" alt="" />
                </div>
                Over 600 categories
              </li>
              <li>
                <div aria-hidden="true">
                  <img src="/img/greencheck.png" alt="" />
                </div>
                Pay per project, not per hour
              </li>
              <li>
                <div aria-hidden="true">
                  <img src="/img/greencheck.png" alt="" />
                </div>
                Access to talent and businesses across the globe
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
