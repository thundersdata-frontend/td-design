import React from 'react';
import { Table } from '@td-design/lego';

enum ColorEnum {
  红 = 1,
  绿 = 2,
  蓝 = 3,
}

const data = [
  {
    id: 1,
    brand: '维特根1',
    name: '沥青摊铺机',
    model: '200',
    money: '12988元',
    color: 1,
  },
  {
    id: 2,
    brand: '徐工',
    name: '履带式挖掘机',
    model: 'XE80CA',
    money: '862.2元',
    color: 2,
  },
  {
    id: 3,
    brand: '维特根2',
    name: '沥青摊铺机',
    model: '200',
    money: '200元',
    color: 3,
  },
  {
    id: 4,
    brand: '维特根3',
    name: '沥青摊铺机',
    model: '200',
    money: '200元',
    color: 1,
  },
  {
    id: 5,
    brand: '维特根5',
    name: '沥青摊铺机',
    model: '200',
    money: '12988元',
    color: 1,
  },
  {
    id: 6,
    brand: '徐工6',
    name: '履带式挖掘机',
    model: 'XE80CA',
    money: '862.2元',
    color: 2,
  },
  {
    id: 7,
    brand: '维特根7',
    name: '沥青摊铺机',
    model: '200',
    money: '200元',
    color: 3,
  },
  {
    id: 8,
    brand: '维特根8',
    name: '沥青摊铺机',
    model: '200',
    money: '200元',
    color: 1,
  },
];

const columns = [
  {
    id: 1,
    title: '品牌',
    dataIndex: 'brand',
  },
  {
    id: 2,
    title: '名称',
    dataIndex: 'name',
  },
  {
    id: 3,
    title: '型号',
    dataIndex: 'model',
  },
  {
    id: 4,
    title: '月租金',
    dataIndex: 'money',
  },
  {
    id: 5,
    title: '颜色',
    dataIndex: 'color',
    render: (data) => <span>{ColorEnum[data.color]}</span>,
  },
];

export default () => {
  return <Table data={data} columns={columns} height={210} countPerview={7} />;
};
