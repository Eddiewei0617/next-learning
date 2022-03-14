import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 從外部獲取的api資料
  let res = await fetch("https://catfact.ninja/fact");
  let catFact = await res.json();

  // 如果沒有該資料，就回404 or 跳轉頁面至首頁
  if (!catFact) {
    return {
      notFound: true,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 以object方式回傳甚麼資料出去
  return {
    props: { message: `Next.js is awesome`, catFact },
  };
};

export default function Product({ message, catFact }) {
  return (
    <>
      <h1>This is a product page.</h1>
      <h2>{message}</h2>
      <div>{`this cat is ${catFact.length} long.`}</div>
    </>
  );
}
