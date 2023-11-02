import React, {useState} from 'react';
import { Modal } from '@td-design/lego';
import { Button } from 'antd';

export default () => {

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>显示弹窗</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};
