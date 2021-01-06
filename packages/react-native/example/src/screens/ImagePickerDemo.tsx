import React, { useState } from 'react';
import { ImagePicker, Text, Flex, Box, Icon } from '@td-design/react-native';
import { Image } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/theme';
import Container from '../components/Container';

// 上传地址
const UPLOAD_URL = 'http://object-service.dev.thundersdata.com/file/uploadToPub';

// 上传 token，这里用的是微信电商小程序的永久 token
const ACCESS_TOKEN = '223bc111017d323b00fee4cf9c59a2be';

export default function ImagePickerDemo() {
  const [imgSource1, setImgSource1] = useState<string>();
  const [imgSource2, setImgSource2] = useState<string>();
  const theme = useTheme<Theme>();

  return (
    <Container>
      <Box marginTop="m">
        {/* <Flex>
          {imgSource1 && <Image style={{ width: 100, height: 100 }} source={{ uri: imgSource1 }} />}
          <ImagePicker
            action={UPLOAD_URL}
            data={{ access_token: ACCESS_TOKEN }}
            borderStyle="dashed"
            onSuccess={file => {
              setImgSource1(file.url);
            }}
            title="上传"
            icon={<Icon rounded name="camerao" color={theme.colors.primaryColor} size={34} />}
          />
        </Flex> */}
        <Flex>
          {imgSource2 && <Image style={{ width: 100, height: 100 }} source={{ uri: imgSource2 }} />}
          <ImagePicker
            action={UPLOAD_URL}
            data={{ access_token: ACCESS_TOKEN }}
            borderStyle="solid"
            onSuccess={file => {
              setImgSource2(file.url);
            }}
            beforeUpload={() => {
              console.log('上传中');
              return true;
            }}
          />
        </Flex>
        {/* <ImagePicker
          action={UPLOAD_URL}
          data={{ access_token: ACCESS_TOKEN }}
          borderStyle="solid"
          icon={null}
          title={<Text>点击上传</Text>}
          showUploadImg
        /> */}
      </Box>
    </Container>
  );
}
