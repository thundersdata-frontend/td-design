import React, { useState } from 'react';
import { ImagePicker } from '@td-design/react-native';
import Flex from '../../components/flex';
import Box from '../../components/box';
import { Image } from 'react-native';

// 上传地址
const UPLOAD_URL = 'http://object-service.dev.thundersdata.com/file/uploadToPub';

// 上传 token，这里用的是微信电商小程序的永久 token
const ACCESS_TOKEN = '223bc111017d323b00fee4cf9c59a2be';

export default function ImagePickerDemo() {
  const [imgSource1, setImgSource1] = useState<string>();
  const [imgSource2, setImgSource2] = useState<string>();
  const [imgSource3, setImgSource3] = useState<string>();

  return (
    <Box marginTop="m">
      <Flex>
        {imgSource1 && <Image style={{ width: 110, height: 110 }} source={{ uri: imgSource1 }} />}
        <ImagePicker
          action={UPLOAD_URL}
          data={{ access_token: ACCESS_TOKEN }}
          borderStyle="dashed"
          marginBottom="s"
          onSuccess={file => {
            setImgSource1(file.url);
          }}
          beforeUpload={() => {
            console.log('上传中');
            return true;
          }}
        />
      </Flex>
      <Flex>
        {imgSource2 && <Image style={{ width: 110, height: 110 }} source={{ uri: imgSource2 }} />}
        <ImagePicker
          action={UPLOAD_URL}
          data={{ access_token: ACCESS_TOKEN }}
          borderStyle="solid"
          icon="plus"
          marginBottom="s"
          onSuccess={file => {
            setImgSource2(file.url);
          }}
          beforeUpload={() => {
            console.log('上传中');
            return true;
          }}
        />
      </Flex>
      <Flex>
        {imgSource3 && <Image style={{ width: 110, height: 110 }} source={{ uri: imgSource3 }} />}
        <ImagePicker
          action={UPLOAD_URL}
          data={{ access_token: ACCESS_TOKEN }}
          borderStyle="solid"
          icon="linedCamera"
          marginBottom="s"
          onSuccess={file => {
            setImgSource3(file.url);
          }}
          beforeUpload={() => {
            console.log('上传中');
            return true;
          }}
        />
      </Flex>
      <ImagePicker
        action={UPLOAD_URL}
        data={{ access_token: ACCESS_TOKEN }}
        borderStyle="solid"
        icon="linedCamera"
        showUploadImg
        marginBottom="s"
      />
    </Box>
  );
}
