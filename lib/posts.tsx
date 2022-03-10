import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");
// console.log("postsDirectory==>", postsDirectory); // D:\freshman-project\posts

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory); // 讀到資料夾裡的所有檔名，以陣列方式回傳
  // console.log("fileNames==>", fileNames); //  [ 'pre-rendering.md', 'ssg-ssr.md' ]

  const allPostsData: { [key: string]: any }[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");
    // console.log("id==>", id); // id==> pre-rendering  // id==> ssg-ssr

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName); // 要整個檔案的路徑
    // console.log("fullPath==>", fullPath);
    const fileContents = fs.readFileSync(fullPath, "utf8"); // 獲取該md檔裡所有的內容
    // console.log("fileContents==>", fileContents);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // console.log("matterResult", matterResult);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // console.log("allPostsData==>", allPostsData);
  /* allPostsData==> 
  [
  {
    id: 'pre-rendering',
    title: 'Two Forms of Pre-rendering',
    date: '2020-01-01'
  },
  {
    id: 'ssg-ssr',
    title: 'When to Use Static Generation v.s. Server-side Rendering',
    date: '2020-01-02'
  }
  ]  */

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    // !a 代表唯一量值，意思是就只會有一種結果
    if (a < b) {
      return 1;
    } else if (a! > b!) {
      return -1;
    } else {
      return 0;
    }
  });
}

// 製造一個id path ------------------------------------------
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log("fileNames==>", fileNames);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// Important: The returned list is not just an array of strings — it must be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
