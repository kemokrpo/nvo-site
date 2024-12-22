import { FC } from "react";

type IconProps = {
  width?: number;
};

const IconImprovement: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 1024 1024"
      className="icon"
      version="1.1"
    >
      <path
        d="M149.333333 661.333333h213.333334v213.333334H149.333333zM753.066667 411.733333l-119.466667-119.466666c-8.533333-8.533333-8.533333-21.333333 0-29.866667l119.466667-119.466667c8.533333-8.533333 21.333333-8.533333 29.866666 0l119.466667 119.466667c8.533333 8.533333 8.533333 21.333333 0 29.866667l-119.466667 119.466666c-8.533333 8.533333-21.333333 8.533333-29.866666 0z"
        fill="inherit"
      />
      <path
        d="M256 277.333333m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z"
        fill="inherit"
      />
      <path
        d="M768 768m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z"
        fill="inherit"
      />
      <path
        d="M234.666667 512h42.666666v106.666667h-42.666666z"
        fill="inherit"
      />
      <path d="M256 448l-64 85.333333h128z" fill="inherit" />
      <path
        d="M426.666667 256h106.666666v42.666667h-106.666666z"
        fill="inherit"
      />
      <path d="M597.333333 277.333333l-85.333333-64v128z" fill="inherit" />
      <path
        d="M746.666667 448h42.666666v106.666667h-42.666666z"
        fill="inherit"
      />
      <path d="M768 618.666667l64-85.333334h-128z" fill="inherit" />
    </svg>
  );
};

export default IconImprovement;
