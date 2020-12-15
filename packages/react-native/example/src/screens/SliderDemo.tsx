import React, { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Slider, helpers } from '@td-design/react-native';
import Container from '../components/Container';

const { px } = helpers;
export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }} style={{ backgroundColor: '#a9cbee' }}>
        {/* <Content>
          <Text>默认</Text>
          <Slider />
        </Content> */}
        {/* <Content>
          <Text>默认值45</Text>
          <Slider value={45} />
        </Content> */}
        {/* <Content>
          <Text>最小值20，最大值80</Text>
          <Slider min={20} max={80} />
        </Content> */}
        {/* <Content>
          <Text>当前值45，最小值20，最大值80</Text>
          <Slider value={45} min={20} max={80} />
        </Content> */}
        {/* <Content>
          <Text>自定义颜色</Text>
          <Slider value={45} foregroundColor="gold" backgroundColor="red" borderColor="blue" handleBackground="pink" />
        </Content> */}
        {/* <Content>
          <Text>自定义滑块右侧颜色</Text>
          <Slider value={45} backgroundColor="gold" />
        </Content> */}
        {/* <Content>
          <Text>自定义滑块边框颜色</Text>
          <Slider value={45} borderColor="gold" />
        </Content> */}
        {/* <Content>
          <Text>自定义滑块背景色</Text>
          <Slider value={45} handleBackground="gold" />
        </Content> */}
        {/* <Content>
          <Text style={{ paddingBottom: 10 }}>不显示滑块数字</Text>
          <Slider value={45} showLabel={false} />
        </Content> */}
        {/* <Content>
          <Text>滑块数字在下方</Text>
          <Slider value={45} labelPosition="bottom" />
        </Content> */}
        {/* <Content>
          <Text>滑块数字在左边</Text>
          <Slider value={45} labelPosition="left" />
        </Content> */}
        <Content>
          <Text style={{ paddingBottom: 10 }}>数字在右边</Text>
          <Slider value={45} labelPosition="right" />
        </Content>
      </ScrollView>
    </Container>
  );
};

const Content: FC = ({ children }) => (
  <View
    style={{
      marginVertical: px(10),
      paddingBottom: px(10),
      // borderBottomWidth: 1,
      borderColor: '#000',
    }}
  >
    {children}
  </View>
);
