import "./Rating.css" ;

export default function Rating({stars}) {
  return (
    <div className="rating">
        <span aria-hidden="true">
          {Array(stars)
            .fill()
            .map((item, ind) => {
              return <img className="rating-star" key={ind} src="/img/star.png" alt="" />;
            })}
        </span>
        {stars} / 5 <span className="visually-hidden">stars</span>
      </div>
  )
};
