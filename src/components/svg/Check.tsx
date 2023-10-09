import React from "react";

export type SvgProps = React.SVGAttributes<HTMLOrSVGElement> & {
  size?: number;
  viewBox?: string;
};

const Check = ({
  fill = "#484848",
  size = 16,
  viewBox = "0 0 8 8",
  ...rest
}: SvgProps) => {
  return (
    <svg fill={fill} viewBox={viewBox} width={size} height={size} {...rest}>
      <path d="M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z" />
    </svg>
  );
};

export default Check;
