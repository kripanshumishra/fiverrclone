import "./Gigs.css";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import GigCard from "../../component/gigcard/GigCard";
import {
  handleCategoryChange,
  handleDeliveryChange,
  handleGigs,
  handlePriceChange,
  handleDrawerState,
} from "./utils";
import { mainCategories } from "../../../data/data";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState({
    categories: false,
    budget: false,
    delivery: false,
  });
  const categoryRef = useRef();
  const budgetRef = useRef();
  const deliveryRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    handleGigs(location).then((res) => {
      if (isMounted) setGigs(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, [searchParams]);
  useClickOutside(categoryRef, () => {
    setDrawerOpen({ ...drawerOpen, categories: false });
  });
  useClickOutside(budgetRef, () => {
    setDrawerOpen({ ...drawerOpen, budget: false });
  });
  useClickOutside(deliveryRef, () => {
    setDrawerOpen({ ...drawerOpen, delivery: false });
  });
  return (
    <section className="container inline-spacing">
      <header className="gig-page-header">
        <h2>AI Artists</h2>
        <p>Explore the boundaries of art and technology with fiverr</p>
      </header>
      <div className="gig-filter-header">
        <div className="gig-filters-wrap">
          <button
            className={`btn gig-filter__btn ${
              drawerOpen["categories"] ? "gig-filter__btn--active" : ""
            } `}
            aria-controls="category-region"
            name="categories"
            onClick={(e) => {
              handleDrawerState(e.target.name, setDrawerOpen, drawerOpen);
              e.stopPropagation();
            }}
          >
            Categories
          </button>
          {drawerOpen["categories"] && (
            <ul
              ref={categoryRef}
              id="category-region"
              className={` link-drawer ${
                drawerOpen["categories"] ? "link-drawer-isopen" : ""
              } `}
            >
              {mainCategories.map((cat, ind) => {
                return (
                  <li key={ind}>
                    <label>
                      <input
                        onChange={(e) => {
                          handleCategoryChange(e, setSearchParams);
                        }}
                        checked={
                          searchParams.get("category") === cat.name
                            ? true
                            : false
                        }
                        type="radio"
                        name="category"
                        value={cat.name}
                      />
                      {cat.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="gig-filters-wrap">
          <button
            className={`btn gig-filter__btn ${
              drawerOpen["budget"] ? "gig-filter__btn--active" : ""
            }`}
            aria-controls="budget-region"
            onClick={(e) => {
              handleDrawerState(e.target.name, setDrawerOpen, drawerOpen);

              e.stopPropagation();
            }}
            name="budget"
          >
            Budget
          </button>
          {drawerOpen["budget"] && (
            <div
              ref={budgetRef}
              className={`link-drawer ${
                drawerOpen["budget"] ? "link-drawer-isopen" : ""
              } `}
              role="region"
              id="budget-region"
            >
              <form
                className="filter-price-region"
                onSubmit={(e) => {
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
          )}
        </div>
        <div className="gig-filters-wrap">
          <button
            className={`btn gig-filter__btn ${
              drawerOpen["delivery"] ? "gig-filter__btn--active" : ""
            }`}
            aria-controls="delivery-region"
            name="delivery"
            onClick={(e) => {
              handleDrawerState(e.target.name, setDrawerOpen, drawerOpen);
              e.stopPropagation();
            }}
          >
            Delivery
          </button>
          {drawerOpen["delivery"] && (
            <ul
              ref={deliveryRef}
              className={`link-drawer ${
                drawerOpen["delivery"] ? "link-drawer-isopen" : ""
              } `}
              id="delivery-region"
            >
              <li>
                <label>
                  <input
                    onChange={(e) => {
                      handleDeliveryChange(e, setSearchParams);
                    }}
                    checked={
                      searchParams.get("delivery") === "1" ? true : false
                    }
                    type="radio"
                    name="days"
                    value="1"
                  />
                  1 day
                </label>
              </li>
              <li>
                <label>
                  <input
                    onChange={(e) => {
                      handleDeliveryChange(e, setSearchParams);
                    }}
                    checked={
                      searchParams.get("delivery") === "2" ? true : false
                    }
                    type="radio"
                    name="days"
                    value="2"
                  />
                  2 days
                </label>
              </li>
              <li>
                <label>
                  <input
                    onChange={(e) => {
                      handleDeliveryChange(e, setSearchParams);
                    }}
                    checked={
                      searchParams.get("delivery") === "3" ? true : false
                    }
                    type="radio"
                    name="days"
                    value="3"
                  />
                  3 days
                </label>
              </li>
              <li>
                <label>
                  <input
                    onChange={(e) => {
                      handleDeliveryChange(e, setSearchParams);
                    }}
                    checked={
                      searchParams.get("delivery") === "4" ? true : false
                    }
                    type="radio"
                    name="days"
                    value="4"
                  />
                  4 days
                </label>
              </li>
            </ul>
          )}
        </div>
        {searchParams && searchParams.size ? (
          <div className="gig-filters-wrap">
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="btn gig-filter__btn btn-primary"
            >
              reset filters
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="gigs-wrapper">
        {gigs.map((gig, ind) => {
          return <GigCard key={ind} gig={{ ...gig }} />;
        })}
      </div>
    </section>
  );
}
