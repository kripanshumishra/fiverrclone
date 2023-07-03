import { Link, useNavigate, useParams } from "react-router-dom";
import Profilepicture from "../../component/profiledisplay/Profilepicture";
import Rating from "../../component/rating/Rating";
import Review from "../../component/review/Review";
import makeRequest from "../../utils/makeRequest";
import "./Gig.css";
import { useState, useEffect, useContext } from "react";
import Slide from "../../component/slide/Slide";
import ReviewForm from "../../component/reviewForm/ReviewForm";
import handleConversation from "../../utils/handleConversation";
import { authContext } from "../../context/authProvider/authProvider";
import moment from "moment";

const LoadingComponent = () => {
  return <p>Loading...</p>;
};

export default function Gig() {
  const [isloading, setIsLoading] = useState(false);
  const [gig, setGig] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useContext(authContext)?.authData;
  const handlefetch = async (id) => {
    try {
      const res = (await makeRequest(`/gigs/${id}`)).data;
      return res;
    } catch (error) {
      return Promise.reject(
        error?.response?.data?.msg || "somethig went wrong"
      );
    }
  };
  const handleReview = async (id) => {
    try {
      const data = await makeRequest.get(`/reviews/${id}`);
      return data.data;
    } catch (error) {
      return Promise.reject("something went wrong");
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    handlefetch(id)
      .then((data) => {
        if (isMounted) {
          setGig(data);
        }
      })
      .catch((error) => {
        console.log("useEffect gig page", error);
      })
      .finally((s) => {
        setIsLoading(false);
      });

    handleReview(id)
      .then((data) => {
        if (isMounted) {
          setReviews(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="container inline-spacing">
      {isloading ? (
        <LoadingComponent />
      ) : (
        <section className="gig-wrapper">
          <section className="gig-left">
            <header className="gig-page-main-header">
              <h2>{gig.title}</h2>
              <div>
                <Profilepicture
                  userInitial={gig?.user?.username[0]}
                  userPP={gig?.user?.img}
                />
                <div>
                  <p>
                    <span className="visually-hidden">username is </span>{" "}
                    {gig?.user?.username}
                  </p>
                  <Rating
                    stars={
                      gig.starFrequency
                        ? Math.floor(gig.totalStars / gig.starFrequency)
                        : 1
                    }
                  />
                </div>
              </div>
            </header>
            <div>
              <div
                role="region"
                className="gig-sample-images"
                aria-label="gig sample images"
              >
                {gig.images && (
                  <Slide>
                    {gig.images.map((img, ind) => {
                      return (
                        <div key={ind}>
                          <img
                            className="gig-sample-image"
                            key={ind}
                            src={img}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Slide>
                )}

                {/* {
           gig?.images?.map( ( img , ind ) =>{
            return <img  key={ind}
            src={img}
            alt=""
          />
          })
        } */}
              </div>

              <div className="gig-about__container">
                <h3>About This Gig</h3>
                <p>{gig.desc}</p>
              </div>
            </div>
            <div className="user-gig-tag__container">
              {gig.features &&
                gig.features.map((feature) => (
                  <span className="gig-tag">{feature}</span>
                ))}
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
                  <Profilepicture
                    userInitial={gig?.user?.username[0]}
                    userPP={gig?.user?.img}
                  />
                </div>
                <div>
                  <div>
                    <p>
                      <span className="visually-hidden">user name </span>{" "}
                      {gig?.user?.username}
                    </p>
                  </div>
                  {/* <div className="gig-about-user-rating">
                  // this is user rating that i don't have rn
                    <Rating stars={4} />
                  </div> */}
                  <div className="gig-about-user--contactme">
                    {currentUser?.isSeller === false ? (
                      <button
                        onClick={() => {
                          handleConversation(
                            currentUser?._id,
                            gig?.user?._id,
                            navigate
                          );
                        }}
                        className="btn gig-about-user--contactme"
                        aria-label="contact with this seller"
                      >
                        {" "}
                        Contact me{" "}
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="user-info--container">
                  <div className="user-info">
                    <div className="user-info__block">
                      <p>From</p>
                      <p>{gig?.user?.country}</p>
                    </div>
                    <div className="user-info__block">
                      <p>Member Since</p>
                      <p>{ moment(gig?.user?.createdAt).fromNow() }</p>
                    </div>
                    {/* <div className="user-info__block">
                      <p>Avg. response Time</p>
                      <p>4 hours</p>
                    </div> */}
                    <div className="user-info__block">
                      <p>Total Orders</p>
                      <p>{gig?.user?.total_orders || 0 }</p>
                    </div>
                    <div className="user-info__block">
                      <p>last delivery</p>
                      <p>Today</p>
                    </div>
                  </div>
                  <hr aria-hidden="true" />
                  <div className="user-bio">{gig?.user?.desc}</div>
                </div>
              </div>
            </div>
            
            {
              currentUser?.isSeller
              ?
              <></>
              :
              <div>
              <ReviewForm gigId={id} setReviews = {setReviews} />
            </div>
              
            }
            <div>
              <header>
                <h2>What people think about this seller</h2>
              </header>
              {reviews.map((review, ind) => {
                return <Review key={ind} review={review} />;
              })}
            </div>
          </section>
          <section className="gig-right gig-side-card">
            <header>
              <h2>Pricing and Feature</h2>
            </header>
            <div>
              <div className="gig-side-card__price">
                <p> price </p>
                <p>$ {gig.price}</p>
              </div>
              <div className="gig-special-feature">
                <span className="gig-features">
                  <img aria-hidden="true" src="/img/clock.png" alt="" />{" "}
                  {gig.deliveryTime}-day delivery
                </span>
                <span className="gig-features">
                  <img aria-hidden="true" src="/img/recycle.png" alt="" />{" "}
                  {gig.revisionNumber}
                  revision
                </span>
              </div>
              <div className="gig-other-feature">

              {gig.features &&
                gig.features.map((feature) => (
                  <span className="gig-features">
                  <img src="/img/greencheck.png" alt="" /> {feature}
                </span>
                ))}
              </div>
            </div>
            <div>
              {!currentUser?.isSeller ? (
                <form>
                  <div className="btn-grp">
                    <Link className="btn btn-primary" to={`/pay/${gig._id}`}>
                      Continue
                    </Link>
                  </div>
                </form>
              ) : (
                <></>
              )}
            </div>
          </section>
        </section>
      )}
    </section>
  );
}
