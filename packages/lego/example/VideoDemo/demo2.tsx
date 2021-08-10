import React from 'react';
import { Video } from '@td-design/lego';

export default () => {
  return (
    <Video
      coverImg="https://fast-fregiht.oss-cn-hangzhou.aliyuncs.com/screen/shanxiluqiao_photo1.jpg"
      videoUrl={require('../assets/shanxiluqiaovideo.mp4').default}
    />
  );
};
