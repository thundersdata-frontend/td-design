import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import './index.less';

export interface ScrollNumberProps {
  value: string | number;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

const ScrollNumber: FC<ScrollNumberProps> = ({ value, containerStyle, itemStyle }) => {
  const numberItem = useRef<HTMLDivElement>(null);

  const [numStr, setNumStr] = useState(String(value));

  // 设置每一位数字的偏移
  const setNumberTransform = useCallback(() => {
    if (numberItem) {
      if (!numStr) {
        return;
      }
      const items = numberItem?.current?.children || [];
      const numberArr = numStr.split('');
      for (let index = 0; index < items.length; index++) {
        const elem = items[index].children[0] as HTMLElement;
        if (!elem) {
          continue;
        }
        elem.style.transform = `translate(0%, -${parseInt(numberArr[index]) * 10}%)`;
      }
    }
  }, [numStr]);

  useEffect(() => {
    setNumStr(String(value));
    requestAnimationFrame(() => {
      setNumberTransform();
    });
  }, [value, setNumberTransform]);

  return (
    <div style={containerStyle} ref={numberItem}>
      {numStr &&
        numStr.split('').map((item, index) => {
          if (item && isNaN(parseInt(item))) {
            return (
              <span className={'sign'} key={numStr + index}>
                {item}
              </span>
            );
          }
          return (
            <div key={numStr + index} className={'boxItem'} style={itemStyle}>
              <div className={'boxList'}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
                  return <div key={item}>{item}</div>;
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ScrollNumber;
