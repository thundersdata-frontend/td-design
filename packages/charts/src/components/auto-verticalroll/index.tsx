/*
 * @文件描述: 自动纵向滚动内容
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-20 14:44:00
 * @LastEditors: 仇艳
 * @LastEditTime: 2021-07-30 18:08:40
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import RAF from '../../baseUtils/raf';

type AutoVerticalRollProps = {
  /** 滚动速度 px/s */
  speed?: number;
  /** 滚动结束后触发的回调 */
  onFinish?: () => void;
  /** 不需要分页的情况 多少毫秒触发 onFinish */
  time?: number;
  /** 用于检查数据变动 */
  data?: any[] | string[] | string | any;
  /** 是否循环 */
  isLoop?: boolean;
  /** 内容高度  */
  itemHeight?: number;
  /** 滚动切换到下一个触发事件 */
  onChange?: (currentIndex: number) => void;
};

const AutoVerticalRoll: React.FC<AutoVerticalRollProps> = props => {
  const { speed = 50, onFinish, time = 3000, data, isLoop, itemHeight = 22.8, onChange } = props;
  const step = speed / 20;
  const rollContentRef = useRef<HTMLDivElement>(null);
  const rollChildRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState<boolean>(false);
  const [height, setHeight] = useState(0);
  const [index, setIndex] = useState(0);

  const childrenItem = (key: string | number) => (
    <div key={key} className="childrenItem">
      {props.children}
    </div>
  );
  const childrenContent = [childrenItem('before')];
  if (isLoop) {
    childrenContent.push(childrenItem('after'));
  }

  useEffect(() => {
    if (onChange) {
      onChange(index);
    }
  }, [index, onChange]);

  useEffect(() => {
    // 暂停
    if (pause) {
      return;
    }
    const rollContentDom = rollContentRef.current!;
    const rollChildDom = rollChildRef.current!;
    // 滚动子组件高度
    const childHeight = rollChildDom.clientHeight;
    // 实际子组件高度
    const childRealHeight = isLoop ? childHeight / 2 : childHeight;
    // +8px防止最下面的item超出可视区域
    setHeight(childRealHeight + 8);
    rollContentDom.scrollTop = rollContentDom.scrollTop || 0;

    const raf = new RAF();
    // 定时滚动
    let timer: symbol;
    // 不需要滚动的情况 设置的延迟回调
    let timeOut: symbol;
    if (isLoop && speed > 0) {
      // 滚动上限
      const maxScroll = childHeight - childRealHeight;
      timer = raf.setInterval(() => {
        if (rollContentDom.scrollTop <= maxScroll || isLoop) {
          // 创造无限循环
          const index = Math.floor(rollContentDom.scrollTop / itemHeight);
          setIndex(index);
          const len = Math.abs(maxScroll - rollContentDom.scrollTop);
          if (isLoop && len <= Math.ceil(itemHeight / 2)) {
            rollContentDom.scrollTop = len;
            return;
          }
          rollContentDom.scrollTop += step;
        } else {
          // 单次滚动结束后停止
          rollContentDom.scrollTop = maxScroll;
          raf.clearInterval(timer);
          if (onFinish) {
            onFinish();
          }
        }
      }, 50);
    } else {
      timeOut = raf.setTimeout(() => {
        if (onFinish) {
          onFinish();
        }
      }, time);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      raf.clearInterval(timer);
      raf.clearTimeout(timeOut);
    };
  }, [onFinish, speed, data, time, isLoop, pause, step, itemHeight]);

  return (
    <div
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      className="tdAutoVerticalRollContainer"
    >
      <div style={{ height: height + 4 }} ref={rollContentRef} className="hideScroll">
        <div ref={rollChildRef} className="rollChild">
          {childrenContent}
        </div>
      </div>
    </div>
  );
};

export default AutoVerticalRoll;
