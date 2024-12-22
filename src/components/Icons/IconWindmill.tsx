import { FC } from "react";

type IconProps = {
  width?: number;
};

const IconWindmill: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg viewBox="0 0 615 500" width={width} height={width}>
      <g id="Windmill_Best">
        <g>
          <path
            d="M392.53,323.87l-37.4-21.48H257.48l-37.39,21.48c35.78,62,142.75,163.41,258.66,172.19-40.39-22.55-104.67-103.57-86.22-172.19"
            style={{ fill: "inherit" }}
          />
          <path
            d="M312.47,207.47h0l-.73-1.27ZM418.93,3.94c.6,46.15-37.64,142.11-106.49,160.51l0,43,48.82,84.29,37.36,21.54c36-61.87,70.62-204.92,20.28-309.36"
            style={{ fill: "inherit" }}
          />
          <path
            d="M251.33,291.76h0L250.6,293Zm48.85-127.31C228.47,164.35,86.82,206,21.25,301.63,61.05,278,163.56,263.05,214,313.31l37.36-21.55,48.83-84.28Z"
            style={{ fill: "inherit" }}
          />
          <path
            d="M283.42,267.2A22.89,22.89,0,1,1,306.31,290a22.85,22.85,0,0,1-22.89-22.81"
            style={{ fill: "inherit" }}
          />
        </g>
      </g>
    </svg>
  );
};

export default IconWindmill;
