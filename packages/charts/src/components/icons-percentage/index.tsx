/*
 * @文件描述: 由多个icon排列组成的百分比组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-20 14:17:11
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-22 10:36:58
 */
import React, { useRef, useEffect, useState } from 'react';

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
  const {
    percentage,
    standard,
    frontIcon = require('../../assets/materiel.png'),
    backIcon = require('../../assets/materielGray.png'),
    size = 16,
  } = props;

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
    Array.from({ length: count }, (_v, index) => (
      <img
        src={indexIcon === 'front' ? frontIcon : backIcon}
        alt=""
        width={size}
        height={size}
        key={index}
      />
    ));

  return (
    <div className="td-IconsPercentage" ref={currentRef} style={{ height: size }}>
      <div className="iconItem">
        {renderIcons('back')}
        {standard && (
          <div
            className="solid"
            style={{
              height: size * 1.5,
              top: -size * 0.25,
              left: `${Number(standard)}%`,
            }}
          />
        )}
      </div>
      <div style={{ overflow: 'hidden', width: `${frontIconsWidth}px` }} className="iconItem">
        {renderIcons('front')}
      </div>
    </div>
  );
};

export default IconsPercentage;
