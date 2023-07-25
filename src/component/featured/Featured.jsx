import { useRef } from "react"
import "./Featured.css"
import { useNavigate } from "react-router-dom"
export default function Featured() {
  const navigate = useNavigate(  )
const popular = [ "Website Design" , "Wordpress" , "logo design" , "ai" ]
const formref = useRef()
const handleSearch  = ( e ) =>{
  e.preventDefault()
  const formdata = new FormData( formref.current );
  console.log( formdata , formdata.get("search") , {...Object.fromEntries( formdata )} )
  formref.current.reset()
  navigate( "/gigs?search="+formdata.get("search") )
}
  return (
    <div className="home-header-wrapper">
      <div className="container home-header inline-spacing">
      <div role="region" className="home-header__left">
        <header>
          <h1>
            Find the right <span className="text-italic" > freelance service</span> , 
             right away
          </h1>
        </header>
        <div>
          <form onSubmit={handleSearch} ref={formref} className="header-form">
            <label className="visually-hidden" htmlFor="service-search-box">
              search for any service
            </label>
            <input
              id="service-search-box"
              type="search"
              placeholder="eg: Website Design"
              required={ true }
              name="search"
              // onChange={( e ) =>{
              //   setSearchVal( e.target.value )
              // }}
            />
            <button type="submit" aria-label="submit button">
              <img aria-hidden={true} src="/img/search.png" alt="" />
            </button>
          </form>
        </div>
        <ul className="home-header__popular text-camel-case">
          Popular: {
            popular.map( ( x , i ) =>{
              return <li key={i} >{x}</li>
            } )
          }
        </ul>
      </div>
      <div className="home-header__right">
        <img src="/img/man.png"  alt="Image of the smiling man with brown hairs" />
      </div>
      </div>
    </div>
  )
}
