import type { Service, Data, Params } from './types';

export const request: Service<Data, Params> = ({
  current = 1,
  pageSize = 10,
  fail = false,
}: {
  current: number;
  pageSize: number;
  fail?: boolean;
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error('fail'));
      } else {
        const originalData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const total = originalData.length;
        const list = originalData.slice((current - 1) * pageSize, current * pageSize);

        resolve({
          total,
          list,
        });
      }
    }, 1000);
  });
};
