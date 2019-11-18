/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-27 16:26:45
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-12 16:47:57
 */
export default {
  '/resource': {
    success: true,
    data: [
      {
        id: 2005,
        resourceKey: 'ORG',
        apiUrl: '/contacts',
        icon: 'iconzuzhijigou1',
        description: '组织机构管理',
        type: 0,
        orderValue: 2,
        children: [],
        privilegeList: ['test', 'test2'],
      },
      {
        id: 2006,
        resourceKey: 'APPROVE',
        apiUrl: '/approval',
        icon: 'iconshenhe',
        description: '审批管理',
        type: 0,
        orderValue: 3,
        children: [
          {
            id: 2011,
            resourceKey: 'APPROVAL_PROCESS',
            apiUrl: '/approval/process/list',
            icon: '',
            description: '流程管理',
            type: 0,
            orderValue: 1,
            children: [],
            privilegeList: [],
          },
          {
            id: 2012,
            resourceKey: 'APPROVAL_SEAL',
            apiUrl: '/approval/seal/list',
            icon: '',
            description: '用章管理',
            type: 0,
            orderValue: 2,
            children: [],
            privilegeList: ['hahaha'],
          },
        ],
        privilegeList: [],
      },
    ],
    code: 20000,
    message: '成功',
  },
};
