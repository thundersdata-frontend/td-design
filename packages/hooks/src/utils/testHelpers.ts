/**
 * 模拟异步操作
 * @param time
 * @returns
 */
export function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
