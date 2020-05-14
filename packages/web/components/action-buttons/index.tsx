/*
 * @文件描述: Table里的操作按钮集合。可以设置最大展开数量，超过最大展开数量的按钮将自动聚合成更多操作的下拉操作里。
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-08-24 21:06:25
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-14 13:53:35
 */
import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/lib/button';

export interface ActionButtonProps extends ButtonProps {
  text: string;
  onClick: (params?: unknown) => void;
}
export interface ActionProps {
  actions?: ActionButtonProps[];
  maxExpandNum?: number;
}
// eslint-disable-next-line complexity
const ActionButtons: React.FC<ActionProps> = ({ actions, maxExpandNum }) => {
  if (actions && actions.length > 0) {
    if (maxExpandNum && actions.length < maxExpandNum) {
      return (
        <div className="td-action-buttons-wrap">
          {actions.map((action, index) => (
            <Button
              key={index}
              disabled={action.disabled}
              type={action.type}
              onClick={action.onClick}
            >
              {action.text}
            </Button>
          ))}
        </div>
      );
    } else {
      const buttons = actions.slice(0, maxExpandNum);
      const dropdowns = actions.slice(maxExpandNum);
      return (
        <div className="td-action-buttons-wrap">
          {buttons.map((button, index) => (
            <Button
              key={index}
              disabled={button.disabled}
              type={button.type}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
          {dropdowns.length > 0 && (
            <Dropdown
              overlay={
                <Menu>
                  {dropdowns.map((item, index) => (
                    <Menu.Item key={index} onClick={item.onClick}>
                      {item.text}
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <Button>
                更多操作
                <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
      );
    }
  }
  return null;
};
ActionButtons.defaultProps = {
  maxExpandNum: 3,
};

export default ActionButtons;
