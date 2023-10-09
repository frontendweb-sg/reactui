import React from "react";
import { SvgProps } from "./Check";

const CaretUp = ({
  fill = "#484848",
  size = 16,
  viewBox = "0 0 16 16",
  ...rest
}: SvgProps) => {
  return (
    <svg fill={fill} viewBox={viewBox} width={size} height={size} {...rest}>
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg>
  );
};

export default CaretUp;
