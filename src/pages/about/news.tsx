import { NextPage } from "next";
import Head from "next/head";
import { fetcher } from "../../../lib/api";
import Image from "next/image";

const Novosti: NextPage = ({ news }: any) => {
  return (
    <>
      <Head>
        <title>Novosti</title>
      </Head>

      <main>
        <div>
          <section className="bg-gray-100 p-[5rem_5rem]">
            <div className="text-center mb-10">
              <h5 className="text-sm text-main font-medium">NEWS</h5>
              <h2 className="mt-1 text-3xl font-bold text-gray-900">Novosti</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.data.map((item: any) => (
                <article
                  key={item.id}
                  className="bg-white shadow-md rounded-md overflow-hidden"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={item.attributes.image.data.attributes.url}
                      alt={item.attributes.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.attributes.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {new Date(item.attributes.publishedAt).toLocaleDateString(
                        "bs-BA"
                      )}
                    </p>
                    <p className="text-gray-700 text-justify">
                      {item.attributes.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Novosti;


export async function getStaticProps() {
  const news = await fetcher(
    `http://127.0.0.1:1337/api/news?populate=*` // Update endpoint to match your API
  );

  return {
    props: {
      news,
    },
  };
}
