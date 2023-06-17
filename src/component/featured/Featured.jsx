import "./Featured.css"
export default function Featured() {
const popular = [ "Website Design" , "Wordpress" , "logo design" , "ai" ]
  return (
    <section className="home-header-wrapper">
      <section className="container home-header inline-spacing">
      <section className="home-header__left">
        <header>
          <h1>
            Find the right <span className="text-italic" > freelance service</span> , 
             right away
          </h1>
        </header>
        <div>
          <form className="header-form">
            <label className="visually-hidden" htmlFor="service-search-box">
              search for any service
            </label>
            <input
              id="service-search-box"
              type="search"
              placeholder="Search for any service... eg: Website Design"
            />
            <button aria-label="submit button">
              <img aria-hidden="true" src="/img/search.png" alt="" />
            </button>
          </form>
        </div>
        <ul className="home-header__popular text-camel-case">
          Popular: {
            popular.map( ( x , i ) =>{
              return <li tabIndex={0} key={i} >{x}</li>
            } )
          }
        </ul>
      </section>
      <section className="home-header__right">
        <img src="/img/man.png"  alt="Image of the smiling man with brown hairs" />
      </section>
      </section>
    </section>
  )
}
