// 时间YYYYMMDD
export const momentFunc = (date: Date) => {
  // 确保传入的是一个有效的日期对象
  // if (!(date instanceof Date)) {
  //   throw new Error("Invalid date object");
  // }
  const d = new Date(date)
  const year: number = d.getFullYear(); // 获取年份
  const month: string = String(d.getMonth() + 1).padStart(2, '0'); // 获取月份并补零
  const day: string = String(d.getDate()).padStart(2, '0'); // 获取日期并补零

  return `${year}-${month}-${day}`; // 返回格式化后的日期字符串
}