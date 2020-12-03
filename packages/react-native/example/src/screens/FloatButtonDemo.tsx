import React from 'react';
import { FloatButton, Icon } from '@td-design/react-native';
import { View } from 'react-native';

export default () => {
  return (
    <View style={{ flex: 1 }}>
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
        buttonColor="rgba(231,76,60,1)"
        btnOutRange="gold"
        onPress={() => console.log(789)}
        position="left"
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
        onPress={() => console.log(123)}
        position="center"
        spacing={10}
        // renderIcon={<Icon name="user" color="green" />}
      />
      <FloatButton
        buttonColor="gold"
        btnOutRange="red"
        onPress={() => console.log(456)}
        position="right"
        renderIcon={<Icon name="user" color="red" size={25} />}
      />
    </View>
  );
};
