import React, { useState } from 'react';
import { ImagePicker, Text } from '@td-design/react-native';
import Flex from '../../components/flex';
import Box from '../../components/box';
import Icon from '../../components/icon';
import { Image } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';

// 上传地址
const UPLOAD_URL = 'http://object-service.dev.thundersdata.com/file/uploadToPub';

// 上传 token，这里用的是微信电商小程序的永久 token
const ACCESS_TOKEN = '223bc111017d323b00fee4cf9c59a2be';

export default function ImagePickerDemo() {
  const [imgSource1, setImgSource1] = useState<string>();
  const [imgSource2, setImgSource2] = useState<string>();
  const [imgSource3, setImgSource3] = useState<string>();
  const theme = useTheme<Theme>();
  const thirdBodyColor = theme.colors.secondaryTextColor;

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
            console.log('file1: ', file);
            setImgSource1(file.url);
          }}
          beforeUpload={() => {
            console.log('上传中');
            return true;
          }}
          onFailed={file => {
            console.log('file: ', file);
          }}
          title="上传"
          icon={<Icon shadow rounded name="camerao" color={theme.colors.primaryColor} size={34} />}
        />
      </Flex>
      <Flex>
        {imgSource2 && <Image style={{ width: 110, height: 110 }} source={{ uri: imgSource2 }} />}
        <ImagePicker
          action={UPLOAD_URL}
          data={{ access_token: ACCESS_TOKEN }}
          borderStyle="solid"
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
          icon={<Icon name="camerao" color={thirdBodyColor} size={42} />}
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
        icon={null}
        title={
          <Flex marginTop="l" justifyContent="center">
            <Text>点击上传</Text>
          </Flex>
        }
        showUploadImg
        marginBottom="s"
      />
    </Box>
  );
}
