import React from 'react';
import { Button, Input, Card, Tabs, Table, Radio } from 'antd';
import { Card as TDCard } from '@td-design/web';
import styles from './index.module.less';

export interface HomepageState {
  activeKey?: string;
}
export interface HomepageProps {
  test?: string;
}

const theme = themeSetting.theme;
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default class Homepage extends React.Component<HomepageProps, HomepageState> {
  public constructor(props: HomepageProps) {
    super(props);
    this.state = {
      activeKey: 'default',
    };
  }

  public render() {
    const { activeKey } = this.state;
    return (
      <>
        <TDCard title="我们的card组件">
          <div className={styles['bg-color']}>项目中的背景色块: @card-head-background</div>
          <div className={styles['less-fade']}>项目中使用less fade方法</div>
          <div className={styles['my-color']}>项目中的颜色 @my-color</div>
        </TDCard>
        <Card title="预览" style={{ marginTop: 15 }}>
          <Button type="primary">antd的</Button>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </Tabs.TabPane>
          </Tabs>
          <Table style={{ marginTop: 15 }} dataSource={dataSource} columns={columns} />
          <Radio.Group defaultValue={1}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Card>
        <Card title="配置" style={{ marginTop: 20 }}>
          <div>
            {Object.keys(theme).map(key => (
              <a
                style={{
                  marginRight: 20,
                  // color: '#1973ff',
                  backgroundColor: key === activeKey ? '#f3f3f3' : '#fff',
                  padding: 10,
                }}
                key={key}
                onClick={() => this.setState({ activeKey: key }, () => themeSetting.change(key))}
              >
                {theme[key].title}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            自定义主题色
            <Input
              onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) =>
                themeSetting.change(activeKey, { '@primary-color': event.currentTarget.value })
              }
            />
          </div>
          <div style={{ marginTop: 20 }}>
            自定义我自己的颜色
            <Input
              onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) =>
                themeSetting.change(activeKey, { '@my-color': event.currentTarget.value })
              }
            />
          </div>
        </Card>
      </>
    );
  }
}
