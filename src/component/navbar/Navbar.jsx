import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import Profilepicture from "../profiledisplay/Profilepicture";
import { mainCategories } from "../../../data/data";
import { authContext } from "../../context/authProvider/authProvider";
import makeRequest from "../../utils/makeRequest";
function Navbar() {
  const [Active, setActive] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const { authData: currentUser, setAuthData } = useContext(authContext);

  const handleLogout = async (setAuthData) => {
    try {
      const res = await makeRequest.post("/auth/logout");
      alert(res.data);
      setAuthData(null);
    } catch (error) {
      console.log("handleLogout()", error);
    }
  };

  return (
    <div
      className={`header-wrapper ${
        Active || pathname !== "/" ? "active" : ""
      } `}
    >
      <header className={`header container`}>
        <div className={`top-nav header-row-wrapper inline-spacing`}>
          <div>
            <Link className="brand " to={"/"}>
              Fiverr <span className="brand-dot">.</span>
            </Link>
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
                        className="header-userProfile "
                        aria-label="profile button to toggle between navigation"
                        aria-controls="user-profile-nav"
                        onClick={(e) => {
                          setDrawerOpen((pre) => !pre);
                        }}
                      >
                        <Profilepicture
                          userInitial={currentUser.username[0]}
                          userPP={currentUser.img}
                        />
                      </button>
                    </a>
                    <ul
                      className={` link-drawer ${
                        drawerOpen ? "link-drawer-isopen" : ""
                      } `}
                      id="user-profile-nav"
                    >
                      <li><Link to = { "/orders"}>my Orders </Link></li>
                      <li><Link to={"/messages"}> messages </Link></li>
                      {currentUser && currentUser.isSeller ? <>
                        <li><Link to={"/mygigs"}> My Gigs  </Link></li>
                        <li><Link to={"/add"}> Add Gigs  </Link></li>
                      
                      </> : <></>}

                      <hr aria-hidden="true" />
                      <li className="btn-grp logout-container">
                        <button
                          className="btn btn-dark "
                          onClick={(e) => {
                            handleLogout(setAuthData);
                          }}
                        >
                          logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  {/* <li>Explore</li>
                  <li>English</li> */}
                  {/* <li>
                    <Link to={"/register"}>Become a Seller</Link>
                  </li> */}
                  <li>
                    <Link to={"/login"}>Sign in</Link>
                  </li>
                  <li>
                    <Link to={"/register"}>Join</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className={`secondry-nav ${pathname !=="/" ? "d-none" : ""}`}>
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
