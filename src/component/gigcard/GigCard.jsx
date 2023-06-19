import "./GigCard.css";
export default function GigCard({gig}) {
  console.log( gig )
  return (
    <div className="gigcard-container">
      <a href="#">
      <div className="gigcard-cover__img" role="region" aria-label="cover image of the gig">
        <img
          src={gig?.cover ? gig.cover : ""}
          alt="cover"
        />
      </div>
      <div className="gigcard-info ">
        <div role="header" className="gigcard-seller">
          <figure className="gigcard-seller__brand" aria-hidden="true">
            {gig?.user?.img ? <img src={gig?.user.img ? gig.img : ""} alt="" /> :<></>}
            <figcaption> {gig?.user?.username[0]} </figcaption>
          </figure>
          <h3 className="gigcard-seller__uname">
            <span className="visually-hidden">username</span> { gig?.user?.username ? gig.user.username : "user" }
          </h3>
        </div>
        <p> { gig?.desc} </p>
        <div className="gigcard-ratings" >
          <span aria-label="rating">
            <span className="gigcard-star" aria-hidden="true">
              <img src="/img/star.png" alt="star" />
            </span>
            <span className="gigcard-rating__val">
              <strong>{gig?.star ? gig.star : 0}</strong> <span className="visually-hidden">stars</span>{" "}
            </span>
          </span>
        </div>
        <div className="gigcard-footer">
            <span>Starting At</span>
            <span>${gig?.price}</span>
        </div>
      </div>
      </a>
    </div>
  );
}
