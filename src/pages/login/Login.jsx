import { useContext, useRef , useState} from "react";
import "./Login.css";
import makeRequest from "../../utils/makeRequest";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { authContext } from "../../context/authProvider/authProvider";
import Popup from "../../component/popup/Popup";


export default function Login() {
  const { authData, setAuthData } = useContext(authContext);
  const formRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mainError, setMainError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData(formRef.current);
      const data = {
        username: formdata.get("username"),
        password: formdata.get("password"),
      };
      const res = await makeRequest.post("/auth/login", data);
      setAuthData(res.data);
      let redirect_uri = "/";
      console.log( res  )
      if (searchParams.get("redirect") && searchParams.get("redirect").length) {
        redirect_uri = searchParams.get("redirect");
      }
      navigate(redirect_uri);
    } catch (error) {
      console.log("handleLogin()", error);
      setMainError(error?.response?.data.msg || "something went wrong");
        setTimeout(() => {
          setMainError("");
        }, 5500);
    }
  };
  if (authData && Object.keys(authData).length) {
    let redirect_uri = "/";
    if (searchParams.get("redirect")) {
      redirect_uri = searchParams.get("redirect");
    }
    return <Navigate to={redirect_uri} />;
  }
  return (
    <section className="login-page-wrapper inline-spacing">
      <div className="container content-wrapper">
      {mainError && mainError.length ? (
              <Popup message={mainError} type={"alert"} />
            ) : (
              <></>
            )}
        <div className="content-subwrapper">
          <div className="inline-spacing login-form">
            <header>
              <h2>Sign in to your account</h2>
              {/* <p>Don't have an account ?</p> */}
            </header>
            <form ref={formRef} onSubmit={handleLogin}>
              <div className="input-wrapper">
                <label htmlFor="username">Enter your username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="eg. abc"
                  name="username"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Enter your password </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  name="password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary login-submit-btn"
              >
                Submit
              </button>
              <div> Don't have account <Link style={{cursor:"pointer" , textDecoration : "underline" , color : "blue" , marginLeft : "0.3em" }} to={'/register'}> click here </Link></div>
            </form>
          </div>
          <div className="login-advertisement inline-spacing">
            <header>
              <h2>Success starts here</h2>
            </header>
            <ul className="login-advertisement--list">
              <li>
                <div aria-hidden="true">
                  <img src="/img/check.png" alt="" />
                </div>
                Over 600 categories
              </li>
              <li>
                <div aria-hidden="true">
                  <img src="/img/check.png" alt="" />
                </div>
                Pay per project, not per hour
              </li>
              <li>
                <div aria-hidden="true">
                  <img src="/img/check.png" alt="" />
                </div>
                Access to talent and businesses across the globe
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
