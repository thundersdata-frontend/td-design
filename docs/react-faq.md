---
nav:
  title: React应用开发常见问题
  path: /faq
group:
  title: 开发常见问题
  path: /
  order: 1
---

# React 应用开发常见问题

## 单点登录

### 新项目接入单点登录

新项目里直接接入单点登录比较简单，按照我们目前用的 `umi-request` 库，只需要在 `common.ts`中配置 `credentials: include`即可，不需要太多额外的操作

### 老项目改造接入单点登录

1. 首先先找到项目中配置 `request` 的文件，在配置中加入 `credentials: include`，如果老项目中用的是 `axios`库，在配置中加入 `withCredentials: true`
2. 在请求头中去掉携带 `token`
3. 找到判断是否登录的地方（一般都是通过是否有 token 判断是否已经登录），直接设置成已经登录的状态
4. 找到退出登录的地方，把 `logoutUrl`设置为 `域名 + '/logout?redirect_url=' + 域名`
5. 部署应用的时候，把单点登录域配置上去，具体的 `key` 可以找后端同学

`tips: 一般我们的token都是通过写了一个方法去获取的，所以你可以在上面第二步去掉token的地方，找到那个方法然后进行全局搜索，不出意外的话，可以顺着这个方法找到判断是否登录的方法，以及一些类似于上传文件、上传图片需要token的地方，也设置为 withCredentials=true 即可 `
