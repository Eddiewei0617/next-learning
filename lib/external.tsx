// 也可以fetch外部的api資料
export async function getSortedExternalData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  // console.log("res", res); // 一包有很多資料的物件

  const data = await res.json();
  // console.log("data", data); // 把上面那包轉成json格式

  return data;
}
