// 也可以fetch外部的api資料
export async function getSortedExternalData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  return data;
}
