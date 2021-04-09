import React, { useState } from 'react';
import { View } from 'react-native';
import { ImagePicker, Flex } from '@td-design/react-native';
import { Image } from 'react-native';
import Container from '../components/Container';

export default function ImagePickerDemo() {
  const [imgSource1, setImgSource1] = useState<string>();
  const [imgSource2, setImgSource2] = useState<string>();

  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
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
            width={80}
            height={80}
            borderType="dashed"
            beforeUpload={() => {
              console.log('上传前校验');
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
      </View>
    </Container>
  );
}
