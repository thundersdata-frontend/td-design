import React, { CSSProperties } from 'react';
import { Icon, Button } from 'antd';
import classnames from 'classnames';

export interface TipProps {
  selectedNum?: number;
  customContent?: JSX.Element;
  onClear?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Tip: React.FC<TipProps> = ({ selectedNum, customContent, onClear, className, style }) => (
  <div className={classnames("td-tip", className)} style={style}>
    <Icon type="info-circle" theme="filled" />
    {customContent || (
      <>
        <span className="td-tip-detail">
          已选择<span className="td-tip-num">{selectedNum}</span>项
        </span>
        <Button type="link" onClick={onClear}>
          清空
        </Button>
      </>
    )}
  </div>
);

export default Tip;
