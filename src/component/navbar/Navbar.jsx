import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
function Navbar() {
  const menu = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animaation",
    "Music & Audio",
    "Programming & Tech",
    "Photography",
  ];

  const [Active, setActive] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    if( pathname === "/" )
    window.addEventListener("scroll", isActive);

    return () => {
      if ( pathname === "/" )
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
    img:"/img/fun.jpg"
  };

  return (
    <div
      className={`header-wrapper ${
        Active || pathname !== "/" ? "active" : ""
      }  ${pathname === "/" ? "header-sticky" : ""}`}
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
                  <li style={{display:"flex" , alignItems:"center"}}>
                    Hey! {currentUser.username}
                  </li>
                    <li>
                      <button className="header-userProfile" aria-label="profile button to toggle between navigation">
                        <div>
                        <figure aria-hidden="true" >
                          {currentUser?.img ? <img src= { currentUser.img } alt="" />:<></>}
                          <figcaption >K</figcaption>
                        </figure>
                        </div>
                      </button>
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
          {Active ? (
            <>
              <hr />
              <nav
                className="category-menu inline-spacing"
                aria-label="Categories menu"
              >
                <ul>
                  {menu.map((m, ind) => {
                    return (
                      <a href="#" key={ind}>
                        {m}
                      </a>
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
