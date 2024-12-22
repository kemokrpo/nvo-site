import { FC } from "react";

type IconProps = {
  width?: number;
};

const IconFun: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 16C4 14.8954 4.89543 14 6 14H9C10.1046 14 11 14.8954 11 16V19C11 20.1046 10.1046 21 9 21H6C4.89543 21 4 20.1046 4 19V16Z"
        stroke="inherit"
        strokeWidth="2"
      />
      <path
        d="M17.4106 14.1789C17.4474 14.1052 17.5526 14.1052 17.5894 14.1789L20.9276 20.8553C20.9609 20.9218 20.9125 21 20.8382 21H14.1618C14.0875 21 14.0391 20.9218 14.0724 20.8553L17.4106 14.1789Z"
        stroke="inherit"
        strokeWidth="2"
      />
      <path
        d="M4 6.5C4 4.567 5.567 3 7.5 3C9.433 3 11 4.567 11 6.5C11 8.433 9.433 10 7.5 10C5.567 10 4 8.433 4 6.5Z"
        stroke="inherit"
        strokeWidth="2"
      />
    </svg>
  );
};

export default IconFun;
