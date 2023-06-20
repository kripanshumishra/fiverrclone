import Profilepicture from "../profiledisplay/Profilepicture";
import Rating from "../rating/Rating";

import './Review.css';

export default function Review() {
  const review = {
    img: "https://images.pexels.com/photos/1771383/pexels-photo-1771383.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: "Garner David",
    flag: "",
    country: "united states",
    stars: 4,
    txt:"I just want to say that art_with_ai was the first, and after this, the only artist Ill be using on Fiverr. Communication was amazing, each and every day he sent me images that I was free to request changes to. They listened, understood, and delivered above and beyond my expectations. I absolutely recommend this gig, and know already that Ill be using it again very very soon"
  };
  return (
    <section className="review-container">
      <header className="review-header">
        <Profilepicture userPP={review.img} userInitial={review.name[0]} />
        <div>
          <h3>{review.name}</h3>
          <p>{review.country}</p>
        </div>
      </header>
      <Rating stars={review.stars} />
      <p className="review-text">{review.txt}
      </p>
    </section>
  );
}
