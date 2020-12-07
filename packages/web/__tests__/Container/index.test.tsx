import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import Container from '../../src/container';

describe('测试Container组件', () => {
  it('1. 可以成功渲染', () => {
    const wrapper = shallow(
      <Container>
        <div>测试</div>
      </Container>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 容器组件必须要有子组件', () => {
    const wrapper = shallow(
      <Container>
        <div>测试</div>
      </Container>
    );
    expect(wrapper.children().text()).toEqual('测试');
  });

  it('3. 容器组件的内容可以是任何React组件或者DOM节点', () => {
    const wrapper = shallow(
      <Container>
        <div className="test">测试</div>
        <Button>添加</Button>
      </Container>
    );
    expect(wrapper.find('div.test').text()).toEqual('测试');
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('4. 容器组件可以接收header属性', () => {
    const wrapper = shallow(
      <Container header="测试header">
        <div>123</div>
      </Container>
    );
    expect(wrapper.find('div.td-container-header').text()).toEqual('测试header');
  });

  it('5. 容器组件可以接收footer属性', () => {
    const wrapper = shallow(
      <Container footer="测试footer">
        <div>123</div>
      </Container>
    );
    expect(wrapper.find('div.td-container-footer').text()).toEqual('测试footer');
  });

  it('6. 容器组件有header的时候，可以接收extra属性', () => {
    const wrapper = shallow(
      <Container header="测试header" extra={<div>添加</div>}>
        <div>123</div>
      </Container>
    );
    expect(wrapper.find('.td-container-header .td-container-header-right').text()).toEqual('添加');
  });
});
