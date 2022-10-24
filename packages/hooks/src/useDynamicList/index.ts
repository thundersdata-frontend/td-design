import { useCallback, useRef, useState } from 'react';

import useMemoizedFn from '../useMemoizedFn';

export default function useDynamicList<T>(initialList: T[] = []) {
  const counterRef = useRef(-1);
  const keyListRef = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyListRef.current.splice(index, 0, counterRef.current);
  }, []);

  const [list, setList] = useState(() => {
    initialList.forEach((_, index) => {
      setKey(index);
    });
    return initialList;
  });

  /**
   * 重设List
   * @param newList
   */
  const reset = (newList: T[]) => {
    keyListRef.current = [];
    setList(() => {
      newList.forEach((_, index) => {
        setKey(index);
      });
      return newList;
    });
  };

  /**
   * 在指定位置插入一个新数据
   * @param index
   * @param item
   */
  const insert = (index: number, item: T) => {
    setList(l => {
      const temp = [...l];
      temp.splice(index, 0, item);
      setKey(index);

      return temp;
    });
  };

  const getKey = (index: number) => {
    return keyListRef.current[index];
  };

  const getIndex = (key: number) => {
    return keyListRef.current.findIndex(item => item === key);
  };

  /**
   * 从指定位置开始，合并数据
   * @param index
   * @param items
   */
  const merge = (index: number, items: T[]) => {
    setList(l => {
      const temp = [...l];
      items.forEach((_, i) => {
        setKey(index + i);
      });
      temp.splice(index, 0, ...items);

      return temp;
    });
  };

  /**
   * 替换指定位置的数据
   * @param index
   * @param item
   */
  const replace = (index: number, item: T) => {
    setList(l => {
      const temp = [...l];
      temp[index] = item;

      return temp;
    });
  };

  /**
   * 删除指定位置的数据
   * @param index
   */
  const remove = (index: number) => {
    setList(l => {
      const temp = [...l];
      temp.splice(index, 1);

      try {
        keyListRef.current.splice(index, 1);
      } catch (e) {
        console.error(e);
      }

      return temp;
    });
  };

  /**
   * 移动数据到新位置
   * @param oldIndex
   * @param newIndex
   */
  const move = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return;

    setList(l => {
      const newList = [...l];
      const temp = newList.filter((_, index) => index !== oldIndex);
      temp.splice(newIndex, 0, newList[oldIndex]);

      try {
        const keyTemp = keyListRef.current.filter((_, index) => index !== oldIndex);
        keyTemp.splice(newIndex, 0, keyListRef.current[oldIndex]);
        keyListRef.current = keyTemp;
      } catch (error) {
        console.error(error);
      }

      return temp;
    });
  };

  /**
   * 在当前数组中插入一个新的数据
   * @param item
   */
  const push = (item: T) => {
    setList(l => {
      setKey(l.length);

      return l.concat([item]);
    });
  };

  /**
   * 从数组中删除最后一个数据，返回新数组
   */
  const pop = () => {
    try {
      keyListRef.current = keyListRef.current.slice(0, keyListRef.current.length - 1);
    } catch (error) {
      console.error(error);
    }

    setList(l => l.slice(0, l.length - 1));
  };

  /**
   * 在数组最前面插入一条新数据
   * @param item
   */
  const unshift = (item: T) => {
    setList(l => {
      setKey(0);

      return [item].concat(l);
    });
  };

  /**
   * 删除数组的第一条数据，并返回新数组
   */
  const shift = () => {
    try {
      keyListRef.current = keyListRef.current.slice(1, keyListRef.current.length);
    } catch (error) {
      console.error(error);
    }
    setList(l => l.slice(1, l.length));
  };

  const sort = (result: T[]) => {
    return result
      .map((item, index) => ({ key: index, item }))
      .sort((a, b) => getIndex(a.key) - getIndex(b.key))
      .filter(item => !!item.item)
      .map(item => item.item);
  };

  return {
    list,
    insert: useMemoizedFn(insert),
    merge: useMemoizedFn(merge),
    replace: useMemoizedFn(replace),
    remove: useMemoizedFn(remove),
    getKey: useMemoizedFn(getKey),
    getIndex: useMemoizedFn(getIndex),
    move: useMemoizedFn(move),
    push: useMemoizedFn(push),
    pop: useMemoizedFn(pop),
    unshift: useMemoizedFn(unshift),
    shift: useMemoizedFn(shift),
    sort: useMemoizedFn(sort),
    reset: useMemoizedFn(reset),
  };
}
