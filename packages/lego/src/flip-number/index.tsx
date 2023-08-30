import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import './index.less';

export interface FlipNumberProps {
  value: string | number;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

const FlipNumber: FC<FlipNumberProps> = ({ value, containerStyle, itemStyle }) => {};

export default FlipNumber;
