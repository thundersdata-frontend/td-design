import React from 'react';
import { Table, WingBlank, WhiteSpace, Button } from '@td-design/react-native';
import { View, Alert, ScrollView } from 'react-native';

const { Row, Cell } = Table;

export default () => {
  const HeaderData = ['标题1标题', '标题2', '标题3', '标题4', '标题5', '标题6', '标题7', '标题8', '标题9'];
  const Data = ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6', '内容7', '内容8', '内容9'];
  const Data1 = ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6', '内容7', '内容8', '内容9'];
  const Data2 = ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6', '内容7', '内容8'];
  return (
    <View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1, height: 200 }}
        showsHorizontalScrollIndicator={false}
      >
        <Table flexArr={[1]} textStyle={{ color: 'orange' }} tableStyle={{ width: 1000 }}>
          <Row data={HeaderData} textStyle={{ color: 'red' }}></Row>
          <ScrollView>
            <Table>
              <Row data={Data}></Row>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((_, i) => {
                return <Row data={Data} key={i}></Row>;
              })}
              <Row data={Data2}>
                <Cell
                  data={
                    <Button
                      style={{ flex: 1 }}
                      title="111"
                      onPress={() => {
                        Alert.alert('Alert Title', 'My Alert Msg', [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                      }}
                    />
                  }
                />
              </Row>
            </Table>
          </ScrollView>
        </Table>
      </ScrollView>
      <WhiteSpace />
      <WingBlank>
        <Table flexArr={[3]} borderWidth={0}>
          <Row data={HeaderData}></Row>
          <Row data={Data}></Row>
          <Row data={Data1}></Row>
          <Row data={Data2}></Row>
        </Table>
      </WingBlank>
      <WingBlank>
        <Table borderWidth={1}>
          <Row data={HeaderData}></Row>
          <Row data={Data}></Row>
          <Row data={Data1}></Row>
          <Row data={Data2}>
            <Cell
              data={
                <Button
                  title="111"
                  onPress={() => {
                    Alert.alert('Alert Title', 'My Alert Msg', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                  }}
                />
              }
            />
          </Row>
        </Table>
      </WingBlank>
      <WhiteSpace />
      <WingBlank>
        <Table flexArr={[1]} borderWidth={0}>
          <Row data={HeaderData} cellStyle={{ borderBottomWidth: 1, borderColor: '#333' }}></Row>
          <Row data={Data} cellStyle={{ borderBottomWidth: 1, borderColor: '#333' }}></Row>
          <Row data={Data1} cellStyle={{ borderBottomWidth: 1, borderColor: '#333' }}></Row>
          <Row data={Data2} cellStyle={{ borderBottomWidth: 1, borderColor: '#333' }}>
            <Cell
              data={
                <Button
                  title="111"
                  onPress={() => {
                    Alert.alert('Alert Title', 'My Alert Msg', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                  }}
                />
              }
            />
          </Row>
        </Table>
      </WingBlank>
    </View>
  );
};
