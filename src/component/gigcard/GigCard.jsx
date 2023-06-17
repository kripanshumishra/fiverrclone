import "./GigCard.css";
export default function GigCard({gig}) {
  // console.log( gig )
  return (
    <div className="gigcard-container">
      <a href="#">
      <div className="gigcard-cover__img" role="region" aria-label="cover image of the gig">
        <img
          src={gig?.img ? gig.img : ""}
          alt=""
        />
      </div>
      <div className="gigcard-info ">
        <div role="header" className="gigcard-seller">
          <figure className="gigcard-seller__brand" aria-hidden="true">
            <img src={gig?.pp ? gig.pp : ""} alt="" />
            <figcaption> K </figcaption>
          </figure>
          <h3 className="gigcard-seller__uname">
            <span className="visually-hidden">username</span> { gig?.username ? gig.username : "user" }
          </h3>
        </div>
        <p>I will create ai art character from your images and prompts</p>
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
            <span>${gig.price}</span>
        </div>
      </div>
      </a>
    </div>
  );
}
