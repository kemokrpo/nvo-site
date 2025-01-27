{/*import { NextPage } from "next";
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
          <AboutBoard about={aboutUs.data.attributes} />
        </div>
      </main>
    </>
  );
};

export default About;

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL; // Use environment variable
  const aboutUs = await fetcher(`${apiUrl}/api/test?populate=*`);

  {console.log(aboutUs.data.attributes.boardImage);}

  return {
    props: {
      aboutUs,
    },
  };
}*/}