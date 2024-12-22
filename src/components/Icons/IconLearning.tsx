import { FC } from "react";

type IconProps = {
  width?: number;
};

const IconLearning: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg
      height={width}
      width={width}
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <g>
        <path
          d="M6,7H0.9C0.4,7,0,7.4,0,7.9v9.1C0,17.6,0.4,18,0.9,18H6c1.7,0,3,1.3,3,3V10C9,8.3,7.7,7,6,7z"
          fill="inherit"
        />
        <path
          d="M18.1,7H13c-1.7,0-3,1.3-3,3v11c0-1.7,1.3-3,3-3h5.1c0.5,0,0.9-0.4,0.9-0.9V7.9C19,7.4,18.6,7,18.1,7z"
          fill="inherit"
        />
      </g>
      <path
        d="M31.9,17.6L29,11.8C28.9,6.4,24.4,2,19,2c-2.8,0-5.4,1.2-7.3,3.2C12.1,5.1,12.5,5,13,5h5.1C19.7,5,21,6.3,21,7.9v9.1
	c0,1.6-1.3,2.9-2.9,2.9H13c-0.6,0-1,0.4-1,1v6c0,0.5,0.3,0.9,0.8,1l10,2c0.1,0,0.1,0,0.2,0c0.2,0,0.5-0.1,0.6-0.2
	c0.2-0.2,0.4-0.5,0.4-0.8v-4h2c1.7,0,3-1.3,3-3v-3h2c0.3,0,0.7-0.2,0.9-0.5S32,17.9,31.9,17.6z"
        fill="inherit"
      />
    </svg>
  );
};

export default IconLearning;
