import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Slide.css"

export default function Slide(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: props?.desktop ? props.desktop : 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 440 },
      items: props?.tablet ? props.tablet : 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
      <div >
        <Carousel
          swipeable={true}
          draggable={false}
          // showDots={true}
          responsive={responsive}
          infinite={true}
        //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={[ "mobile"]}
          // deviceType={"mobile"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          renderButtonGroupOutside={true}
        >
          {props.children}
        </Carousel>
      </div>
  );
}
