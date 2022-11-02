/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2021-10-11 16:36:21
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-10-11 16:40:08
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { MultiLine, ReactEcharts } from '@td-design/lego';

export default () => {
  const echartsRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const xAxisData = ['1月', '2月', '3月'];
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

      <MultiLine
        ref={echartsRef}
        style={{ width: 486, height: 254 }}
        xAxisData={xAxisData}
        yAxis={[{ name: '万kWh' }, { name: '万次' }]}
        seriesData={[
          {
            name: '充电电量',
            yAxisIndex: 0,
            data: [
              { name: '1月', value: '174' },
              { name: '2月', value: '187' },
              { name: '3月', value: '719' },
            ],
          },
          {
            name: '充电次数',
            yAxisIndex: 1,
            data: [
              { name: '1月', value: '713' },
              { name: '2月', value: '112' },
              { name: '3月', value: '184' },
            ],
          },
        ]}
      />
    </div>
  );
};
