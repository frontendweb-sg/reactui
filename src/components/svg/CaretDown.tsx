import React from "react";
import { SvgProps } from "./Check";

const CaretDown = ({
  fill = "#484848",
  size = 16,
  viewBox = "0 0 16 16",
  ...rest
}: SvgProps) => {
  return (
    <svg fill={fill} viewBox={viewBox} width={size} height={size} {...rest}>
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  );
};

export default CaretDown;
