import { FC } from "react";

type IconProps = {
  width?: number;
};

const IconWindmillCircle: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg viewBox="0 0 500 500" width={width} height={width}>
      <circle cx="250" cy="250" r="250" style={{ fill: "#721011" }} />
      <g>
        <path
          d="M324.32,298.08l-31.84-18.34H209.36l-31.81,18.34C208,351,299.05,437.63,397.7,445.13c-34.37-19.25-89.09-88.44-73.38-147"
          style={{ fill: "#fff" }}
        />
        <path
          d="M256.17,198.67h0l-.62-1.08Zm90.62-173.8c.51,39.4-32,121.36-90.64,137.07l0,36.73,41.56,72,31.8,18.4c30.6-52.84,60.1-175,17.26-264.19"
          style={{ fill: "#fff" }}
        />
        <path
          d="M204.14,270.66h0l-.63,1.09Zm41.57-108.72c-61-.09-181.61,35.45-237.41,117.15,33.87-20.14,121.13-32.95,164,10l31.81-18.4,41.55-72Z"
          style={{ fill: "#fff" }}
        />
        <path
          d="M231.45,249.69a19.48,19.48,0,1,1,19.48,19.48,19.47,19.47,0,0,1-19.48-19.48"
          style={{ fill: "#fff" }}
        />
      </g>
    </svg>
  );
};

export default IconWindmillCircle;
