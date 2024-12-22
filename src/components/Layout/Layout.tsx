import { FC } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

type TProps = {
  children: JSX.Element;
};

const Layout: FC<TProps> = ({ children }) => {
  return (
    <div className="font-roboto">
      <Navbar />
      <div className="pt-5">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
