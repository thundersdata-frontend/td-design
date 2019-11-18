import React, { useState, useEffect, useRef } from 'react';
import Link from 'umi/link';
import { Layout, Menu, Icon } from 'antd';
import { PageBasicPropsModel } from '@/interfaces/common';
import stores from '@/stores';
import { BaseStore } from '@/interfaces/base.store';
import { isEmpty } from 'lodash';
import { MenuItemConfig, CustomWindow } from '@/interfaces/common';
import styles from './index.module.less';

const { Sider } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function Aside(props: PageBasicPropsModel) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = useState();
  const [openedKeys, setOpenedKeys] = useState();
  const openedKeysRef = useRef([]);

  // 读取store里面的menu
  const baseStore = stores.useStore('baseStore') as BaseStore;
  const { menus } = baseStore;
  const menuList = menus.concat(((window as unknown) as CustomWindow).gMenus);

  /**
   * 根据location的地址，自动选中和打开对应的菜单
   * 为了实现进入二级页面之后菜单依然显示选中状态，我们约定：
   *  一级菜单路由只能配置成: /xxx/xxx
   *  二级菜单路由列表配置成：/xxx/xxx/list
   *  二级菜单编辑、详情配置成：/xxx/xxx/edit、/xxx/xxx/detail
   */
  useEffect(() => {
    const { pathname } = props.location;
    const paths = pathname.split('/');
    setOpenedKeys(['/' + paths[1]]);
    if (paths.length >= 4 && paths.pop() !== 'list') {
      setSelectedKeys([paths.concat(['list']).join('/')]);
    } else {
      setSelectedKeys([pathname]);
    }
  }, [props.location]);

  const handleCollapse = () => {
    if (collapsed) {
      setOpenedKeys(openedKeysRef.current);
      setCollapsed(false);
    } else {
      openedKeysRef.current = openedKeys;
      setOpenedKeys([]);
      setCollapsed(true);
    }
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse} width={256}>
      <div className={styles.logo}>logo</div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        onSelect={({ key }) => {
          setSelectedKeys([key]);
        }}
        onOpenChange={openKeys => {
          setOpenedKeys([openKeys.pop()]);
        }}
      >
        {menuList.map(item => {
          if (item.children && !isEmpty(item.children)) {
            return (
              <SubMenu
                key={item.link}
                title={
                  <span>
                    <Icon type="pie-chart" />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {item.children.map(ele => (
                  <MenuItem key={ele.link}>
                    <LinkItem {...ele} />
                  </MenuItem>
                ))}
              </SubMenu>
            );
          }
          return (
            <MenuItem key={item.link}>
              <LinkItem {...item} />
            </MenuItem>
          );
        })}
      </Menu>
    </Sider>
  );
}
const LinkItem = (menuItem: MenuItemConfig) => (
  <>
    <Icon type="pie-chart" />
    <Link style={{ color: 'inherit' }} to={menuItem.link!}>
      <span className={styles.title}>{menuItem.name}</span>
    </Link>
  </>
);
