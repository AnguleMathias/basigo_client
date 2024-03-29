import React from "react";
import MotionFlex from "../MotionFlex";

const Card = ({ children, ...rest }) => {
  const variants = {
    show: {
      y: 0,
      opacity: 1,
    },
    hide: {
      y: 50,
      opacity: 0,
    },
  };

  return (
    <MotionFlex animate="show" initial="hide" variants={variants} {...rest}>
      {children}
    </MotionFlex>
  );
};

Card.defaultProps = {
  bg: "white",
  width: "auto",
  rounded: "md",
  onClick: () => false,
  flexDirection: "column",
  roundedTopLeft: 4,
  roundedTopRight: 4,
  overflow: "hidden",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.17)",
};

export default Card;
