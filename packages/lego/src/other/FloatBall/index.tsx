import React, { FC, CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
// 颜色名称
const colorNamesArr = ['blue', 'orange', 'green', 'purple'];
// 最大的气泡个数
const MAX_COUNT = 4;

interface LabeledValue {
  value: string | number;
  label: string;
}

interface FloatBallProps {
  dataSource: LabeledValue[];
  maxCount?: number;
  className?: string;
  style?: CSSProperties;
}

const FloatBall: FC<FloatBallProps> = ({ dataSource = [], maxCount, className, style }) => {
  const moreThanMax = (maxCount ?? dataSource.length) >= MAX_COUNT;
  // 如果数据个数超过4个，只显示4个
  const modifiedCount = moreThanMax ? MAX_COUNT : dataSource.length;
  // 限制最大显示个数
  const limitedCount = maxCount ? Math.min(modifiedCount, maxCount) : modifiedCount;

  const renderBall = (item: LabeledValue, idx: number) => {
    const { label, value } = item;
    return (
      <div key={`${label}${idx}`} className={classNames(styles.ball, styles[`${colorNamesArr[idx]}Ball`])}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
    );
  };

  return (
    <div className={classNames(styles.container, moreThanMax ? styles.more : styles.normal, className)} style={style}>
      {dataSource.slice(0, limitedCount).map(renderBall)}
    </div>
  );
};

export default FloatBall;
