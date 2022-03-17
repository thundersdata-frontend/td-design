import React, { useState, useCallback } from 'react';
import Video from '@td-design/lego-video';
import { Button } from 'antd';

export default () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div>
      <Video
        id="demo6"
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        videoUrls={[
          'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615153504280070.m4v',
          'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615240630670967.mov',
        ]}
      />
      <div style={{ marginTop: 8 }}>
        <Button type="primary" style={{ marginRight: 8 }} onClick={() => setCurrentIndex(0)}>
          第一集
        </Button>
        <Button type="primary" onClick={() => setCurrentIndex(1)}>
          第二集
        </Button>
      </div>
    </div>
  );
};
