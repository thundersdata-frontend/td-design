import React, { FC } from 'react';
import CircleProgress from './CircleProgress';
import LineProgress from './LineProgress';
import { ProgressProps } from './type';

const Progress: FC<ProgressProps> = ({ type = 'circle', ...restProps }) => {
  if (type === 'line') {
    return <LineProgress {...restProps} />;
  }
  return <CircleProgress {...restProps} />;
};

export default Progress;
