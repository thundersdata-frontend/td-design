import React, { useState } from 'react';
import { Switch, WhiteSpace, helpers, Text } from '@td-design/react-native';
import Iconfont from '../Iconfont';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

const { px } = helpers;
export default () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checked3, setChecked3] = useState<boolean>(false);
  const [checked4, setChecked4] = useState<boolean>(true);
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <WhiteSpace />
        <Text>基本使用:</Text>
        <WhiteSpace />
        <Switch
          checked={checked}
          onChange={checked => {
            setChecked(checked);
          }}
        />
        <WhiteSpace />
        <Text>禁用:</Text>
        <WhiteSpace />
        <Switch
          checked={checked1}
          disabled
          onChange={checked => {
            setChecked1(checked);
          }}
        />
        <WhiteSpace />
        <Text>自定义背景:</Text>
        <WhiteSpace />
        <Switch
          checked={checked2}
          color="#875467"
          onChange={checked => {
            setChecked2(checked);
          }}
        />
        <WhiteSpace />
        <Text>自定义 label:</Text>
        <WhiteSpace />
        <Switch
          checked={checked3}
          checkLabel="开"
          uncheckLabel="关"
          onChange={checked => {
            setChecked3(checked);
          }}
        />
        <WhiteSpace />
        <Text>自定义 icon:</Text>
        <WhiteSpace />
        <Switch
          checked={checked4}
          checkLabel={<Iconfont name="icon_selected" size={px(24)}></Iconfont>}
          uncheckLabel={<Iconfont name="icon_close" size={px(24)}></Iconfont>}
          onChange={checked => {
            setChecked4(checked);
          }}
        />
      </ScrollView>
    </Container>
  );
};
