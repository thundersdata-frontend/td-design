import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'antd';
import Card from '../../src/card';

describe('测试Card组件', () => {
  it('1. 可以成功渲染', () => {
    const wrapper = shallow(
      <Card title="测试title">
        <div>测试</div>
      </Card>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('2. card组件的内容可以是任何React组件或者DOM节点', () => {
    const wrapper = shallow(
      <Card title="测试title">
        <div className="test">测试</div>
        <Button>添加</Button>
      </Card>
    );
    expect(wrapper.find('div.test').text()).toEqual('测试');
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('3. card组件可以接收title属性', () => {
    const wrapper = shallow(
      <Card title="测试title">
        <div>123</div>
      </Card>
    );
    expect(wrapper.find('div.td-card-header-title').text()).toEqual('测试title');
  });

  it('4. card组件可以接收extra属性', () => {
    const wrapper = mount(
      <Card title="测试title" extra="测试extra">
        <div>123</div>
      </Card>
    );
    expect(wrapper.props().extra).toEqual('测试extra');
  });

  it('5. card组件可以接收subtitle属性', () => {
    const wrapper = mount(
      <Card title="test" subtitle="test">
        <div>123</div>
      </Card>
    );
    expect(wrapper.props().subtitle).toEqual('test');
    expect(wrapper.find('div.td-card-header-subtitle').text()).toEqual('test');
  });
});
