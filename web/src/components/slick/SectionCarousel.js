import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "./GridContainer";
import GridItem from "./GridItem";
import Card from "./Card";

import image1 from "./event1.jpg";
import image2 from "./event2.jpg";
import image3 from "./event3.jpg";

import styles from "./carouselStyle.js";

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: 900
  }
}));

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000
  };
  return (
    <Carousel {...settings} style={{ marginTop: 770 }}>
      <div>
        <img src={image1} alt="First slide" className="slick-image" />
      </div>
      <div>
        <img src={image2} alt="Second slide" className="slick-image" />
      </div>
      <div>
        <img src={image3} alt="Third slide" className="slick-image" />
      </div>
    </Carousel>
  );
}
