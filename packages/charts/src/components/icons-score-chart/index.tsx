import React, { CSSProperties } from 'react';
import IconsPercentage from '../icons-percentage';

interface scoreData {
  name: string;
  value: string;
  unit?: string;
}

interface IconsScoreChartProps {
  scoreDatas: scoreData[]; // 由该数组映射到每条数据的评分
  standardsDatas?: number[]; // 由该数组映射到每条数据的标准虚线
  backIcon?: string; // 后面的图片url
  frontIcon?: string; // 前面的图片url
  size?: number; // 图片尺寸默认为16，其他尺寸自适应铺满
  percentageItemStyle?: CSSProperties; // 定义percentageItem样式(如字体大小)
}

const IconsScoreChart: React.FC<IconsScoreChartProps> = ({
  scoreDatas,
  standardsDatas,
  backIcon,
  frontIcon,
  size,
  percentageItemStyle = {},
}) => {
  const renderPercentageItem = () =>
    scoreDatas.map(({ name, value, unit }, index) => (
      <div key={name}>
        <div className="percentageItem" style={percentageItemStyle}>
          <div className="label">{name}</div>
          <div className="quota">
            {value}
            {unit}
          </div>
        </div>
        <IconsPercentage
          percentage={Number(value)}
          standard={standardsDatas ? standardsDatas[index] : undefined}
          size={size}
          backIcon={backIcon}
          frontIcon={frontIcon}
        />
      </div>
    ));

  return <div className="td-iconsScoreChart">{renderPercentageItem()}</div>;
};
export default IconsScoreChart;
