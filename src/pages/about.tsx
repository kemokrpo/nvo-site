{/*
import { NextPage } from "next";
import Head from "next/head";
import { fetcher } from "../../lib/api";
import Image from "next/image";
import bg from "@/assets/images/hackathon.jpg";
import AboutBoard from "@/components/About/AboutBoard";

const About: NextPage = ({ aboutUs }: any) => {
  return (
    <>
      <Head>
        <title>O nama</title>
      </Head>

      <main>
        <div>
          <section className="bg-gray-100 p-[5rem_5rem] flex justify-between gap-10 h-[65vh]">
            <div className="w-1/2 h-full">
              <div className="bg-red-200 w-max pl-2 pr-2 pt-1 pb-1 rounded-md">
                <h5 className="text-sm text-main font-medium">ABOUT US</h5>
              </div>
              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                Ukratko o nama
              </h2>
              <p className="mt-5 text-gray-700 text-justify">
                BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić”
                u Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
                postojanja izrasla je u jednu od najprepoznatljivih studentskih
                organizacija u Mostaru. Zahvaljujući zalaganju mladih i
                entuzijastičnih članova organizacije, studentima Univerziteta je
                omogućeno povezivanje, razmjena i saradnja sa studentima iz
                cijele Evrope.
              </p>
              <p className="mt-5 text-gray-700 text-justify">
                BEST Mostar je lokalna BEST grupa Univerziteta “Džemal Bijedić”
                u Mostaru, koja broji više od 45 aktivnih članova. Za 11 godina
                postojanja izrasla je u jednu od najprepoznatljivih studentskih
                organizacija u Mostaru. Zahvaljujući zalaganju mladih i
                entuzijastičnih članova organizacije, studentima Univerziteta je
                omogućeno povezivanje, razmjena i saradnja sa studentima iz
                cijele Evrope.
              </p>
            </div>
            <div className="w-1/2 relative rounded-md overflow-hidden">
              <Image
                src={bg}
                alt="Hero background image"
                style={{ objectFit: "cover" }}
                className="overflow-hidden"
                fill
              />
            </div>
          </section>
          <AboutBoard about={aboutUs.data.attributes} />
        </div>
      </main>
    </>
  );
};

export default About;

export async function getStaticProps() {
  const aboutUs = await fetcher(
    `http://127.0.0.1:1337/api/about-us?populate=*`
  );

  console.log(aboutUs.data.attributes.boardImage);

  return {
    props: {
      aboutUs,
    },
  };
}
*/}


// pages/about.tsx
const mockAboutUs = {
  data: {
    attributes: {
      boardImage: '/assets/images/board-XI-image.jpg', // Replace with a path to a local static image
      aboutText: 'This is a mock description of the about page.',
    },
  },
};

const AboutPage = ({ aboutUs }: any) => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="board-image">
        <img src={aboutUs.data.attributes.boardImage} alt="Board Image" />
      </div>
      <p>{aboutUs.data.attributes.aboutText}</p>
    </div>
  );
};

// This will replace the API request with mock data for testing
export async function getStaticProps() {
  return {
    props: {
      aboutUs: mockAboutUs, // Pass the mock data here
    },
  };
}

export default AboutPage;

