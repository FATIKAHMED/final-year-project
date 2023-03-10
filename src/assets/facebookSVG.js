import React from "react";

const SVGComponent = (props) => (
  <svg width={30} height={30} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        d="M28.344 30C29.26 30 30 29.26 30 28.344V1.656C30 .74 29.259 0 28.344 0H1.656C.74 0 0 .741 0 1.656v26.688C0 29.26.741 30 1.656 30h26.688"
        fill="#395185"
      />
      <path
        d="M20.7 30V18.383h3.9l.583-4.528h-4.484v-2.89c0-1.312.364-2.205 2.244-2.205l2.398-.001v-4.05c-.415-.055-1.838-.178-3.494-.178-3.457 0-5.823 2.11-5.823 5.985v3.339h-3.91v4.527h3.91V30h4.675"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h30v30H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SVGComponent;
