import Featured from "../../component/featured/Featured";
import Slide from "../../component/slide/Slide";
import TrustedBy from "../../component/trustedBy/TrustedBy";
import { popularCards, mainCategories } from "../../../data/data";
import "./Home.css";
import GigCard from "../../component/gigcard/GigCard";

export default function Home() {
  return (
    <section>
      <Featured />
      <TrustedBy />
      <section className="container popular-services">
        <h2 className="popular-services__heading">Popular Services</h2>
        <Slide>
          {popularCards.map((card, i) => {
            return (
              <div className="popular-services__slider" key={i} >
                <header>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </header>
                <img src={card.img} alt={card.description} />
              </div>
            );
          })}
        </Slide>
      </section>
      <section className="home-selling__wrapper">
        <section className="container">
          <div>
            <header>
              <h2 className="text-camel-case home-selling-heading">
                The best part? Everything.
              </h2>
            </header>
            <div className="home-selling__main">
              <div className="home-selling__main--left ">
                <div className="home-selling-value">
                  <div>
                    <h3 className="text-camel-case">stick to your budget</h3>
                    <p>
                      Find the right service for every price point. No hourly
                      rates, just project-based pricing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-camel-case">
                      get quality work done quickly
                    </h3>
                    <p>
                      Hand your project over to a talented freelancer in
                      minutes, get long-lasting results.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-camel-case">pay when you're happy</h3>
                    <p>
                      Upfront quotes mean no surprises. Payments only get
                      released when you approve.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-camel-case">count on 24/7 support</h3>
                    <p>
                      Our round-the-clock support team is available to help
                      anytime, anywhere.
                    </p>
                  </div>
                </div>
              </div>
              <div className="home-selling__main--right">
                <img
                  className="home-selling-brand"
                  src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=720&h=750&dpr=2"
                  alt="girl standing out in the image"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="container">
        <div className="home-main-categories">
          <header>
            <h2 className="text-camel-case">you need it , we've got it </h2>
          </header>
          <div className="home-main-categories-wrapper">
            <ul>
              {mainCategories.map((cat, ind) => {
                return (
                  <li key={ind}>
                    <div>
                      <a className="cat-link" href="#">
                        <img aria-hidden="true" src={cat.img} alt="" />
                        <span>{cat.name}</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      <GigCard/>
      </section>
    </section>
  );
}
