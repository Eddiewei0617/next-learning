import Head from "next/head";
import { GetStaticProps } from "next";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";
import { getSortedExternalData } from "../lib/external";

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = getSortedPostsData(); // 撈到md檔的資料
  const externalData = await getSortedExternalData(); // 撈到外部api的資料
  return {
    props: {
      allPostsData,
      externalData,
    },
  };
};

export default function Home({ allPostsData, externalData }: any) {
  // console.log("allPostsData", allPostsData);
  // console.log("externalData", externalData);

  return (
    <Layout home allPostsData={allPostsData}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
