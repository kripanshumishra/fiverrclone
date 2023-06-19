import { useRef } from "react";
import "./Login.css"
import makeRequest from "../../utils/makeRequest";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const formRef = useRef()
  const navigate = useNavigate()
  const handleLogin = async (e) =>{
    e.preventDefault() ;
    try {
      let formdata = new FormData( formRef.current ) 
      const data  = { 
        "username" : formdata.get( "username" ) , 
        "password" : formdata.get( "password" )
       }
    const res = await makeRequest.post( "/auth/login" , data )
    localStorage.setItem( "userInfo" , JSON.stringify( res.data ) )
    navigate("/")
    } catch (error) {
      console.log( "handleLogin()" , error );
    }
  }
  return (
    <section className='login-page-wrapper'>
      <div className='container content-wrapper'> 
      <div className="content-subwrapper">
      <div className="inline-spacing login-form">
        <header>
        <h2>Sign in to your account</h2>
        <p>Don't have and account ?</p>
        </header>
        <form ref={formRef} onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor='username'>Enter your username</label>
            <input type='text' id= "username" placeholder='eg. abc' name="username" />
          </div>
          <div className="input-wrapper">
          <label htmlFor='password'>Enter your password </label>
            <input type='password' id= "password" placeholder='password' name="password" />
          </div>
          <button type="submit" className="btn btn-primary login-submit-btn">Submit</button>
        </form>
      </div>
      <div className="login-advertisement inline-spacing">
        <header>
        <h2>Success starts here</h2>
        </header>
        <ul className="login-advertisement--list">
          <li>
            <div aria-hidden="true"><img src="/img/check.png" alt=""/></div>
            Over 600 categories
          </li>
          <li>
            <div aria-hidden="true"><img src="/img/check.png" alt=""/></div>
            Pay per project, not per hour
          </li>
          <li>
            <div aria-hidden="true"><img src="/img/check.png" alt=""/></div>
            Access to talent and businesses across the globe
          </li>
        </ul>
       </div>
      </div>

      </div>
    </section>
  )
}
