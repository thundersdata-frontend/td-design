import React from 'react';
import { FloatButton, Icon } from '@td-design/react-native';
import { View, Text } from 'react-native';

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ fontSize: 20, lineHeight: 30 }}>
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
          我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我
          是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容
        </Text>
      </View>
      <FloatButton
        buttonColor="rgba(231,76,60,1)"
        btnOutRange="gold"
        onPress={() => console.log(22)}
        position="right"
        verticalOrientation="down"
        spacing={10}
        // renderIcon={<Icon name="user" color="green" />}
      >
        <FloatButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log('notes tapped!')}
          spaceBetween={8}
          textContainerStyle={{ backgroundColor: 'gold' }}
        >
          <Icon type="ionicon" name="md-create" size={30} color="#fff" />
        </FloatButton.Item>
        <FloatButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}
          spaceBetween={8}
          textContainerStyle={{ backgroundColor: 'gold' }}
        >
          <Icon type="ionicon" name="md-notifications-off" size={30} color="#fff" />
        </FloatButton.Item>
        <FloatButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}
          spaceBetween={8}
          textContainerStyle={{ backgroundColor: 'gold' }}
        >
          <Icon type="ionicon" name="md-cube-sharp" size={30} color="#fff" />
        </FloatButton.Item>
      </FloatButton>
      <FloatButton
        buttonColor="green"
        btnOutRange="red"
        onPress={() => console.log(22)}
        position="center"
        spacing={10}
        // renderIcon={<Icon name="user" color="green" />}
      />
      <FloatButton
        buttonColor="gold"
        btnOutRange="red"
        onPress={() => console.log(22)}
        position="left"
        renderIcon={<Icon name="user" color="red" size={25} />}
      />
      <FloatButton
        buttonColor="rgba(231,76,60,1)"
        btnOutRange="gold"
        onPress={() => console.log(22)}
        position="right"
        verticalOrientation="up"
        spacing={10}
        // renderIcon={<Icon name="user" color="green" />}
      >
        <FloatButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log('notes tapped!')}
          spaceBetween={8}
          textContainerStyle={{ backgroundColor: 'gold' }}
        >
          <Icon type="ionicon" name="md-create" size={30} color="#fff" />
        </FloatButton.Item>
        <FloatButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}
          spaceBetween={8}
          size={30}
          textContainerStyle={{ backgroundColor: 'gold' }}
        >
          <Icon type="ionicon" name="md-notifications-off" size={30} color="#fff" />
        </FloatButton.Item>
        <FloatButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}
          spaceBetween={8}
          textContainerStyle={{ backgroundColor: 'gold' }}
        >
          <Icon type="ionicon" name="md-cube-sharp" size={30} color="#fff" />
        </FloatButton.Item>
      </FloatButton>
    </View>
  );
};
