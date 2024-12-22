import { FC } from "react";

type IconProps = {
  width?: number;
};

const IconFundraising: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg width={width} height={width} viewBox="0 0 1024 1024">
      <path
        d="M200.99 814.55c-23.52-39.54-24.45-87.29-2.48-127.71l214.17-394.27h127.24l119.46 218.25 64.14-35.11-100.24-183.14h35.02v-73.14h-33.39l69.95-146.29H256l76.33 146.29h-39.76v73.14h36.84l-195.2 359.34c-34.39 63.34-32.93 138.11 3.91 200.04s101.86 98.91 173.91 98.91h89.3v-73.14h-89.3c-46-0.01-87.52-23.61-111.04-63.17z m175.68-668.26h202.14l-34.98 73.14H414.84l-38.17-73.14z"
        fill="inherit"
      />
      <path
        d="M914.29 731.43V548.57H475.44v109.71H402.3v182.86h73.14v109.71H914.29V768h-73.14v-36.57h73.14z m-73.14-109.72v36.57h-36.57v-36.57h36.57z m-292.57 0h182.86v36.57H548.58v-36.57z m-73.14 109.72H658.3V768H475.44v-36.57z m73.14 146.28v-36.57h182.85v36.57H548.58z m292.57 0h-36.57v-36.57h36.57v36.57zM731.44 768v-36.57h36.57V768h-36.57z"
        fill="inherit"
      />
    </svg>
  );
};

export default IconFundraising;
