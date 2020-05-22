import React, { CSSProperties, ReactNode } from 'react';
import IconsPercentage from '../icons-percentage';

interface ScoreData {
  name: string;
  value: string;
  unit?: string;
}

interface IconsScoreChartProps {
  scores: ScoreData[]; // 由该数组映射到每条数据的评分
  standards?: number[]; // 由该数组映射到每条数据的标准虚线
  backIcon?: string; // 后面的图片url
  frontIcon?: string; // 前面的图片url
  size?: number; // 图片尺寸默认为16，其他尺寸自适应铺满
  percentageItemStyle?: CSSProperties; // 定义percentageItem样式(如字体大小)
  label?: ReactNode;
  quota?: ReactNode;
}

const IconsScoreChart: React.FC<IconsScoreChartProps> = ({
  scores,
  standards,
  backIcon,
  frontIcon,
  size,
  percentageItemStyle = {},
  label,
  quota,
}) => {
  const renderPercentageItem = () =>
    scores.map(({ name, value, unit }, index) => (
      <div key={name}>
        <div className="percentageItem" style={percentageItemStyle}>
          {label || <div className="label">{name}</div>}
          {quota || (
            <div className="quota">
              {value}
              {unit}
            </div>
          )}
        </div>
        <IconsPercentage
          percentage={Number(value)}
          standard={standards ? standards[index] : undefined}
          size={size}
          backIcon={backIcon}
          frontIcon={frontIcon}
        />
      </div>
    ));

  return <div className="td-iconsScoreChart">{renderPercentageItem()}</div>;
};
export default IconsScoreChart;
