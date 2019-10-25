import React from 'react';
import { Modal } from 'antd';

export interface ResultProps {
  visible?: boolean;
  success?: boolean;
  text?: string;
  subtext?: string;
  onClose: () => void;
  afterClose?: () => void;
}
const Result: React.FC<ResultProps> = props => (
  <Modal
    visible={props.visible}
    destroyOnClose
    footer={null}
    centered
    title="提示信息"
    onCancel={props.onClose}
    afterClose={props.afterClose}
    width={520}
  >
    <div className="td-result-content">
      {props.success ? (
        <img src={require('./imgs/success.png')} style={{ width: 80, height: 80 }} />
      ) : (
        <img src={require('./imgs/fail.png')} style={{ width: 80, height: 80 }} />
      )}
      <div className="td-result-content-text">
        <span>{props.text}</span>
      </div>
      {props.subtext && <div className="td-result-content-subtext">{props.subtext}</div>}
    </div>
  </Modal>
);
Result.defaultProps = {
  visible: false,
  success: true,
  text: '操作成功',
};
export default Result;
