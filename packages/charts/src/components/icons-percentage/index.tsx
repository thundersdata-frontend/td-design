/*
 * @文件描述: 由多个icon排列组成的百分比组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-20 14:17:11
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-21 15:01:24
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
  backIcon?: string; // 后面的图片url
  frontIcon?: string; // 前面的图片url
  size?: number; // 图片尺寸默认为16，其他尺寸自适应铺满
}

const IconsPercentage: React.FC<IconsPercentageProps> = props => {
  const currentRef = useRef<HTMLDivElement>(null);
  const { percentage, standard, backIcon, frontIcon, size = 16 } = props;

  const [currentWidth, setCurrentWidth] = useState(0);
  // 计算当前宽度下icons count
  const count = Math.floor(currentWidth / size);
  // 计算frontIcons的宽度
  const frontIconsWidth: number = percentage * 0.01 * count * size;

  useEffect(() => {
    const current = currentRef.current!.clientWidth;
    setCurrentWidth(current);
  }, []);

  const renderIcons = (indexIcon: string) =>
    Array.from({ length: count }, (_v, index) => {
      // 自定义图片
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
          width={size}
          height={size}
          key={index}
        />
      );
    });

  return (
    <div className="td-IconsPercentage" ref={currentRef}>
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
      <div style={{ overflow: 'hidden', width: `${frontIconsWidth}px` }} className="iconItem">
        {renderIcons('front')}
      </div>
    </div>
  );
};

export default IconsPercentage;
