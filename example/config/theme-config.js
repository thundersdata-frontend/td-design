// 主题key default必须存在 其他可自定义配置 项目初始化的时候默认使用default作为初始key
module.exports = {
  default: {
    title: '默认',
    config: {
      '@primary-color': '#1890ff',
      '@my-color': 'green',
      '@my-background-color': 'rgba(0, 100, 0, 0.256)',
      '@line-height-base': '30px',
    },
  },
  passion: {
    title: '激情',
    config: {
      '@primary-color': 'red',
      '@my-color': '#a5a50d',
      '@my-background-color': 'rgba(100, 0, 0, 0.256)',
      '@line-height-base': '45px',
    },
  },
  yang: {
    title: '沉稳',
    config: {
      '@primary-color': 'rgba(0, 0, 0, 0.9)',
      '@my-color': 'rgba(0, 0, 0, 0.9)',
      '@my-background-color': 'rgba(0, 0, 100, 0.256)',
      '@line-height-base': '60px',
    },
  },
  violet: {
    title: '酱紫',
    config: {
      '@primary-color': '#722ed1',
      '@my-color': '#722ed1',
      '@my-background-color': 'rgba(100, 0, 100, 0.256)',
      '@line-height-base': '75px',
    },
  },
};
