---
title: Table - 表格组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 展示组件
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
  <figure>
    <img
      alt="基本的用法 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881149351049415.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt="columns 属性 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881149467256102.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt="横向滚动 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881149887640842.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt="空状态 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881148736057650.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### table 组件 API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| columns | `true` | 表格的列定义 | `ColumnProps[]` |  |
| dataSource | `true` | 表格的数据 | `[{ [key: string]: string }]` |  |
| horizontalScroll | `false` | 是否可以横向滚动 （定义了 tableWidth 后才可以滚动） | `boolean` | `false` |
| headerStyle | `false` | 表单头部样式 | `ViewStyle` |  |
| rowStyle | `false` | 数据行样式 | `ViewStyle` |  |
| onRefresh | `false` | 表格下拉刷新 | `() => void` |  |
| onEndReached | `false` | 表格上拉加载 | `() => void` |  |
| refreshing | `false` | 刷新状态 | `boolean` | `false` |
| tableWidth | `false` | 表单的宽度 | `number` |  |
| tableHeight | `false` | 表单的高度 （如果不填则为 flex:1，由外部容器决定） | `number` | `deviceHeight` |
| fixedHeader | `false` | 是否固定头部 | `boolean` | `false` |
| showHeader | `false` | 是否显示表头 | `boolean` | `false` |
| emptyComponent | `false` | 空状态的视图 | `ReactElement` |  |

### ColumnProps 属性

| 属性          | 必填    | 说明             | 类型                                                  | 默认值 |
| ------------- | ------- | ---------------- | ----------------------------------------------------- | ------ |
| title         | `true`  | 表单的列标题     | `string`                                              |        |
| dataIndex     | `true`  | 数据的 key 值    | `string`                                              |        |
| numberOfLines | `false` | 文字行数         | `number`                                              |        |
| ellipsisMode  | `false` | 超出后的截取方式 | `head` \| `middle` \| `tail` \| `clip`                |        |
| textAlign     | `false` | 文字对其方式     | `center` \| `left` \| `right`                         |        |
| width         | `false` | 列的宽度         | `number`                                              |        |
| flex          | `false` | 列的占比         | `number`                                              |        |
| renderText    | `false` | 自定义文本       | `(item: string, column: ColumnProps) => string`       |        |
| render        | `false` | 自定义组件       | `(item: string, column: ColumnProps) => ReactElement` |        |
