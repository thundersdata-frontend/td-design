import React from 'react';
import { ScrollView } from 'react-native';
import Container from '../components/Container';
import ImagePicker, { File } from '@td-design/react-native-image-picker';
import { ImgCard } from '../components/ImgCard';
import { Toast } from '@td-design/react-native';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { Button } from '@td-design/react-native';

export default () => {
  const [form] = useForm();

  const uploadFile: (file: File) => Promise<string> = (file: File) => {
    console.log(file);
    return new Promise(resolve => {
      resolve('https://alifei04.cfp.cn/creative/vcg/veer/800water/veer-303764513.jpg');
    });
  };

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Form component={false} form={form} onFinish={handleFinish}>
          <Field name="commitmentImage" trigger="uploadFinish" validateTrigger="uploadFinish">
            <ImagePicker upload={uploadFile} onGrantFail={() => Toast.fail({ content: '对不起，授权失败' })}>
              <ImgCard title="身份证" />
            </ImagePicker>
          </Field>
        </Form>
        <Button title="提交" onPress={form.submit} />
      </ScrollView>
    </Container>
  );
};
