import React from 'react';
import { Table } from '@td-design/lego';

export default () => {
  const data = [
    {
      id: 1,
      brand: '维特根1',
      name: '沥青摊铺机',
      model: '200',
      money: '12988元',
    },
    {
      id: 2,
      brand: '徐工',
      name: '履带式挖掘机',
      model: 'XE80CA',
      money: '862.2元',
    },
    {
      id: 3,
      brand: '维特根2',
      name: '沥青摊铺机',
      model: '200',
      money: '200元',
    },
    {
      id: 4,
      brand: '维特根3',
      name: '沥青摊铺机',
      model: '200',
      money: '200元',
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
  ];

  return (
    <>
      <Table
        data={data}
        columns={columns}
        colors={['red', 'blue', 'green']}
        height={200}
        pageSize={4}
      />
    </>
  );
};
