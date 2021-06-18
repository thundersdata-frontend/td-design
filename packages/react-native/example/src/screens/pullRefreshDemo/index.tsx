import React from 'react';
import { Text, View, ScrollView, FlatList, TextStyle, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import LottieView from 'lottie-react-native';

import { PullRefresh } from '@td-design/react-native';
import Header from './Header';

interface DataItem {
  key: string;
  text: string;
  on: boolean;
}

const data: DataItem[] = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: `data-${i}`,
    text: `number: ${i}`,
    on: false,
  });
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
  listCon: {
    flex: 1,
    backgroundColor: 'blue',
  },
  item: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: 'pink',
  },
  itemOdd: {
    backgroundColor: 'green',
  },
  itemText: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 28,
  } as TextStyle,
});

interface State {
  refreshing: boolean;
  data: DataItem[];
}

function ItemView({ children }: { children: React.ReactElement; index: number }) {
  return children;
}

export default class App extends React.Component<{}, State> {
  state = {
    data: data.slice(0, 50),
    refreshing: false,
  };

  _renderItem = (item: DataItem, index: number, prefix = '') => {
    const conStyles = [pageStyle.item];
    if (index % 2 === 1) {
      conStyles.push(pageStyle.itemOdd as any);
    }
    return (
      <ItemView key={index} index={index}>
        <View style={conStyles}>
          <Text
            onPress={() => {
              Alert.alert('click', item.text);
            }}
            style={pageStyle.itemText}
          >
            in page {prefix} {item.text}
          </Text>
        </View>
      </ItemView>
    );
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState(prevState => {
        return {
          refreshing: false,
          data: prevState.data.concat(data.slice(prevState.data.length, prevState.data.length + 50)),
        };
      });
    }, 3000);
  };

  // 测试 FlatList 嵌套
  flatListTest() {
    return (
      <PullRefresh
        HeaderComponent={Header}
        headerHeight={100}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        style={{ flex: 1, backgroundColor: 'red' }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          scrollEventThrottle={20}
          pinchGestureEnabled={false}
          renderItem={({ item, index }: { item: DataItem; index: number }) => {
            return this._renderItem(item, index, 'FlatList');
          }}
        />
      </PullRefresh>
    );
  }

  scrollViewTest() {
    return (
      <PullRefresh
        HeaderComponent={Header}
        headerHeight={100}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      >
        <ScrollView>
          {this.state.data.map((obj, index) => {
            return this._renderItem(obj, index, 'scroll3');
          })}
        </ScrollView>
      </PullRefresh>
    );
  }

  render() {
    return (
      <SafeAreaView style={pageStyle.container}>
        {this.flatListTest()}
        {/* {this.scrollViewTest()} */}
      </SafeAreaView>
    );
  }
}
