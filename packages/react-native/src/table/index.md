---
title: Table - 表格组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Table 表格组件

## 效果演示

### 1. 基本的用法

```tsx | pure
  const columns = [
    {
      title: '管理员',
      dataIndex: 'userInfo',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '部门',
      dataIndex: 'opDepartmentName',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '操作内容',
      dataIndex: 'opContent',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '业务模块',
      dataIndex: 'businessModule',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
  ];

  const dataSource = [
    {
      id: 4694447,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '',
      opType: '解除封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:17:22.000+08:00',
    },
    {
      id: 4694446,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '117569,[2, 1, 4],11',
      opType: '封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:17:09.000+08:00',
    },
    {
      id: 4694443,
      userId: 116969,
      userName: 'zhuxc',
      nickName: 'zhuxc',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 4,
      opDepartmentName: '根部门1',
      accountType: 1,
      opResources: 'zhuxc',
      opType: '运营商用户名密码登录',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '用户登录',
      loginIp: '60.12.241.84',
      loginCity: null,
      createdAt: '2020-12-01T17:15:09.000+08:00',
    },
    {
      id: 4694369,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '117569,[4],11',
      opType: '封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:00:21.000+08:00',
    },
    {
      id: 4694357,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '',
      opType: '查看黑白名单列表',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '黑白名单',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T16:59:43.000+08:00',
    }]
<WingBlank>
  <Table columns={columns} dataSource={data} tableHeight={300} />
</WingBlank>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="基本的用法 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881149351049415.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="基本的用法 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881142979624786.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. columns 属性

```tsx | pure
  const columns = [
     {
      title: '管理员',
      dataIndex: 'userInfo',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      width: 100,
      flex: 2,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      width: 50,
    },
    {
      title: '部门',
      dataIndex: 'opDepartmentName',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      width: 20,
    },
    {
      title: '操作内容',
      dataIndex: 'opContent',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '业务模块',
      dataIndex: 'businessModule',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'dateTimeRange',
    },
    {
      title: 'IP地址',
      dataIndex: 'loginIp',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
  ];

  const dataSource = [
    {
      id: 4694447,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '',
      opType: '解除封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:17:22.000+08:00',
    },
    {
      id: 4694446,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '117569,[2, 1, 4],11',
      opType: '封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:17:09.000+08:00',
    },
    {
      id: 4694443,
      userId: 116969,
      userName: 'zhuxc',
      nickName: 'zhuxc',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 4,
      opDepartmentName: '根部门1',
      accountType: 1,
      opResources: 'zhuxc',
      opType: '运营商用户名密码登录',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '用户登录',
      loginIp: '60.12.241.84',
      loginCity: null,
      createdAt: '2020-12-01T17:15:09.000+08:00',
    },
    {
      id: 4694369,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '117569,[4],11',
      opType: '封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:00:21.000+08:00',
    },
    {
      id: 4694357,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '',
      opType: '查看黑白名单列表',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '黑白名单',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T16:59:43.000+08:00',
    }]
<WingBlank>
  <Table columns={columns} dataSource={data} tableHeight={300} />
</WingBlank>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="columns 属性 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881149467256102.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="columns 属性 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881143078263714.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 横向滚动

```tsx | pure
  const columns = [
     {
      title: '管理员',
      dataIndex: 'userInfo',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      width: 100,
      flex: 2,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      width: 50,
    },
    {
      title: '部门',
      dataIndex: 'opDepartmentName',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      width: 20,
    },
    {
      title: '操作内容',
      dataIndex: 'opContent',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '业务模块',
      dataIndex: 'businessModule',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'dateTimeRange',
    },
    {
      title: 'IP地址',
      dataIndex: 'loginIp',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
    },
  ];

  const dataSource = [
    {
      id: 4694447,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '',
      opType: '解除封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:17:22.000+08:00',
    },
    {
      id: 4694446,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '117569,[2, 1, 4],11',
      opType: '封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:17:09.000+08:00',
    },
    {
      id: 4694443,
      userId: 116969,
      userName: 'zhuxc',
      nickName: 'zhuxc',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 4,
      opDepartmentName: '根部门1',
      accountType: 1,
      opResources: 'zhuxc',
      opType: '运营商用户名密码登录',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '用户登录',
      loginIp: '60.12.241.84',
      loginCity: null,
      createdAt: '2020-12-01T17:15:09.000+08:00',
    },
    {
      id: 4694369,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '117569,[4],11',
      opType: '封禁会员账号、漫克',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '会员模块',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T17:00:21.000+08:00',
    },
    {
      id: 4694357,
      userId: 117676,
      userName: 'sxj',
      nickName: 'sxj',
      roleId: 519,
      roleName: '超级管理员角色',
      opDepartmentId: 22,
      opDepartmentName: 'lw是',
      accountType: 1,
      opResources: '',
      opType: '查看黑白名单列表',
      deviceNo: null,
      deviceSystem: null,
      clientId: 'manke-management',
      groupId: null,
      businessModule: '黑白名单',
      loginIp: '222.173.46.190',
      loginCity: null,
      createdAt: '2020-12-01T16:59:43.000+08:00',
    }]
<WingBlank>
  <Table columns={columns} dataSource={data} horizontalScroll={true} tableWidth={1000} tableHeight={300} />
</WingBlank>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="横向滚动 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881149887640842.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="横向滚动 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881148374317833.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 空状态

```tsx | pure
const columns = [
  {
    title: '管理员',
    dataIndex: 'userInfo',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
    width: 100,
    flex: 2,
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
    width: 50,
  },
  {
    title: '部门',
    dataIndex: 'opDepartmentName',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
    width: 20,
  },
  {
    title: '操作内容',
    dataIndex: 'opContent',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
  },
  {
    title: '业务模块',
    dataIndex: 'businessModule',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
  },
  {
    title: '操作时间',
    dataIndex: 'createdAt',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'dateTimeRange',
  },
  {
    title: 'IP地址',
    dataIndex: 'loginIp',
    align: 'left',
    ellipsis: false,
    copyable: false,
    valueType: 'text',
    hideInSearch: false,
  },
];

<WingBlank>
  <Table columns={columns} dataSource={[]} tableHeight={300} />
</WingBlank>;
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="空状态 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881148736057650.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="空状态 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881142906522840.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### table 组件 API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| columns | true | 表格的列定义 | ColumnProps[] | 无 |
| dataSource | true | 表格的数据 | [{ [key: string]: string }] \| [] | [] |
| horizontalScroll | flase | 是否可以横向滚动定义了 tableWidth 后才可以滚动 | boolean | false |
| headerStyle | false | 表单头部样式 | ViewStyle | 无 |
| rowStyle | false | 数据行样式 | ViewStyle | 无 |
| onRefresh | false | 表格下拉刷新 | () => void | 无 |
| onEndReached | false | 表格上拉加载 | () => void | 无 |
| refreshing | false | 刷新状态 | boolean | false |
| tableWidth | false | 表单的宽度 | number | 无 |
| tableHeight | false | 表单的高度 如果不填则为 flex:1 由外部容器决定 | number | deviceHeight |

### ColumnProps 属性

| 属性          | 必填  | 说明             | 类型                                                | 默认值 |
| ------------- | ----- | ---------------- | --------------------------------------------------- | ------ |
| title         | true  | 表单的列标题     | string                                              | 无     |
| dataIndex     | true  | 数据的 key 值    | string                                              | 无     |
| numberOfLines | flase | 文字行数         | number                                              | 无     |
| ellipsizeMode | false | 超出后的截取方式 | 'head' \| 'middle' \| 'tail' \| 'clip'              | 无     |
| textAlign     | false | 文字对其方式     | 'center' \| 'left' \| 'right'                       | 无     |
| width         | false | 列的宽度         | number                                              | 无     |
| flex          | false | 列的占比         | number                                              | 无     |
| renderText    | false | 自定义文本       | (item: string, column: ColumnProps) => string       | 无     |
| render        | false | 自定义组件       | (item: string, column: ColumnProps) => ReactElement | 无     |
