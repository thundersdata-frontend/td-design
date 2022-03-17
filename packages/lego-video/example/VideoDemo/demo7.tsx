import React, { useState, useEffect } from 'react';
import Video from '@td-design/lego-video';
import { Button, Modal } from 'antd';

export default () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        显示弹窗
      </Button>
      <Modal visible={visible} onCancel={() => setVisible(false)} width={600}>
        <Video
          id="demo7"
          visible={visible}
          autoplay
          videoUrls={[
            'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615153504280070.m4v',
            'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615240630670967.mov',
          ]}
          width={500}
        />
      </Modal>
    </div>
  );
};
