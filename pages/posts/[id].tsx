import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.scss";

interface Props {
  params?: any;
}
export const getStaticProps: GetStaticProps = async ({ params }: Props) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

// 用於在使用動態路由時生成靜態文件。
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // console.log("paths==>", paths); // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
  return {
    paths,
    fallback: false,
  };
};

export default function Post({
  postData,
}: {
  postData: { title: string; date: string; contentHtml: string };
}) {
  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <br />
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
