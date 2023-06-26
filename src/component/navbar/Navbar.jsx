import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import Profilepicture from "../profiledisplay/Profilepicture";
import { mainCategories } from "../../../data/data";
("..");
function Navbar() {
  const [Active, setActive] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div
      className={`header-wrapper ${
        Active || pathname !== "/" ? "active" : ""
      } ${Active && pathname === "/" ? "header-sticky" : ""}`}
    >
      <header className={`header container`}>
        <div className={` header-row-wrapper inline-spacing`}>
          <div>
            <a className="brand " href="#">
              Fiverr <span className="brand-dot">.</span>
            </a>
          </div>
          <nav
            className="header-primaryNavigation"
            aria-label="primary navigation"
          >
            <ul>
              {currentUser?.username ? (
                <>
                  <li
                    tabIndex={0}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Hey! {currentUser.username}
                  </li>
                  <li>
                    <a href="#">
                      <button
                        className="header-userProfile"
                        aria-label="profile button to toggle between navigation"
                      >
                        <Profilepicture
                          userInitial={currentUser.username[0]}
                          userPP={currentUser.img}
                        />
                      </button>
                    </a>
                    <ul className="link-drawer" >
                      <li>Profile</li>
                      <li>Profile</li>
                      <li>logout</li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li>Fiverr Business</li>
                  <li>Explore</li>
                  <li>English</li>
                  <li>Become a Seller</li>
                  <li>Sign in</li>
                  <li>Join</li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div>
          {Active || pathname !== "/" ? (
            <>
              <hr />
              <nav
                className="category-menu inline-spacing"
                aria-label="Categories menu"
              >
                <ul>
                  {mainCategories.slice(0, 8).map((m, ind) => {
                    return (
                      <li key={ind}>
                        <Link to={"/gigs/?category=" + m.name} key={ind}>
                          {m.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>
    </div>
  );
}
export default Navbar;
