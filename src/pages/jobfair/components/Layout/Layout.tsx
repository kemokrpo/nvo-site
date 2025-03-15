import { FC } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

type TProps = {
  children: JSX.Element;
};

const Layout: FC<TProps> = ({ children }) => {
  return (
    <div className="font-roboto">
      <Header />
      <Navbar />
      <div className="pt-5">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
