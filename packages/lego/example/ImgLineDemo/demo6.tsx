import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { ImgLine, ReactEcharts } from '@td-design/lego';

export default () => {
  const echartsRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月'];
  const currentName = xAxisData[currentIndex];

  const highlightPrev = () => {
    if (currentIndex >= 0) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  const highlightNext = () => {
    if (currentIndex <= xAxisData.length) {
      setCurrentIndex((idx) => idx + 1);
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

      <ImgLine
        ref={echartsRef}
        xAxisData={xAxisData}
        img={require('../assets/line_bottom.png')}
        style={{ width: 486, height: 254 }}
        yAxis={[{ name: '万kWh' }]}
        seriesData={[
          {
            name: '充电电量',
            yAxisIndex: 0,
            data: [174, 187, 719, 18, 784, 392],
          },
        ]}
        renderer='svg'
      />
    </div>
  );
};
