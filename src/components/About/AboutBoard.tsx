import Image from "next/image";
import { FC } from "react";

import ReactMarkdown from "react-markdown";

import { getStrapiURL } from "../../../lib/api";

type TProps = {
  about: {
    text: string;
    title: string;
    boardName: string;
    boardImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

const AboutBoard: FC<TProps> = ({ about }) => {
  const loader = () => {
    return getStrapiURL(about.boardImage.data.attributes.url);
  };

  return (
    <section className="flex justify-between bg-gray-800 mb-10">
      <div className="relative flex justify-center w-3/4">
        <Image
          src={"me.png"}
          loader={loader}
          alt="Hero background image"
          style={{ objectFit: "cover", backgroundPosition: "center" }}
          className="overflow-hidden"
          fill
        />
      </div>
      <div className=" ml-5 w-1/2 p-10">
        <div className="bg-gray-200 w-max pl-2 pr-2 pt-1 pb-1 mb-2 rounded-md">
          <h5 className="text-sm text-gray-600 font-medium">
            {about.boardName}
          </h5>
        </div>
        <h2 className="text-3xl font-bold text-gray-300">{about.title}</h2>
        <div className="mt-3 text-gray-400 text-justify">
          <ReactMarkdown>{about.text}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default AboutBoard;
