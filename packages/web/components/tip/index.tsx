import React from 'react';
import { Icon, Button } from 'antd';

export interface TipProps {
  selectedNum?: number;
  customContent?: JSX.Element;
  onClear?: () => void;
}

const Tip: React.FC<TipProps> = ({ selectedNum, customContent, onClear }) => (
  <div className="td-tip">
    <Icon type="info-circle" theme="filled" />
    {customContent || (
      <>
        <span className="td-tip-detail">
          已选择<span className="td-Tip-num">{selectedNum}</span>项
        </span>
        <Button type="link" onClick={onClear}>
          清空
        </Button>
      </>
    )}
  </div>
);

export default Tip;
