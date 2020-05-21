import React from 'react';
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
  size?: number; // 图片尺寸(只有传自定义backIcon时才需要设置size，什么都不传时无需传size)
}

const IconsScoreChart: React.FC<IconsScoreChartProps> = ({
  scoreDatas,
  standardsDatas,
  backIcon,
  frontIcon,
  size,
}) => {
  const renderPercentageItem = () =>
    scoreDatas.map(({ name, value, unit }, index) => (
      <div key={name}>
        <div className="percentageItem">
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
