import React from 'react';
import { Video } from '@td-design/lego';

export default () => {
  return (
    <Video
      id="demo8"
      videoUrls={[
        'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615153504280070.m4v',
        'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615240630670967.mov',
      ]}
      definitionList={[
        [
          {
            name: '标清',
            url: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615153504280070.m4v',
          },
          {
            name: '高清',
            url: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615240630670967.mov',
          },
        ],
        [
          {
            name: '标清',
            url: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615240630670967.mov',
          },
          {
            name: '高清',
            url: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1631615153504280070.m4v',
          },
        ],
      ]}
      width={500}
    />
  );
};
