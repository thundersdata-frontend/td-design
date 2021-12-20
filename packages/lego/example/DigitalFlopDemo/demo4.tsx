import React, { useRef } from 'react';
import { DigitalFlop } from '@td-design/lego';

export default () => {
  const ref = useRef(null);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            ref?.current?.start();
          }}
        >
          开始
        </button>
        <button
          onClick={() => {
            ref?.current?.reset();
          }}
        >
          重置
        </button>
        <button
          onClick={() => {
            ref?.current?.pauseResume();
          }}
        >
          暂停/重新开始
        </button>
        <button
          onClick={() => {
            ref?.current?.update(10000000 + Math.random() * 10000000);
          }}
        >
          更新
        </button>
      </div>
      <DigitalFlop ref={ref} start={0} end={10000000} />
    </div>
  );
};
