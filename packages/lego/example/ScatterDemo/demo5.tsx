/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2021-10-11 16:36:21
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-10-11 16:47:35
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { Scatter, ReactEcharts } from '@td-design/lego';

export default () => {
  const echartsRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const xAxisData = ['01月', '02月', '03月', '04月', '05月', '06月'];
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

      <Scatter
        unit="AQI指数"
        ref={echartsRef}
        xAxisData={xAxisData}
        seriesData={[
          {
            name: '北京',
            data: [55, 25, 56, 33, 42, 82],
          },
          {
            name: '上海',
            data: [27, 71, 74, 36, 46, 69],
          },
          {
            name: '重庆',
            data: [91, 65, 83, 109, 106, 109],
          },
        ]}
        style={{ width: 374, height: 214 }}
      />
    </div>
  );
};
