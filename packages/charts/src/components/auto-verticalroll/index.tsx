/*
 * @文件描述: 自动纵向滚动内容
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-20 14:44:00
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-06-05 11:49:42
 */
import React, { useRef, useEffect, useState } from 'react';
import RAF from '../../utils/raf';

interface AutoVerticalRollProps {
  speed?: number; // 滚动速度 px/s
  onFinish?: () => void; // 滚动结束后触发的回调
  time?: number; // 不需要分页的情况 多少毫秒触发 onFinish
  data?: object[] | string[] | string | object; // 用于检查数据变动
  isLoop?: boolean; // 是否循环
  distance?: number; // 循环模式下的间距
}

const AutoVerticalRoll: React.FC<AutoVerticalRollProps> = props => {
  const { speed = 50, onFinish, time = 3000, data, isLoop, distance = 0 } = props;
  const step = speed / 20;
  const rollContentRef = useRef<HTMLDivElement>(null);
  const rollChildRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState<boolean>(false);
  const [height, setHeight] = useState(0);

  const childrenItem = (key: string | number) => (
    <div key={key} style={{ marginTop: isLoop ? distance : 0 }} className="childrenitem">
      {props.children}
    </div>
  );
  const childrenContent = [childrenItem('before')];
  if (isLoop) {
    childrenContent.push(childrenItem('after'));
  }

  useEffect(() => {
    // 暂停
    if (pause) {
      return;
    }
    const rollContentDom = rollContentRef.current!;
    const rollChildDom = rollChildRef.current!;
    // 内容区域限定高度
    const contentHeight = rollContentDom.clientHeight;
    // 滚动子组件高度
    const childHeight = rollChildDom.clientHeight;
    // 实际子组件宽度
    const childRealHeight = isLoop ? (childHeight - distance) / 2 : childHeight;
    setHeight(childRealHeight);
    rollContentDom.scrollTop = rollContentDom.scrollTop || 0;
    const raf = new RAF();
    // 定时滚动
    let timer: symbol;
    // 不需要滚动的情况 设置的延迟回调
    let timeOut: symbol;
    if (childHeight > contentHeight && speed > 0) {
      // 滚动上限
      const maxScroll = childHeight - childRealHeight - distance;
      timer = raf.setInterval(() => {
        if (rollContentDom.scrollTop < maxScroll || isLoop) {
          // 创造无限循环
          if (isLoop && Math.abs(maxScroll - rollContentDom.scrollTop) <= step) {
            rollContentDom.scrollTop = 2;
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
  }, [onFinish, speed, data, time, isLoop, distance, pause, step]);

  return (
    <div
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      className="td-autoverticalroll-container"
    >
      <div style={{ height }} ref={rollContentRef} className="hidescroll">
        <div ref={rollChildRef} className="rollchild">
          {childrenContent}
        </div>
      </div>
    </div>
  );
};

export default AutoVerticalRoll;
