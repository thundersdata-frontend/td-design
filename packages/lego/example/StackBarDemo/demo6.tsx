import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { StackBar, ReactEcharts } from '@td-design/lego';

export default () => {
  const echartsRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const xAxisData = ['01月', '02月', '03月', '04月', '05月', '06月'];
  const currentName = xAxisData[currentIndex];

  const highlightPrev = () => {
    if (currentIndex >= 0) {
      setCurrentIndex(idx => idx - 1);
    }
  };

  const highlightNext = () => {
    if (currentIndex <= xAxisData.length) {
      setCurrentIndex(idx => idx + 1);
    }
  };

  // 用 currentIndex 来驱动图表变化
  useEffect(() => {
    // 取消高亮效果
    instance?.dispatchAction({
      type: 'downplay',
    });
    // 先把提示框都隐藏
    instance?.dispatchAction({
      type: 'hideTip',
    });

    if (currentIndex > -1) {
      // 再根据 currentIndex 显示对应的提示框
      instance?.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });

      currentName &&
        instance?.dispatchAction({
          type: 'highlight',
          name: currentName,
        });
    }
  }, [currentIndex, currentName, instance]);

  return (
    <div>
      <div>
        <Button onClick={highlightPrev}>高亮上一个</Button>
        <Button onClick={highlightNext}>高亮下一个</Button>
      </div>
      <StackBar
        ref={echartsRef}
        xAxisData={xAxisData}
        unit="万"
        seriesData={[
          { name: '月高速车辆总数', data: [2012, 2555, 1234, 1899, 1986, 2100] },
          { name: '月空车数量', data: [1222, 1333, 899, 1234, 1500, 900] },
        ]}
        style={{ width: 486, height: 254 }}
      />
    </div>
  );
};
