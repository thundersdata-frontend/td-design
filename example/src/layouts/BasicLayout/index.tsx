import React from 'react';
import { PageBasicPropsModel } from '@/interfaces/common';
import { ConfigProvider, Layout } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import Aside from './Aside';
import styles from './index.module.less';

const { Header, Content } = Layout;
const BasicLayout: React.FC<PageBasicPropsModel> = props => {
  return (
    <ConfigProvider locale={zh_CN}>
      <Layout className={styles.layout}>
        <Aside {...props} />
        <Layout>
          <Header className={styles.header}>
            <div>头像</div>
          </Header>
          <Content className={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
