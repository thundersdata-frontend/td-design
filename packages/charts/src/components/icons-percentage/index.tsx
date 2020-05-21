/*
 * @文件描述: 由多个icon排列组成的百分比组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-20 14:17:11
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-21 10:09:23
 */
import React, { useRef, useEffect, useState } from 'react';

const FRONT_IMG_URL =
  'https://td-prod-public.oss-cn-hangzhou.aliyuncs.com/gazelle/1589971869096259784.png';
const BACK_IMG_URL =
  'https://td-prod-public.oss-cn-hangzhou.aliyuncs.com/gazelle/1589971882105115058.png';

interface IconsPercentageProps {
  percentage: number;
  // 标准截断虚线的%
  standard?: number;
  number?: number; // icon 的总数量 默认16
  backIcon?: string; // 后面的图片url
  frontIcon?: string; // 前面的图片url
  size?: number; // 图片尺寸(只有传自定义backIcon时才需要设置size，什么都不传时无需传size)
}

const IconsPercentage: React.FC<IconsPercentageProps> = props => {
  // TODO:IconsPercentage基础宽度为270 - 24(270为blockCom宽度,24为padiing*2)
  const BASE_WIDTH = 270 - 24;
  const [currentWidth, setCurrentWidth] = useState(BASE_WIDTH);
  const {
    percentage,
    number = 16,
    standard,
    backIcon,
    frontIcon,
    size = currentWidth / number - 0.6,
  } = props;

  const myRef = useRef<HTMLDivElement>(null);
  const width: number = percentage * 0.01 * number * size;

  useEffect(() => {
    const current = myRef.current ? myRef.current.clientWidth : BASE_WIDTH;
    // 响应式存在10px误差
    setCurrentWidth(current + 10);
  }, []);

  const renderIcons = (indexIcon: string) =>
    Array.from({ length: number }, (_v, index) => {
      // 当需要自定义大小的图片
      if (backIcon && frontIcon) {
        return (
          <img
            src={indexIcon === 'front' ? frontIcon : backIcon}
            alt=""
            width={size}
            height={size}
            key={index}
          />
        );
      }

      // 响应式铺满
      return (
        <img
          src={indexIcon === 'front' ? FRONT_IMG_URL : BACK_IMG_URL}
          alt=""
          width={currentWidth / number - 0.6}
          height={currentWidth / number - 0.6}
          key={index}
        />
      );
    });

  return (
    <div className="td-IconsPercentage" ref={myRef}>
      <div className="iconItem">
        {renderIcons('back')}
        <div
          className="solid"
          style={{
            left: `${Number(standard)}%`,
            display: standard ? 'block' : 'none',
          }}
        />
      </div>
      <div style={{ overflow: 'hidden', width: `${width}px` }} className="iconItem">
        {renderIcons('front')}
      </div>
    </div>
  );
};

export default IconsPercentage;
