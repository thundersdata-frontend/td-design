import React, { useEffect, useRef, useState } from 'react';
import { Map, ReactEcharts, BasePie } from '@td-design/lego';

const pieResult = {
  code: 20000,
  data: {
    title: '货物比例',
    data: {
      series: [
        {
          name: '货物比例',
          type: 'pie',
          data: [
            { name: '已建分拨站', value: '47043' },
            { name: '拟建分拨站', value: '38603' },
            { name: '在建分拨站', value: '31316' },
          ],
        },
      ],
    },
  },
  success: true,
};

const mapResult = {
  code: 20000,
  data: {
    title: '分拨站',
    data: {
      series: [
        {
          name: '分拨站',
          type: 'map',
          data: [
            { name: '已建分拨站', value: [116.65, 36.87] },
            { name: '已建分拨站', value: [116.68, 36.97] },
            { name: '已建分拨站', value: [117.96, 34.87] },
            { name: '已建分拨站', value: [118.12, 34.91] },
            { name: '已建分拨站', value: [115.59, 35.22] },
            { name: '已建分拨站', value: [115.51, 35.15] },
            { name: '已建分拨站', value: [115.24, 35.05] },
            { name: '在建分拨站', value: [116.38, 37.37] },
            { name: '在建分拨站', value: [117.75, 36.2] },
            { name: '拟建分拨站', value: [116.73, 36.49] },
            { name: '拟建分拨站', value: [117.25, 36.79] },
            { name: '拟建分拨站', value: [120.48, 36.49] },
            { name: '拟建分拨站', value: [120.08, 36.23] },
            { name: '拟建分拨站', value: [117.89, 36.67] },
            { name: '拟建分拨站', value: [117.87, 36.86] },
            { name: '拟建分拨站', value: [115.12, 35.33] },
            { name: '拟建分拨站', value: [116.04, 34.85] },
          ],
        },
      ],
    },
  },
  success: true,
};

export default () => {
  const echartsRef = useRef<ReactEcharts>(null);
  const mapRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const seriesData = pieResult.data.data.series[0].data;
  const currentName = seriesData[currentIndex]?.name;
  const timerRef = useRef<NodeJS.Timeout>();
  const [pointData, setPointData] = useState([]);

  // 用 currentIndex 来驱动图表变化
  useEffect(() => {
    const filteredData = mapResult.data.data.series[0].data.filter(item => item.name === currentName);
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

      setPointData(filteredData);
    }
  }, [currentIndex, currentName, instance]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex(idx => (idx < seriesData.length - 1 ? idx + 1 : 0));
    }, 2000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <BasePie ref={echartsRef} data={pieResult.data.data.series[0].data} style={{ width: 486, height: 254 }} />
      <Map ref={mapRef} style={{ width: 486, height: 554 }} geoCode="370000" pointData={pointData} />
    </div>
  );
};
