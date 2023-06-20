import "./Gigs.css";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import GigCard from "../../component/gigcard/GigCard";
import {
  handleCategoryChange,
  handleDeliveryChange,
  handleGigs,
  handlePriceChange,
} from "./utils";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    handleGigs(setGigs, location);
    return () => {};
  }, [searchParams]);

  return (
    <section className="container inline-spacing">
      <header>
        <h2>AI Artists</h2>
        <p>Explore the boundaries of art and technology with fiverr</p>
      </header>
      <div className="gig-filter-header">
        <div>
          <button
            className="btn gig-filter__btn"
            aria-controls="category-region"
          >
            Categories
          </button>
          <ul id="category-region">
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={searchParams.get("category") === "ai" ? true : false}
                  type="radio"
                  name="category"
                  value="ai"
                />{" "}
                AI{" "}
              </label>{" "}
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={
                    searchParams.get("category") === "wordpress" ? true : false
                  }
                  type="radio"
                  name="category"
                  value="wordpress"
                />{" "}
                WordPress{" "}
              </label>
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={
                    searchParams.get("category") === "socialmedia"
                      ? true
                      : false
                  }
                  type="radio"
                  name="category"
                  value="socialmedia"
                />{" "}
                Social Media{" "}
              </label>
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={
                    searchParams.get("category") === "seo" ? true : false
                  }
                  type="radio"
                  name="category"
                  value="seo"
                />{" "}
                SEO{" "}
              </label>
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={
                    searchParams.get("category") === "illustration"
                      ? true
                      : false
                  }
                  type="radio"
                  name="category"
                  value="illustration"
                />{" "}
                Illustration{" "}
              </label>{" "}
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={
                    searchParams.get("category") === "logodesign" ? true : false
                  }
                  type="radio"
                  name="category"
                  value="logodesign"
                />{" "}
                Logo Design{" "}
              </label>
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    handleCategoryChange(e, setSearchParams);
                  }}
                  checked={
                    searchParams.get("category") === "voiceover" ? true : false
                  }
                  type="radio"
                  name="category"
                  value="voiceover"
                />{" "}
                Voice Over{" "}
              </label>
            </li>
          </ul>
        </div>
        <div>
          <button className="btn gig-filter__btn" aria-controls="budget-region">
            {" "}
            Budget{" "}
          </button>
          <div role="region" id="budget-region">
            <form
              className="filter-price-region"
              onSubmit={(e) => {
                // e.preventDefault()
                handlePriceChange(e, setSearchParams);
              }}
            >
              <div>
              <div>
                <label htmlFor="minprice">Min price</label>
                <input
                  type="Number"
                  id="minprice"
                  placeholder="Any"
                  name="minprice"
                />
              </div>

              <div>
                <label htmlFor="maxprice">Max price</label>
                <input
                  type="Number"
                  id="maxprice"
                  placeholder="Any"
                  name="maxprice"
                />
              </div>
              </div>

              <hr aria-hidden="true" />
              <input type="submit" className="btn btn-dark" />
            </form>
          </div>
        </div>
        <div>
          <button
            className="btn gig-filter__btn"
            aria-controls="delivery-region"
          >
            {" "}
            Delivery{" "}
          </button>
          <ul id="delivery-region">
            <li>
              {" "}
              <label>
                {" "}
                <input
                  onChange={(e) => {
                    handleDeliveryChange(e, setSearchParams);
                  }}
                  checked={searchParams.get("delivery") === "1" ? true : false}
                  type="radio"
                  name="days"
                  value="1"
                />{" "}
                1 day{" "}
              </label>{" "}
            </li>
            <li>
              {" "}
              <label>
                {" "}
                <input
                  onChange={(e) => {
                    handleDeliveryChange(e, setSearchParams);
                  }}
                  checked={searchParams.get("delivery") === "2" ? true : false}
                  type="radio"
                  name="days"
                  value="2"
                />{" "}
                2 days{" "}
              </label>{" "}
            </li>
            <li>
              {" "}
              <label>
                {" "}
                <input
                  onChange={(e) => {
                    handleDeliveryChange(e, setSearchParams);
                  }}
                  checked={searchParams.get("delivery") === "3" ? true : false}
                  type="radio"
                  name="days"
                  value="3"
                />{" "}
                3 days{" "}
              </label>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className="gigs-wrapper">
        {gigs.map((gig, ind) => {
          return <GigCard key={ind} gig={{ ...gig }} />;
        })}
      </div>
    </section>
  );
}
