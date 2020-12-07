/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈英杰
 * @Date: 2020-12-07 11:22:29
 * @LastEditors: 陈英杰
 * @LastEditTime: 2020-12-07 15:36:21
 */

interface FlowProps {
  // 当前的状态
  status?: 'wait' | 'process' | 'finish' | 'error';
  // 步骤的数据
  steps?: Array<StepProps>;
  // 全局的size
  size?: number;
  // 当前的进度
  current?: number;
  // 组件的高度当direction为vertical时必填,也可以给外层容器指定高度用flex填充
  height?: number;
}

interface StepProps {
  // 标题
  title?: string;
  // 介绍
  description?: string;
  // 标签
  label?: string;
  // 节点大小
  size?: number;
  // 图标大小
  iconSize?: number;
  // 图标的状态
  status?: 'wait' | 'process' | 'finish' | 'error';
  // 自定义的icon size会被覆盖建议使用size指定大小
  icon?: ReactElement;
  // 自定义组件，其中style.width会被覆盖建议使用size
  stepRender?: ReactElement;
  // 线的长度
  tailWidth: number;
  // 当前的是否进行完全
  active?: boolean;
  // 是否为当前的进度
  isCurrent?: boolean;
  // 是否是最后一个
  last?: boolean;
  //活动时的颜色
  activeColor?: string;
}
