import { useContext, useRef } from "react";
import "./Register.css";
import makeRequest from "../../utils/makeRequest";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authProvider/authProvider";

export default function Register() {
  const signupform = useRef();
  const navigate = useNavigate();
  const { authData , setAuthData } = useContext( authContext );
  if ( authData && Object.keys( authData ).length ) return navigate("/")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(signupform.current);
    const data = Object.fromEntries(formdata);
    data["isSeller"] = data["isSeller"] === "on";
    try {
      const req = await makeRequest.post("/auth/register", data);
      const res = req.data;
      alert(res);

      navigate("/login");
    } catch (error) {
      console.log(
        "signupform()",
        error?.response?.data.msg || "something went wrong"
      );
    }
  };
  return (
    <div className="register-page-wrapper inline-spacing">
      <section className="container register-container">
        <div className="register">
          <div className="register--left inline-spacing">
            <div role = "contentinfo" >
            <h2>Sign up</h2>
            </div>
            <form ref={signupform}>
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
                    aria-required="true"
                    required={true}
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
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {" "}
                  submit{" "}
                </button>
              </div>
            </form>
          </div>
          <div className="register--right inline-spacing">
            <header >
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
