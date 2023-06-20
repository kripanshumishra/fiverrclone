import Profilepicture from "../../component/profiledisplay/Profilepicture";
import Rating from "../../component/rating/Rating";
import Review from "../../component/review/Review";
import "./Gig.css" ;

export default function Gig() {
  return (
    <section className="container inline-spacing">
      <section className="gig-wrapper">
      <section className="gig-left" >
        <header className="gig-page-main-header">
          <h2>I will create quick custom ai art using midjourney advanced</h2>
          <div >
          <Profilepicture userInitial = {"k"}  userPP = {"/img/fun.jpg"}/>
            <div>
              <p>
                <span className="visually-hidden">username</span>Nhan Tran
              </p>
              <Rating stars={5} />
            </div>
          </div>
        
        </header>
        <div>
          <div role="region" className="gig-sample-images" aria-label="gig sample images">
            <img src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=720&h=750&dpr=2" alt="" />
          </div>

          <div className="gig-about__container">
            <h3>About This Gig</h3>
            <h4>Professional Web, Web3, Blockchain Development Team</h4>
            <p>
              I'm a website developer. I had over 8 years of professional
              experience in Website Design, Website Applications, Landing Pages,
              E-commerce, SaaS, management systems, and more with skills: in
              PHP, Laravel, MySQL, HTML5, CSS3, Bootstrap, Tailwind, JavaScript,
              jQuery, VueJS, ReactJS, NodeJS, GitHub, PSD to HTML and experience
              with VPS server, Shared Hosting, source code deployment. In
              addition, web3js and Smart Contracts are also my strengths. If you
              don't know how to start building your website, please contact me
              via inbox to get started.
            </p>
          </div>
        </div>
        <div className="user-gig-tag__cotainer">
          <span className="gig-tag">Laravel framework</span>
          <span className="gig-tag">Css</span>
          <span className="gig-tag">Html</span>
          <span className="gig-tag">JavaScript</span>
        </div>
        <div className="gig-about-seller">
          <header>
          <h2 className="gig-about-seller__heading">About the Seller</h2>
          </header>
          <div className="gig-about-user">
            <div>
            <Profilepicture userInitial = {"k"}  userPP = {"/img/fun.jpg"}/>
            </div>
            <div>
              <div><p><span className="visually-hidden">user name </span> Anna Bell</p></div>
              <div className="gig-about-user-rating">
              <Rating stars={5} />
              </div>
              <div className="gig-about-user--contactme"><a className="btn gig-about-user--contactme" > contact me </a></div>
            </div>
          </div>
          <div>
          <div className="user-info--container">
          <div className="user-info">
              <div className="user-info__block">
                <p>From</p>
                <p>Usa</p>
              </div>
              <div className="user-info__block">
                <p>Member Since</p>
                <p>2022</p>
              </div>
              <div className="user-info__block">
                <p>Avg. response Time</p>
                <p>4 hours</p>
              </div>
              <div className="user-info__block">
                <p>From</p>
                <p>Usa</p>
              </div>
              <div className="user-info__block">
                <p>last delivery</p>
                <p>Today</p>
              </div>
          </div>
          <hr aria-hidden='true' />
          <div className="user-bio">
            my name is Anna, Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore exercitationem corrupti non!
          </div>
          </div>
          </div>
        </div>
        <div>
          <header>
            <h2>What people think about this seller</h2>
          </header>
          <Review/>
        </div>
      </section>
      <section className="gig-right gig-side-card">
        <header>
          <h2>Pricing and Feature</h2>
        </header>
        <div>
          <div className="gig-side-card__price">
            <p> 1 AI generated image</p>
            <p>$59.99</p>
          </div>
        <p className="gig-side-card__short-desc">I will create a unique high quality AI generated image based on a description that you give me</p>
        <div className="gig-special-feature">
          <span className="gig-features"> <img aria-hidden = "true" src="/img/clock.png" alt=""/> 1-day delivery </span>
          <span className="gig-features"> <img aria-hidden = "true" src="/img/recycle.png" alt=""/> 2 revision </span>
        </div>
        <div className="gig-other-feature">
          <span className="gig-features"> <img src="/img/greencheck.png" alt="" /> Prompt writing </span>
          <span className="gig-features"> <img src="/img/greencheck.png" alt="" /> Prompt writing </span>
          <span className="gig-features"> <img src="/img/greencheck.png" alt="" /> Prompt writing </span>
        </div>
        </div>
      </section>
      </section>
    </section>
  );
}
