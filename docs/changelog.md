# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [1.19.0](https://github.com/thundersdata-frontend/td-design/compare/v1.18.0...v1.19.0) (2021-12-14)


### ♻ Code Refactoring

* 初步完成组件重构 ([0ee39da](https://github.com/thundersdata-frontend/td-design/commit/0ee39da)) by: **chj_damon** (chjdamon@gmail.com)
* 删除PullRefresh组件 ([ea6aaea](https://github.com/thundersdata-frontend/td-design/commit/ea6aaea)) by: **chj_damon** (chjdamon@gmail.com)
* 完成Tabs组件重构 ([8d7dd57](https://github.com/thundersdata-frontend/td-design/commit/8d7dd57)) by: **chj_damon** (chjdamon@gmail.com)
* 重构tabs组件 ([63b3e5f](https://github.com/thundersdata-frontend/td-design/commit/63b3e5f)) by: **chj_damon** (chjdamon@gmail.com)
* 重构类型声明的定义 ([bb9ed14](https://github.com/thundersdata-frontend/td-design/commit/bb9ed14)) by: **chj_damon** (chjdamon@gmail.com)


### ✨ Features

* 为Image组件新增预览功能 ([46df215](https://github.com/thundersdata-frontend/td-design/commit/46df215)) by: **chj_damon** (chjdamon@gmail.com)
* 使用measure方法重构Accordion组件 ([33d48f8](https://github.com/thundersdata-frontend/td-design/commit/33d48f8)) by: **chj_damon** (chjdamon@gmail.com)
* 同步hooks，新增clearCache功能 ([510f9da](https://github.com/thundersdata-frontend/td-design/commit/510f9da)) by: **chj_damon** (chjdamon@gmail.com)
* 图标的宽高支持字符串百分比的形式 ([cda86d4](https://github.com/thundersdata-frontend/td-design/commit/cda86d4)) by: **chj_damon** (chjdamon@gmail.com)
* 导出ListHeader组件 ([81044d8](https://github.com/thundersdata-frontend/td-design/commit/81044d8)) by: **chj_damon** (chjdamon@gmail.com)
* 拆分Checkable组件为Checkbox和Radio ([431d9f5](https://github.com/thundersdata-frontend/td-design/commit/431d9f5)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* 为主题添加字体配置 ([69a473d](https://github.com/thundersdata-frontend/td-design/commit/69a473d)) by: **chj_damon** (chjdamon@gmail.com)
* 优化tag小标签时的效果 ([1bd0380](https://github.com/thundersdata-frontend/td-design/commit/1bd0380)) by: **chj_damon** (chjdamon@gmail.com)
* 修复hooks定义的类型无法在项目里使用的问题 ([84d59e6](https://github.com/thundersdata-frontend/td-design/commit/84d59e6)) by: **chj_damon** (chjdamon@gmail.com)
* 修复ImageHeader的showLeft属性的bug ([4941267](https://github.com/thundersdata-frontend/td-design/commit/4941267)) by: **chj_damon** (chjdamon@gmail.com)
* 修复ready和refreshDeps同时触发时会执行两次的bug ([cd331c7](https://github.com/thundersdata-frontend/td-design/commit/cd331c7)) by: **chj_damon** (chjdamon@gmail.com)
* 修复searchBar第二次输入时取消文字不显示的问题 ([ff2e994](https://github.com/thundersdata-frontend/td-design/commit/ff2e994)) by: **hss** (2274246770@qq.com)
* 修复按钮的样式问题 ([c9a7a31](https://github.com/thundersdata-frontend/td-design/commit/c9a7a31)) by: **chj_damon** (chjdamon@gmail.com)
* 修复文档链接问题 ([18feaae](https://github.com/thundersdata-frontend/td-design/commit/18feaae)) by: **chj_damon** (chjdamon@gmail.com)
* 修改Image预览属性默认为false ([2d737b2](https://github.com/thundersdata-frontend/td-design/commit/2d737b2)) by: **chj_damon** (chjdamon@gmail.com)
* 同步useMemoizedFn写法 ([30d9009](https://github.com/thundersdata-frontend/td-design/commit/30d9009)) by: **chj_damon** (chjdamon@gmail.com)
* 恢复误删的图标文件 ([42820fe](https://github.com/thundersdata-frontend/td-design/commit/42820fe)) by: **chj_damon** (chjdamon@gmail.com)



# [1.18.0](https://github.com/thundersdata-frontend/td-design/compare/v1.17.0...v1.18.0) (2021-11-28)


### ♻ Code Refactoring

* 对标ahooks，同步所有改动，并新增N个hooks ([13f21d8](https://github.com/thundersdata-frontend/td-design/commit/13f21d8)) by: **chj_damon** (chjdamon@gmail.com)


### ✅ Tests

* 补充并修改多个测试用例 ([cf90018](https://github.com/thundersdata-frontend/td-design/commit/cf90018)) by: **chj_damon** (chjdamon@gmail.com)


### ✨ Features

* 为tabs组件补充example ([7e164d5](https://github.com/thundersdata-frontend/td-design/commit/7e164d5)) by: **chj_damon** (chjdamon@gmail.com)
* 为线图、柱图以及其他一些图表增加是否在弹窗里的配置 ([19e141f](https://github.com/thundersdata-frontend/td-design/commit/19e141f)) by: **chj_damon** (chjdamon@gmail.com)
* 支持eslint fix命令自动修复 ([f942671](https://github.com/thundersdata-frontend/td-design/commit/f942671)) by: **chj_damon** (chjdamon@gmail.com)
* 新增 Map 组件 ([a844fef](https://github.com/thundersdata-frontend/td-design/commit/a844fef)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 新增List组件 ([cc1bac1](https://github.com/thundersdata-frontend/td-design/commit/cc1bac1)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useRequest和usePagination ([db910dc](https://github.com/thundersdata-frontend/td-design/commit/db910dc)) by: **chj_damon** (chjdamon@gmail.com)
* 新增图标允许传入宽高的功能 ([f5a7b38](https://github.com/thundersdata-frontend/td-design/commit/f5a7b38)) by: **chj_damon** (chjdamon@gmail.com)
* 新增外部控制图表的功能 ([1417e23](https://github.com/thundersdata-frontend/td-design/commit/1417e23)) by: **chj_damon** (chjdamon@gmail.com)
* 新增多个hooks ([ed8acd6](https://github.com/thundersdata-frontend/td-design/commit/ed8acd6)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* bump version ([5a9ea2a](https://github.com/thundersdata-frontend/td-design/commit/5a9ea2a)) by: **chj_damon** (chjdamon@gmail.com)
* bump version ([96f2422](https://github.com/thundersdata-frontend/td-design/commit/96f2422)) by: **chj_damon** (chjdamon@gmail.com)
* bump version ([6e41172](https://github.com/thundersdata-frontend/td-design/commit/6e41172)) by: **chj_damon** (chjdamon@gmail.com)
* bump version lego 1.3.4 ([e46e2ec](https://github.com/thundersdata-frontend/td-design/commit/e46e2ec)) by: **chj_damon** (chjdamon@gmail.com)
* rename jotai-modular ([fac075b](https://github.com/thundersdata-frontend/td-design/commit/fac075b)) by: **chj_damon** (chjdamon@gmail.com)
* 切换npm registry为https ([88ab4db](https://github.com/thundersdata-frontend/td-design/commit/88ab4db)) by: **chj_damon** (chjdamon@gmail.com)
* 解决冲突 ([60adbb6](https://github.com/thundersdata-frontend/td-design/commit/60adbb6)) by: **rxs-michael** (ruanxusong@thundersdata.com)


### 🐛 Bug Fixes

* datePicker 增加默认值 ([c909e48](https://github.com/thundersdata-frontend/td-design/commit/c909e48)) by: **chen929104** (929104662@qq.com)
* useRequest onFinally prevent after cancel ([06b7f22](https://github.com/thundersdata-frontend/td-design/commit/06b7f22)) by: **chj_damon** (chjdamon@gmail.com)
* video 新增清晰度配置,地图调整 geoJson 获取方法 ([9e9415b](https://github.com/thundersdata-frontend/td-design/commit/9e9415b)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 代码优化,增加地图级联层数 ([1a8591a](https://github.com/thundersdata-frontend/td-design/commit/1a8591a)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复3D饼图显示bug ([a8bf1a5](https://github.com/thundersdata-frontend/td-design/commit/a8bf1a5)) by: **qiuyan** (qqack225@gmail.com)
* 修复jotai-modular报错提示atom名字不正确的问题 ([4112668](https://github.com/thundersdata-frontend/td-design/commit/4112668)) by: **chj_damon** (chjdamon@gmail.com)
* 修复jotai-modular的bug ([af847e4](https://github.com/thundersdata-frontend/td-design/commit/af847e4)) by: **chj_damon** (chjdamon@gmail.com)
* 修复numberKeyboard为空placeholder消失问题 ([7a37303](https://github.com/thundersdata-frontend/td-design/commit/7a37303)) by: **qiuyan** (qqack225@gmail.com)
* 修复picker点击输入框中的x, 再点击弹窗中的取消按钮，之后一直选择失败的bug ([0433064](https://github.com/thundersdata-frontend/td-design/commit/0433064)) by: **qiuyan** (qqack225@gmail.com)
* 修复svgIcon工具生成文件有无效引用的bug ([a8aa0b7](https://github.com/thundersdata-frontend/td-design/commit/a8aa0b7)) by: **chj_damon** (chjdamon@gmail.com)
* 修复symbol类型大小写问题 ([8258e64](https://github.com/thundersdata-frontend/td-design/commit/8258e64)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Tag组件内容太长时被折行的问题 ([8c52e86](https://github.com/thundersdata-frontend/td-design/commit/8c52e86)) by: **chj_damon** (chjdamon@gmail.com)
* 修复useMemoizedFn 的this问题 ([0e186ed](https://github.com/thundersdata-frontend/td-design/commit/0e186ed)) by: **chj_damon** (chjdamon@gmail.com)
* 修复useScopedAtom类型问题 ([2acc4da](https://github.com/thundersdata-frontend/td-design/commit/2acc4da)) by: **chj_damon** (chjdamon@gmail.com)
* 修复分页和请求hooks没有默认导出的问题 ([c718cb9](https://github.com/thundersdata-frontend/td-design/commit/c718cb9)) by: **chj_damon** (chjdamon@gmail.com)
* 修复图表 ref 传入函数无法自动轮播 bug ([a251e2e](https://github.com/thundersdata-frontend/td-design/commit/a251e2e)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复地图组件报错 ([c6a0f5c](https://github.com/thundersdata-frontend/td-design/commit/c6a0f5c)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复多次打开视频报错bug ([20901b0](https://github.com/thundersdata-frontend/td-design/commit/20901b0)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复新加的hooks没有导出的问题 ([9aa191a](https://github.com/thundersdata-frontend/td-design/commit/9aa191a)) by: **chj_damon** (chjdamon@gmail.com)
* 修复新增的hooks没有默认导出的bug ([9a2631c](https://github.com/thundersdata-frontend/td-design/commit/9a2631c)) by: **chj_damon** (chjdamon@gmail.com)
* 删除多余console ([e5a399c](https://github.com/thundersdata-frontend/td-design/commit/e5a399c)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 地图新增 otherSeriesConfig 属性,调整地图 demo ([5bda691](https://github.com/thundersdata-frontend/td-design/commit/5bda691)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 地图新增点线相关配置,下钻事件属性及其他配置 ([5422d75](https://github.com/thundersdata-frontend/td-design/commit/5422d75)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 微调类型 ([cc9589e](https://github.com/thundersdata-frontend/td-design/commit/cc9589e)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 新增视频清晰度 demo,切换 amapKey ([674cf57](https://github.com/thundersdata-frontend/td-design/commit/674cf57)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 替换视频组件 ([c046efe](https://github.com/thundersdata-frontend/td-design/commit/c046efe)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 添加一些手动控制轮播的demo ([1d0c867](https://github.com/thundersdata-frontend/td-design/commit/1d0c867)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 添加图表事件监听属性 ([c0413d2](https://github.com/thundersdata-frontend/td-design/commit/c0413d2)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 添加外部控制图表的功能,增加ref实例 ([b3f558a](https://github.com/thundersdata-frontend/td-design/commit/b3f558a)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 解决imagePicker在ios13上无法打开的问题 ([ed971a8](https://github.com/thundersdata-frontend/td-design/commit/ed971a8)) by: **chen929104** (929104662@qq.com)
* 调整 FloatBall,DataShow 组件样式 ([c85e24b](https://github.com/thundersdata-frontend/td-design/commit/c85e24b)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整 series 写法 ([0e37d34](https://github.com/thundersdata-frontend/td-design/commit/0e37d34)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整Video ([702ebd9](https://github.com/thundersdata-frontend/td-design/commit/702ebd9)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整抽出 echartsRef 方法 ([0fe80cf](https://github.com/thundersdata-frontend/td-design/commit/0fe80cf)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整注释 ([278acb5](https://github.com/thundersdata-frontend/td-design/commit/278acb5)) by: **rxs-michael** (ruanxusong@thundersdata.com)


### 📝 Documentation

* 设计模式-策略模式 ([acb18ed](https://github.com/thundersdata-frontend/td-design/commit/acb18ed)) by: **chen929104** (929104662@qq.com)



# [1.17.0](https://github.com/thundersdata-frontend/td-design/compare/v1.16.0...v1.17.0) (2021-09-18)


### ♻ Code Refactoring

* circularSolidPie使用useChartLoop ([884113c](https://github.com/thundersdata-frontend/td-design/commit/884113c)) by: **qiuyan** (qqack225@gmail.com)
* 优化3D饼图逻辑以及添加饼图图例改变数据轮播逻辑 ([ba3f17c](https://github.com/thundersdata-frontend/td-design/commit/ba3f17c)) by: **qiuyan** (qqack225@gmail.com)
* 优化大屏素材库的swiper和table ([23374c0](https://github.com/thundersdata-frontend/td-design/commit/23374c0)) by: **qiuyan** (qqack225@gmail.com)
* 修改useChartLoop的useEffect依赖逻辑 ([194ac46](https://github.com/thundersdata-frontend/td-design/commit/194ac46)) by: **qiuyan** (qqack225@gmail.com)
* 去掉useChartLoop多余逻辑 ([075c609](https://github.com/thundersdata-frontend/td-design/commit/075c609)) by: **qiuyan** (qqack225@gmail.com)


### ✨ Features

* 为jotai的atom支持模块化 ([33fa043](https://github.com/thundersdata-frontend/td-design/commit/33fa043)) by: **chj_damon** (chjdamon@gmail.com)
* 自定义eslint插件用来标记部分想要替换的hooks ([21a7625](https://github.com/thundersdata-frontend/td-design/commit/21a7625)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* bump lego version 1.3.1 ([e9d0d9f](https://github.com/thundersdata-frontend/td-design/commit/e9d0d9f)) by: **chj_damon** (chjdamon@gmail.com)
* bump lego version 1.3.2 ([1e2bb7f](https://github.com/thundersdata-frontend/td-design/commit/1e2bb7f)) by: **chj_damon** (chjdamon@gmail.com)
* bump logo version to 1.3.0 ([e977c68](https://github.com/thundersdata-frontend/td-design/commit/e977c68)) by: **chj_damon** (chjdamon@gmail.com)
* 发布lego版本1.3.3和react-native-picker版本1.6.3 ([a88ca66](https://github.com/thundersdata-frontend/td-design/commit/a88ca66)) by: **hss** (2274246770@qq.com)


### 🐛 Bug Fixes

* 优化useMemoizedFn写法 ([0f81a9a](https://github.com/thundersdata-frontend/td-design/commit/0f81a9a)) by: **chj_damon** (chjdamon@gmail.com)
* 修复pickitem的value过长导致样式错乱的bug ([fa97c40](https://github.com/thundersdata-frontend/td-design/commit/fa97c40)) by: **hss** (2274246770@qq.com)
* 修复pickitem的value过长导致样式错乱的bug ([d2e6a16](https://github.com/thundersdata-frontend/td-design/commit/d2e6a16)) by: **hss** (2274246770@qq.com)
* 修复文字显示居左的问题 ([ffa7fa9](https://github.com/thundersdata-frontend/td-design/commit/ffa7fa9)) by: **hss** (2274246770@qq.com)
* 抽出 useStyle hook,封装初始样式 ([8afdf81](https://github.com/thundersdata-frontend/td-design/commit/8afdf81)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整打包文件 ([370055b](https://github.com/thundersdata-frontend/td-design/commit/370055b)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整样式写法,调整一些属性 ([6c71fbb](https://github.com/thundersdata-frontend/td-design/commit/6c71fbb)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整格式化 ([7bb8bd2](https://github.com/thundersdata-frontend/td-design/commit/7bb8bd2)) by: **rxs-michael** (ruanxusong@thundersdata.com)



# [1.16.0](https://github.com/thundersdata-frontend/td-design/compare/v1.15.0...v1.16.0) (2021-09-10)


### ♻ Code Refactoring

* 优化amap-search代码 ([71c8d52](https://github.com/thundersdata-frontend/td-design/commit/71c8d52)) by: **chj_damon** (chjdamon@gmail.com)
* 优化lego和hooks的构建方法为gulp ([cc3b28c](https://github.com/thundersdata-frontend/td-design/commit/cc3b28c)) by: **chj_damon** (chjdamon@gmail.com)
* 修改basePie和Gauge宽高计算方式 ([96d4e86](https://github.com/thundersdata-frontend/td-design/commit/96d4e86)) by: **chen929104** (929104662@qq.com)
* 修改tree组件 ([3f2936e](https://github.com/thundersdata-frontend/td-design/commit/3f2936e)) by: **chen929104** (929104662@qq.com)
* 修改环形立体饼图由3D变成普通饼图 ([98fd668](https://github.com/thundersdata-frontend/td-design/commit/98fd668)) by: **qiuyan** (qqack225@gmail.com)
* 完成一部分组件的改造 ([9f8283f](https://github.com/thundersdata-frontend/td-design/commit/9f8283f)) by: **chj_damon** (chjdamon@gmail.com)
* 完成一部分组件的重构 ([c9d7afb](https://github.com/thundersdata-frontend/td-design/commit/c9d7afb)) by: **chj_damon** (chjdamon@gmail.com)
* 完成一部分组件的重构 ([5540b8f](https://github.com/thundersdata-frontend/td-design/commit/5540b8f)) by: **chj_damon** (chjdamon@gmail.com)
* 完成一部分组件的重构 ([a37eb2b](https://github.com/thundersdata-frontend/td-design/commit/a37eb2b)) by: **chj_damon** (chjdamon@gmail.com)
* 改造react-native-rating ([520e7cb](https://github.com/thundersdata-frontend/td-design/commit/520e7cb)) by: **chj_damon** (chjdamon@gmail.com)
* 重构calendar ([fb2685c](https://github.com/thundersdata-frontend/td-design/commit/fb2685c)) by: **chj_damon** (chjdamon@gmail.com)
* 重构image-picker ([be4e89e](https://github.com/thundersdata-frontend/td-design/commit/be4e89e)) by: **chj_damon** (chjdamon@gmail.com)
* 重构password ([96800ad](https://github.com/thundersdata-frontend/td-design/commit/96800ad)) by: **chj_damon** (chjdamon@gmail.com)
* 重构react-native-picker ([f484efb](https://github.com/thundersdata-frontend/td-design/commit/f484efb)) by: **chj_damon** (chjdamon@gmail.com)


### ✅ Tests

* 提高测试覆盖率 ([5613b97](https://github.com/thundersdata-frontend/td-design/commit/5613b97)) by: **chj_damon** (chjdamon@gmail.com)


### ✨ Features

* image-picker添加fileSize字段 ([9e1d220](https://github.com/thundersdata-frontend/td-design/commit/9e1d220)) by: **qiuyan** (qqack225@gmail.com)
* 为react-native添加jest环境 ([4ecf1b2](https://github.com/thundersdata-frontend/td-design/commit/4ecf1b2)) by: **chj_damon** (chjdamon@gmail.com)
* 为柱线混合图增加轮播逻辑 ([58de3a7](https://github.com/thundersdata-frontend/td-design/commit/58de3a7)) by: **chj_damon** (chjdamon@gmail.com)
* 修复部分图表取消legend后有残留的问题 ([13f4a05](https://github.com/thundersdata-frontend/td-design/commit/13f4a05)) by: **chj_damon** (chjdamon@gmail.com)
* 封装自动轮播的hooks ([dcf5e56](https://github.com/thundersdata-frontend/td-design/commit/dcf5e56)) by: **chj_damon** (chjdamon@gmail.com)
* 开始补充hooks和测试用例 ([bf9fc5e](https://github.com/thundersdata-frontend/td-design/commit/bf9fc5e)) by: **chj_damon** (chjdamon@gmail.com)
* 新增debounce和throttle相关hooks ([1000d89](https://github.com/thundersdata-frontend/td-design/commit/1000d89)) by: **chj_damon** (chjdamon@gmail.com)
* 新增hooks的package ([35d8f85](https://github.com/thundersdata-frontend/td-design/commit/35d8f85)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useControllableValue和useCounter ([3300b22](https://github.com/thundersdata-frontend/td-design/commit/3300b22)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useCreation ([0f49138](https://github.com/thundersdata-frontend/td-design/commit/0f49138)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useDebounceFn/useLatest/useUnmount ([f667745](https://github.com/thundersdata-frontend/td-design/commit/f667745)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useDeepCompareEffect ([e5497ec](https://github.com/thundersdata-frontend/td-design/commit/e5497ec)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useInterval、useTimeout ([ddce109](https://github.com/thundersdata-frontend/td-design/commit/ddce109)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useLockFn ([907ea90](https://github.com/thundersdata-frontend/td-design/commit/907ea90)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useMap/useSet/useImmer ([fe6b6d7](https://github.com/thundersdata-frontend/td-design/commit/fe6b6d7)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useMount ([7f71a98](https://github.com/thundersdata-frontend/td-design/commit/7f71a98)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useSafeState/useUnmountedRef ([3673828](https://github.com/thundersdata-frontend/td-design/commit/3673828)) by: **chj_damon** (chjdamon@gmail.com)
* 新增useSms ([3dbd200](https://github.com/thundersdata-frontend/td-design/commit/3dbd200)) by: **chj_damon** (chjdamon@gmail.com)
* 新增叠片图自动轮播效果 ([3961745](https://github.com/thundersdata-frontend/td-design/commit/3961745)) by: **chj_damon** (chjdamon@gmail.com)
* 新增圆柱图自动轮播效果 ([b55ac3a](https://github.com/thundersdata-frontend/td-design/commit/b55ac3a)) by: **chj_damon** (chjdamon@gmail.com)
* 新增多折线图自动轮播效果 ([402a595](https://github.com/thundersdata-frontend/td-design/commit/402a595)) by: **chj_damon** (chjdamon@gmail.com)
* 新增散点图自动轮播效果 ([e28ebc2](https://github.com/thundersdata-frontend/td-design/commit/e28ebc2)) by: **chj_damon** (chjdamon@gmail.com)
* 新增条形图自动轮播效果 ([541fe5d](https://github.com/thundersdata-frontend/td-design/commit/541fe5d)) by: **chj_damon** (chjdamon@gmail.com)
* 新增立体柱状图自动轮播效果 ([2c5d4ae](https://github.com/thundersdata-frontend/td-design/commit/2c5d4ae)) by: **chj_damon** (chjdamon@gmail.com)
* 新增象形图自动轮播效果 ([7340570](https://github.com/thundersdata-frontend/td-design/commit/7340570)) by: **chj_damon** (chjdamon@gmail.com)
* 新增阴影圆柱图自动轮播效果 ([c01b2ab](https://github.com/thundersdata-frontend/td-design/commit/c01b2ab)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* bump hooks & lego version ([54316b9](https://github.com/thundersdata-frontend/td-design/commit/54316b9)) by: **chj_damon** (chjdamon@gmail.com)
* 优化开发环境配置 ([1741bf1](https://github.com/thundersdata-frontend/td-design/commit/1741bf1)) by: **chj_damon** (chjdamon@gmail.com)
* 使用@td-design/rn-hooks处理输入输出 ([633e727](https://github.com/thundersdata-frontend/td-design/commit/633e727)) by: **chen929104** (929104662@qq.com)
* 使用useSafeState替换useState ([b40f033](https://github.com/thundersdata-frontend/td-design/commit/b40f033)) by: **chj_damon** (chjdamon@gmail.com)
* 修改amap-search发版的名字 ([482a37e](https://github.com/thundersdata-frontend/td-design/commit/482a37e)) by: **chj_damon** (chjdamon@gmail.com)
* 修改包名 ([9b29aaf](https://github.com/thundersdata-frontend/td-design/commit/9b29aaf)) by: **chen929104** (929104662@qq.com)
* 修改注释风格 ([8bf66cb](https://github.com/thundersdata-frontend/td-design/commit/8bf66cb)) by: **chen929104** (929104662@qq.com)
* 修改版本号 ([6599ccc](https://github.com/thundersdata-frontend/td-design/commit/6599ccc)) by: **chen929104** (929104662@qq.com)
* 删除一些无用的代码和配置 ([149f8bc](https://github.com/thundersdata-frontend/td-design/commit/149f8bc)) by: **chj_damon** (chjdamon@gmail.com)
* 升级项目依赖 ([18120f8](https://github.com/thundersdata-frontend/td-design/commit/18120f8)) by: **chj_damon** (chjdamon@gmail.com)
* 解决冲突 ([666ec71](https://github.com/thundersdata-frontend/td-design/commit/666ec71)) by: **chen929104** (929104662@qq.com)


### 🐛 Bug Fixes

*  修复部分单数据图表的tooltip显示重复的问题 ([682b107](https://github.com/thundersdata-frontend/td-design/commit/682b107)) by: **chj_damon** (chjdamon@gmail.com)
* 1使用useCallback 2 修复一些错误的ts类型 ([c056e3d](https://github.com/thundersdata-frontend/td-design/commit/c056e3d)) by: **chen929104** (929104662@qq.com)
* 修复gulp打包没有包含assets的问题 ([d5649a4](https://github.com/thundersdata-frontend/td-design/commit/d5649a4)) by: **chj_damon** (chjdamon@gmail.com)
* 修复ImagePie和CircularSolidPie轮播bug ([9b811f2](https://github.com/thundersdata-frontend/td-design/commit/9b811f2)) by: **qiuyan** (qqack225@gmail.com)
* 修复less文件没有被打包的问题 ([fedb659](https://github.com/thundersdata-frontend/td-design/commit/fedb659)) by: **chj_damon** (chjdamon@gmail.com)
* 修复rating报错 ([54ce18e](https://github.com/thundersdata-frontend/td-design/commit/54ce18e)) by: **chj_damon** (chjdamon@gmail.com)
* 修复一些代码引用的bug ([9b46ebc](https://github.com/thundersdata-frontend/td-design/commit/9b46ebc)) by: **chj_damon** (chjdamon@gmail.com)
* 修复不支持解构引入的问题 ([687275e](https://github.com/thundersdata-frontend/td-design/commit/687275e)) by: **chj_damon** (chjdamon@gmail.com)
* 修复格式问题 ([8ffa9f2](https://github.com/thundersdata-frontend/td-design/commit/8ffa9f2)) by: **qiuyan** (qqack225@gmail.com)
* 调整数据类型,修复字体问题,修复基础环图 ([352d2db](https://github.com/thundersdata-frontend/td-design/commit/352d2db)) by: **rxs-michael** (ruanxusong@thundersdata.com)


### 📝 Documentation

* 补充 react-native-amap-search文档 ([17bcc79](https://github.com/thundersdata-frontend/td-design/commit/17bcc79)) by: **chen929104** (929104662@qq.com)



# [1.15.0](https://github.com/thundersdata-frontend/td-design/compare/v1.14.0...v1.15.0) (2021-08-30)


### ♻ Code Refactoring

* 3d饼图优化: 支持传入props配置图表 ([3d60f1c](https://github.com/thundersdata-frontend/td-design/commit/3d60f1c)) by: **qiuyan** (qqack225@gmail.com)
* 修改mergeConfig为lodash中的merge ([ded8003](https://github.com/thundersdata-frontend/td-design/commit/ded8003)) by: **qiuyan** (qqack225@gmail.com)


### ✨ Features

* 3d饼图添加是否打平属性 ([567acd5](https://github.com/thundersdata-frontend/td-design/commit/567acd5)) by: **qiuyan** (qqack225@gmail.com)
* 3d饼图添加轮播和table优化 ([1b19a2f](https://github.com/thundersdata-frontend/td-design/commit/1b19a2f)) by: **qiuyan** (qqack225@gmail.com)
* modal弹窗的content支持ReactNode ([6843849](https://github.com/thundersdata-frontend/td-design/commit/6843849)) by: **qiuyan** (qqack225@gmail.com)
* 增加config扩展以及多折线图颜色优化 ([e9599dd](https://github.com/thundersdata-frontend/td-design/commit/e9599dd)) by: **hss** (2274246770@qq.com)
* 增加对pickitem组件disabled状态的支持 ([e52e48f](https://github.com/thundersdata-frontend/td-design/commit/e52e48f)) by: **hss** (2274246770@qq.com)
* 支持多折线图 ([99f4374](https://github.com/thundersdata-frontend/td-design/commit/99f4374)) by: **hss** (2274246770@qq.com)
* 给带图片饼图增加轮播效果 ([416d787](https://github.com/thundersdata-frontend/td-design/commit/416d787)) by: **hss** (2274246770@qq.com)


### 🎫 Chores

* bump version ([e4ce297](https://github.com/thundersdata-frontend/td-design/commit/e4ce297)) by: **chj_damon** (chjdamon@gmail.com)
* 删除多余代码 ([4d52d21](https://github.com/thundersdata-frontend/td-design/commit/4d52d21)) by: **chen929104** (929104662@qq.com)


### 🐛 Bug Fixes

* 修复require在esm模式下报错的问题 ([96075b6](https://github.com/thundersdata-frontend/td-design/commit/96075b6)) by: **chj_damon** (chjdamon@gmail.com)
* 修复svgicon-cli生成图标命令不正确的问题 ([c87cd76](https://github.com/thundersdata-frontend/td-design/commit/c87cd76)) by: **chj_damon** (chjdamon@gmail.com)
* 修复条形图不显示单位的问题 ([6dc0363](https://github.com/thundersdata-frontend/td-design/commit/6dc0363)) by: **chj_damon** (chjdamon@gmail.com)
* 合并代码 ([87c5cd4](https://github.com/thundersdata-frontend/td-design/commit/87c5cd4)) by: **qiuyan** (qqack225@gmail.com)
* 导出ThemeProvider和theme ([0f54d07](https://github.com/thundersdata-frontend/td-design/commit/0f54d07)) by: **chj_damon** (chjdamon@gmail.com)
* 调整类型 ([d342a18](https://github.com/thundersdata-frontend/td-design/commit/d342a18)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整类型 ([1add1a2](https://github.com/thundersdata-frontend/td-design/commit/1add1a2)) by: **rxs-michael** (ruanxusong@thundersdata.com)



# [1.14.0](https://github.com/thundersdata-frontend/td-design/compare/v1.13.0...v1.14.0) (2021-08-18)


### ♻ Code Refactoring

* 仪表盘重构 ([9212450](https://github.com/thundersdata-frontend/td-design/commit/9212450)) by: **chenyingjie** (929104662@qq.com)
* 修改名称 ([964910b](https://github.com/thundersdata-frontend/td-design/commit/964910b)) by: **chen929104** (929104662@qq.com)
* 修改名称 ([d3306aa](https://github.com/thundersdata-frontend/td-design/commit/d3306aa)) by: **chen929104** (929104662@qq.com)
* 实现主题以及自定义主题功能 ([b0c1f38](https://github.com/thundersdata-frontend/td-design/commit/b0c1f38)) by: **chj_damon** (chjdamon@gmail.com)
* 调整图表分类的先后顺序 ([cee458e](https://github.com/thundersdata-frontend/td-design/commit/cee458e)) by: **chj_damon** (chjdamon@gmail.com)


### ✨ Features

* 仪表盘 ([0b53298](https://github.com/thundersdata-frontend/td-design/commit/0b53298)) by: **chenyingjie** (929104662@qq.com)
* 修复打包出来后样式不生效问题 ([005f70d](https://github.com/thundersdata-frontend/td-design/commit/005f70d)) by: **hss** (2274246770@qq.com)
* 增加3D立体饼图 ([2836fec](https://github.com/thundersdata-frontend/td-design/commit/2836fec)) by: **qiuyan** (qqack225@gmail.com)
* 增加basepie的轮播 ([000f27d](https://github.com/thundersdata-frontend/td-design/commit/000f27d)) by: **chen929104** (929104662@qq.com)
* 增加tooltip效果 ([3471205](https://github.com/thundersdata-frontend/td-design/commit/3471205)) by: **hss** (2274246770@qq.com)
* 增加文字滚动 ([6066f0f](https://github.com/thundersdata-frontend/td-design/commit/6066f0f)) by: **hss** (2274246770@qq.com)
* 增加轮播图组件hover时停止滚动的效果以及补充例子 ([1de7d57](https://github.com/thundersdata-frontend/td-design/commit/1de7d57)) by: **hss** (2274246770@qq.com)
* 数据展示1 ([e9f983c](https://github.com/thundersdata-frontend/td-design/commit/e9f983c)) by: **chenyingjie** (929104662@qq.com)
* 数据展示2 ([734dc30](https://github.com/thundersdata-frontend/td-design/commit/734dc30)) by: **chenyingjie** (929104662@qq.com)
* 新增直角坐标系散点图 ([fb531cd](https://github.com/thundersdata-frontend/td-design/commit/fb531cd)) by: **chj_damon** (chjdamon@gmail.com)
* 新增轮播图和视频组件 ([13f32d9](https://github.com/thundersdata-frontend/td-design/commit/13f32d9)) by: **hss** (2274246770@qq.com)
* 添加table的speed熟悉和颜色调整 ([0c55a97](https://github.com/thundersdata-frontend/td-design/commit/0c55a97)) by: **qiuyan** (qqack225@gmail.com)
* 添加table的speed熟悉和颜色调整 ([29de8ac](https://github.com/thundersdata-frontend/td-design/commit/29de8ac)) by: **qiuyan** (qqack225@gmail.com)
* 添加立体环形饼图 ([278b22c](https://github.com/thundersdata-frontend/td-design/commit/278b22c)) by: **qiuyan** (qqack225@gmail.com)
* 添加表格组件 ([757dfb2](https://github.com/thundersdata-frontend/td-design/commit/757dfb2)) by: **qiuyan** (qqack225@gmail.com)
* 调整柱状图的tooltip样式 ([05b65b2](https://github.com/thundersdata-frontend/td-design/commit/05b65b2)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* 修改一些文档内容 ([2cd3787](https://github.com/thundersdata-frontend/td-design/commit/2cd3787)) by: **chj_damon** (chjdamon@gmail.com)
* 修改颜色样式 ([14680dd](https://github.com/thundersdata-frontend/td-design/commit/14680dd)) by: **陈英杰** (13487079308@163.com)
* 删除多余代码 ([45960d5](https://github.com/thundersdata-frontend/td-design/commit/45960d5)) by: **chenyingjie** (929104662@qq.com)
* 解决冲突 ([c04d62e](https://github.com/thundersdata-frontend/td-design/commit/c04d62e)) by: **chenyingjie** (929104662@qq.com)
* 解决冲突 ([de1b24a](https://github.com/thundersdata-frontend/td-design/commit/de1b24a)) by: **chenyingjie** (929104662@qq.com)


### 🐛 Bug Fixes

* swipeRow 新增 style 属性 ([d6323b3](https://github.com/thundersdata-frontend/td-design/commit/d6323b3)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* update ([ddbd8e4](https://github.com/thundersdata-frontend/td-design/commit/ddbd8e4)) by: **hss** (2274246770@qq.com)
* update ([137f072](https://github.com/thundersdata-frontend/td-design/commit/137f072)) by: **hss** (2274246770@qq.com)
* 优化hooks ([a2e0e09](https://github.com/thundersdata-frontend/td-design/commit/a2e0e09)) by: **chj_damon** (chjdamon@gmail.com)
* 修复 android 滚动时 swipe-row 有底边 bug ([92fff4d](https://github.com/thundersdata-frontend/td-design/commit/92fff4d)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复 echarts 注册形状失败问题 ([edeaf26](https://github.com/thundersdata-frontend/td-design/commit/edeaf26)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复 SwipeRow 在安卓端无法点击操作按钮,调整删除逻辑 ([040b0ae](https://github.com/thundersdata-frontend/td-design/commit/040b0ae)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复dumi启动时echarts报错的问题 ([011a61d](https://github.com/thundersdata-frontend/td-design/commit/011a61d)) by: **chj_damon** (chjdamon@gmail.com)
* 修复xAxisData类型错误的问题 ([1cb174d](https://github.com/thundersdata-frontend/td-design/commit/1cb174d)) by: **chj_damon** (chjdamon@gmail.com)
* 修复安卓端 swipe-row 删除后有残留 bug ([b3cdc99](https://github.com/thundersdata-frontend/td-design/commit/b3cdc99)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 切换新的打包方式并修改打包报错 ([a5a17b0](https://github.com/thundersdata-frontend/td-design/commit/a5a17b0)) by: **chj_damon** (chjdamon@gmail.com)
* 删除暂时不需要的属性 ([094afa7](https://github.com/thundersdata-frontend/td-design/commit/094afa7)) by: **chj_damon** (chjdamon@gmail.com)
* 调整 echarts 类型 ([4898b3a](https://github.com/thundersdata-frontend/td-design/commit/4898b3a)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整删除按钮写法 ([bf2875b](https://github.com/thundersdata-frontend/td-design/commit/bf2875b)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整属性 ([67c9d45](https://github.com/thundersdata-frontend/td-design/commit/67c9d45)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整按钮宽度 ([a0f3401](https://github.com/thundersdata-frontend/td-design/commit/a0f3401)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整操作按钮宽度 ([752b67d](https://github.com/thundersdata-frontend/td-design/commit/752b67d)) by: **rxs-michael** (ruanxusong@thundersdata.com)


### 💄 Styles

* 表格字体样式优化 ([d5dfa2e](https://github.com/thundersdata-frontend/td-design/commit/d5dfa2e)) by: **qiuyan** (qqack225@gmail.com)


### 📝 Documentation

* 修改文档 ([62096de](https://github.com/thundersdata-frontend/td-design/commit/62096de)) by: **chenyingjie** (929104662@qq.com)
* 修改文档 ([6eb242d](https://github.com/thundersdata-frontend/td-design/commit/6eb242d)) by: **chenyingjie** (929104662@qq.com)
* 切换开源协议为Apache 2.0 ([e48a28b](https://github.com/thundersdata-frontend/td-design/commit/e48a28b)) by: **chj_damon** (chjdamon@gmail.com)



# [1.13.0](https://github.com/thundersdata-frontend/td-design/compare/v1.12.0...v1.13.0) (2021-08-05)


### ✨ Features

* 增加带图片的饼图和玫瑰图 ([a267c99](https://github.com/thundersdata-frontend/td-design/commit/a267c99)) by: **hss** (2274246770@qq.com)
* 实现进度条图 ([13eec74](https://github.com/thundersdata-frontend/td-design/commit/13eec74)) by: **chj_damon** (chjdamon@gmail.com)
* 新增词云图 ([4913ebf](https://github.com/thundersdata-frontend/td-design/commit/4913ebf)) by: **chj_damon** (chjdamon@gmail.com)
* 环型图 ([3cb3792](https://github.com/thundersdata-frontend/td-design/commit/3cb3792)) by: **chenyingjie** (929104662@qq.com)
* 调整饼图的背景图为动图 ([22d8057](https://github.com/thundersdata-frontend/td-design/commit/22d8057)) by: **hss** (2274246770@qq.com)


### 🎫 Chores

* 删除多余代码 ([b9a666a](https://github.com/thundersdata-frontend/td-design/commit/b9a666a)) by: **chenyingjie** (929104662@qq.com)


### 🐛 Bug Fixes

* labelStyle 调整属性 ([3bb5e08](https://github.com/thundersdata-frontend/td-design/commit/3bb5e08)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* textArea 组件新增 fullBorder,labelStyle 属性 ([a26777a](https://github.com/thundersdata-frontend/td-design/commit/a26777a)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 修复TextArea数据没有回填的问题 ([4de1a5c](https://github.com/thundersdata-frontend/td-design/commit/4de1a5c)) by: **chj_damon** (chjdamon@gmail.com)
* 修复进度条图尾部没有圆点的bug ([719b3af](https://github.com/thundersdata-frontend/td-design/commit/719b3af)) by: **chj_damon** (chjdamon@gmail.com)
* 删除多余代码 ([e6dc516](https://github.com/thundersdata-frontend/td-design/commit/e6dc516)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 设置饼图的legend可以选中 ([4192921](https://github.com/thundersdata-frontend/td-design/commit/4192921)) by: **hss** (2274246770@qq.com)
* 调整 TextArea ([ce276aa](https://github.com/thundersdata-frontend/td-design/commit/ce276aa)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整写法 ([f6988ce](https://github.com/thundersdata-frontend/td-design/commit/f6988ce)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整类型 ([a1c716e](https://github.com/thundersdata-frontend/td-design/commit/a1c716e)) by: **rxs-michael** (ruanxusong@thundersdata.com)



# [1.12.0](https://github.com/thundersdata-frontend/td-design/compare/v1.11.0...v1.12.0) (2021-08-05)


### ♻ Code Refactoring

* 优化饼图示例代码 ([49aea62](https://github.com/thundersdata-frontend/td-design/commit/49aea62)) by: **chj_damon** (chjdamon@gmail.com)
* 使用方法创建渐变色,支持配置横向或者纵向 ([d3732e8](https://github.com/thundersdata-frontend/td-design/commit/d3732e8)) by: **chj_damon** (chjdamon@gmail.com)
* 删除PieChart ([447bd0b](https://github.com/thundersdata-frontend/td-design/commit/447bd0b)) by: **chj_damon** (chjdamon@gmail.com)
* 拆分属性配置 ([ac50b13](https://github.com/thundersdata-frontend/td-design/commit/ac50b13)) by: **chj_damon** (chjdamon@gmail.com)


### ✨ Features

* 为图表补充更多的示例 ([4a4a7bd](https://github.com/thundersdata-frontend/td-design/commit/4a4a7bd)) by: **chj_damon** (chjdamon@gmail.com)
* 初始化主题配置以及柱状图 ([c45415f](https://github.com/thundersdata-frontend/td-design/commit/c45415f)) by: **chj_damon** (chjdamon@gmail.com)
* 图表组件库CustomTable和AutoVerticalRoll更新 ([bbe0253](https://github.com/thundersdata-frontend/td-design/commit/bbe0253)) by: **qiuyan** (qqack225@gmail.com)
* 多边形内检索的POI ([9442183](https://github.com/thundersdata-frontend/td-design/commit/9442183)) by: **chenyingjie** (929104662@qq.com)
* 完成柱图4第一版开发（未带tooltip） ([b37ef23](https://github.com/thundersdata-frontend/td-design/commit/b37ef23)) by: **chj_damon** (chjdamon@gmail.com)
* 完成象形柱状图 ([396b24d](https://github.com/thundersdata-frontend/td-design/commit/396b24d)) by: **chj_damon** (chjdamon@gmail.com)
* 新增其他-雷达图 ([10278a6](https://github.com/thundersdata-frontend/td-design/commit/10278a6)) by: **hss** (2274246770@qq.com)
* 新增叠片柱状图组件 ([908ea14](https://github.com/thundersdata-frontend/td-design/commit/908ea14)) by: **chj_damon** (chjdamon@gmail.com)
* 新增对比柱状图和阴影柱状图 ([5a9e4e6](https://github.com/thundersdata-frontend/td-design/commit/5a9e4e6)) by: **chj_damon** (chjdamon@gmail.com)
* 新增带图片的线图 ([35855fd](https://github.com/thundersdata-frontend/td-design/commit/35855fd)) by: **hss** (2274246770@qq.com)
* 新增折线图1 ([bd3142d](https://github.com/thundersdata-frontend/td-design/commit/bd3142d)) by: **hss** (2274246770@qq.com)
* 新增条形图组件 ([e43103c](https://github.com/thundersdata-frontend/td-design/commit/e43103c)) by: **chj_damon** (chjdamon@gmail.com)
* 新增条形对比图 ([c324cec](https://github.com/thundersdata-frontend/td-design/commit/c324cec)) by: **chj_damon** (chjdamon@gmail.com)
* 新增沿途搜索 ([37f1388](https://github.com/thundersdata-frontend/td-design/commit/37f1388)) by: **chenyingjie** (929104662@qq.com)
* 补充更多例子 ([589e2d4](https://github.com/thundersdata-frontend/td-design/commit/589e2d4)) by: **hss** (2274246770@qq.com)
* 调整example 结构，新增关键字搜索 ([adf2578](https://github.com/thundersdata-frontend/td-design/commit/adf2578)) by: **chenyingjie** (929104662@qq.com)


### 🎫 Chores

* 尝试修复线上环境自动部署失败的问题 ([04d5587](https://github.com/thundersdata-frontend/td-design/commit/04d5587)) by: **chj_damon** (chjdamon@gmail.com)
* 尝试修复线上环境自动部署失败的问题 ([059b9ed](https://github.com/thundersdata-frontend/td-design/commit/059b9ed)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* 优化清除按钮的显示位置 ([d5c07ee](https://github.com/thundersdata-frontend/td-design/commit/d5c07ee)) by: **chj_damon** (chjdamon@gmail.com)
* 使用自定义系列实现圆柱图 ([e096c0b](https://github.com/thundersdata-frontend/td-design/commit/e096c0b)) by: **chj_damon** (chjdamon@gmail.com)
* 修复柱状图4注释错误 ([346f648](https://github.com/thundersdata-frontend/td-design/commit/346f648)) by: **chj_damon** (chjdamon@gmail.com)
* 修改两个组件的主题色的渐变使用方式 ([f141908](https://github.com/thundersdata-frontend/td-design/commit/f141908)) by: **chj_damon** (chjdamon@gmail.com)
* 修改柱线混合图的文档title ([8f38a8d](https://github.com/thundersdata-frontend/td-design/commit/8f38a8d)) by: **chj_damon** (chjdamon@gmail.com)
* 修改注释 ([3e5f48e](https://github.com/thundersdata-frontend/td-design/commit/3e5f48e)) by: **hss** (2274246770@qq.com)



# [1.11.0](https://github.com/thundersdata-frontend/td-design/compare/v1.10.0...v1.11.0) (2021-07-30)


### ✨ Features

* 周边检索POI ([fda8768](https://github.com/thundersdata-frontend/td-design/commit/fda8768)) by: **chenyingjie** (929104662@qq.com)
* 搭建大屏素材库环境 ([812e0ee](https://github.com/thundersdata-frontend/td-design/commit/812e0ee)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 新增高德搜索rn组件环境 ([952c2e6](https://github.com/thundersdata-frontend/td-design/commit/952c2e6)) by: **chenyingjie** (929104662@qq.com)
* 补充配置背景色的例子 ([6ffaaff](https://github.com/thundersdata-frontend/td-design/commit/6ffaaff)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* 优化lint-staged配置 ([f8387f6](https://github.com/thundersdata-frontend/td-design/commit/f8387f6)) by: **chj_damon** (chjdamon@gmail.com)
* 优化代码提交时的校验 ([a628d92](https://github.com/thundersdata-frontend/td-design/commit/a628d92)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([6fb4cdb](https://github.com/thundersdata-frontend/td-design/commit/6fb4cdb)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* 为Avatar组件增加关闭加载过程的属性 ([19e9e56](https://github.com/thundersdata-frontend/td-design/commit/19e9e56)) by: **chj_damon** (chjdamon@gmail.com)
* 为ListItem组件增加圆角 ([c6aae9f](https://github.com/thundersdata-frontend/td-design/commit/c6aae9f)) by: **chj_damon** (chjdamon@gmail.com)
* 优化图标组件 ([4dee3f9](https://github.com/thundersdata-frontend/td-design/commit/4dee3f9)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Image组件显示加载状态的问题 ([41768b5](https://github.com/thundersdata-frontend/td-design/commit/41768b5)) by: **chj_damon** (chjdamon@gmail.com)
* 修复mode=datetime时时分的最小值不起作用的问题 ([6ec9a96](https://github.com/thundersdata-frontend/td-design/commit/6ec9a96)) by: **chj_damon** (chjdamon@gmail.com)
* 修复弹窗没有设置圆角的问题 ([3986f3c](https://github.com/thundersdata-frontend/td-design/commit/3986f3c)) by: **chj_damon** (chjdamon@gmail.com)
* 修复有些组件没有导出类型的问题 ([ab300af](https://github.com/thundersdata-frontend/td-design/commit/ab300af)) by: **chj_damon** (chjdamon@gmail.com)
* 修复重新刷新时pullrefresh组件没有回到顶部的问题 ([182a672](https://github.com/thundersdata-frontend/td-design/commit/182a672)) by: **chj_damon** (chjdamon@gmail.com)



# [1.10.0](https://github.com/thundersdata-frontend/td-design/compare/v1.9.0...v1.10.0) (2021-07-26)


### ✨ Features

* 图片选择组件支持预览和删除功能 ([db1fec1](https://github.com/thundersdata-frontend/td-design/commit/db1fec1)) by: **chj_damon** (chjdamon@gmail.com)



# [1.9.0](https://github.com/thundersdata-frontend/td-design/compare/v1.8.0...v1.9.0) (2021-07-26)


### ✨ Features

* listItem增加整行点击效果 ([3a858af](https://github.com/thundersdata-frontend/td-design/commit/3a858af)) by: **qiuyan** (qqack225@gmail.com)
* 下拉刷新组件支持AnimateHeader ([714070f](https://github.com/thundersdata-frontend/td-design/commit/714070f)) by: **chj_damon** (chjdamon@gmail.com)
* 更新listItem点击效果 ([74a5707](https://github.com/thundersdata-frontend/td-design/commit/74a5707)) by: **qiuyan** (qqack225@gmail.com)


### 🎫 Chores

* bump to 3.4.5 ([58a6351](https://github.com/thundersdata-frontend/td-design/commit/58a6351)) by: **chj_damon** (chjdamon@gmail.com)



# [1.8.0](https://github.com/thundersdata-frontend/td-design/compare/v1.7.8...v1.8.0) (2021-07-26)


### ✨ Features

* 初始化svgicon-cli工具代码 ([c4faf45](https://github.com/thundersdata-frontend/td-design/commit/c4faf45)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* bump react-native-picker version ([18d9287](https://github.com/thundersdata-frontend/td-design/commit/18d9287)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* 修复一些编译和发包时的问题 ([e52ce77](https://github.com/thundersdata-frontend/td-design/commit/e52ce77)) by: **chj_damon** (chjdamon@gmail.com)
* 修复发现的问题 ([87aa4e0](https://github.com/thundersdata-frontend/td-design/commit/87aa4e0)) by: **chj_damon** (chjdamon@gmail.com)
* 修改因组件库组件修改影响到的其他组件 ([1aaf8d9](https://github.com/thundersdata-frontend/td-design/commit/1aaf8d9)) by: **chj_damon** (chjdamon@gmail.com)
* 重新生成SvgIcon以及修复svgicon-cli的一些bug ([eceebab](https://github.com/thundersdata-frontend/td-design/commit/eceebab)) by: **chj_damon** (chjdamon@gmail.com)



## [1.7.8](https://github.com/thundersdata-frontend/td-design/compare/v1.7.7...v1.7.8) (2021-07-22)


### 🐛 Bug Fixes

* 修复Iconfont颜色没有引号导致报错的问题 ([d62887c](https://github.com/thundersdata-frontend/td-design/commit/d62887c)) by: **chj_damon** (chjdamon@gmail.com)
* 修改datePicker minDate显示问题 ([4a3d078](https://github.com/thundersdata-frontend/td-design/commit/4a3d078)) by: **chenyingjie** (929104662@qq.com)



## [1.7.7](https://github.com/thundersdata-frontend/td-design/compare/v1.7.6...v1.7.7) (2021-07-22)


### ♻ Code Refactoring

* 优化Iconfont组件默认大小 ([0607284](https://github.com/thundersdata-frontend/td-design/commit/0607284)) by: **chj_damon** (chjdamon@gmail.com)


### 🎫 Chores

* bump ([9defd68](https://github.com/thundersdata-frontend/td-design/commit/9defd68)) by: **chj_damon** (chjdamon@gmail.com)


### 💄 Styles

* NoticeBar组件添加style属性 ([f7e6585](https://github.com/thundersdata-frontend/td-design/commit/f7e6585)) by: **qiuyan** (qqack225@gmail.com)



## [1.7.6](https://github.com/thundersdata-frontend/td-design/compare/v1.7.5...v1.7.6) (2021-07-21)


### ♻ Code Refactoring

* 全局重构Icon组件，用svg代替字体文件 ([55c54b7](https://github.com/thundersdata-frontend/td-design/commit/55c54b7)) by: **chj_damon** (chjdamon@gmail.com)



## [1.7.5](https://github.com/thundersdata-frontend/td-design/compare/v1.7.4...v1.7.5) (2021-07-19)


### 🎫 Chores

* 新版本 ([1e28956](https://github.com/thundersdata-frontend/td-design/commit/1e28956)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* 修复ListItem没有padding的问题 ([1916403](https://github.com/thundersdata-frontend/td-design/commit/1916403)) by: **chj_damon** (chjdamon@gmail.com)
* 修复prompt组件没有输入的情况下点击确定按钮无反应的问题 ([4581273](https://github.com/thundersdata-frontend/td-design/commit/4581273)) by: **chj_damon** (chjdamon@gmail.com)



## [1.7.4](https://github.com/thundersdata-frontend/td-design/compare/v1.7.3...v1.7.4) (2021-07-18)


### 🐛 Bug Fixes

* 修复ListItem组件的显示bug ([2b4b769](https://github.com/thundersdata-frontend/td-design/commit/2b4b769)) by: **chj_damon** (chjdamon@gmail.com)



## [1.7.3](https://github.com/thundersdata-frontend/td-design/compare/v1.7.2...v1.7.3) (2021-07-18)


### 🎫 Chores

* 用TouchableWithoutFeedback更合适 ([70a0b51](https://github.com/thundersdata-frontend/td-design/commit/70a0b51)) by: **chj_damon** (chjdamon@gmail.com)



## [1.7.2](https://github.com/thundersdata-frontend/td-design/compare/v1.7.1...v1.7.2) (2021-07-17)


### ♻ Code Refactoring

* 调整点击透明度统一为0.5/ 优化ListItem组件/ 重构Tag组件 ([f470c32](https://github.com/thundersdata-frontend/td-design/commit/f470c32)) by: **chj_damon** (chjdamon@gmail.com)



## [1.7.1](https://github.com/thundersdata-frontend/td-design/compare/v1.7.0...v1.7.1) (2021-07-16)


### 🐛 Bug Fixes

* 修复日期段选择组件不显示清除按钮以及format没有默认值的问题 ([a826c09](https://github.com/thundersdata-frontend/td-design/commit/a826c09)) by: **chj_damon** (chjdamon@gmail.com)



# [1.7.0](https://github.com/thundersdata-frontend/td-design/compare/v1.6.7...v1.7.0) (2021-07-15)


### ✨ Features

* 为PullRefresh组件增加默认加载的功能 ([b29e3dc](https://github.com/thundersdata-frontend/td-design/commit/b29e3dc)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.7](https://github.com/thundersdata-frontend/td-design/compare/v1.6.6...v1.6.7) (2021-07-15)


### 🎫 Chores

* 删除console.log ([6611d2e](https://github.com/thundersdata-frontend/td-design/commit/6611d2e)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* 优化图片上传体验 ([1b54b79](https://github.com/thundersdata-frontend/td-design/commit/1b54b79)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.6](https://github.com/thundersdata-frontend/td-design/compare/v1.6.5...v1.6.6) (2021-07-15)


### 🐛 Bug Fixes

* 修复Picker组件回显数据时的问题 ([eefdc54](https://github.com/thundersdata-frontend/td-design/commit/eefdc54)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.5](https://github.com/thundersdata-frontend/td-design/compare/v1.6.4...v1.6.5) (2021-07-14)


### 🐛 Bug Fixes

* 修复upload的类型定义问题 ([4f3b02b](https://github.com/thundersdata-frontend/td-design/commit/4f3b02b)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.4](https://github.com/thundersdata-frontend/td-design/compare/v1.6.3...v1.6.4) (2021-07-14)


### 🐛 Bug Fixes

* 修复图片组件回显问题 ([a453d71](https://github.com/thundersdata-frontend/td-design/commit/a453d71)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.3](https://github.com/thundersdata-frontend/td-design/compare/v1.6.2...v1.6.3) (2021-07-14)


### 🐛 Bug Fixes

* 修复NumberKeyboard小数太长的问题 ([3b37f91](https://github.com/thundersdata-frontend/td-design/commit/3b37f91)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.2](https://github.com/thundersdata-frontend/td-design/compare/v1.6.1...v1.6.2) (2021-07-14)


### 🐛 Bug Fixes

* 优化Input和NumberKeyboard组件的显示效果 ([e87281f](https://github.com/thundersdata-frontend/td-design/commit/e87281f)) by: **chj_damon** (chjdamon@gmail.com)



## [1.6.1](https://github.com/thundersdata-frontend/td-design/compare/v1.6.0...v1.6.1) (2021-07-14)


### 🐛 Bug Fixes

* 新增NumberKeyboardFilter组件 ([50ca43a](https://github.com/thundersdata-frontend/td-design/commit/50ca43a)) by: **chj_damon** (chjdamon@gmail.com)



# [1.6.0](https://github.com/thundersdata-frontend/td-design/compare/v1.5.0...v1.6.0) (2021-07-14)


### ♻ Code Refactoring

* table组件增加自定义empty组件 ([98eaaa6](https://github.com/thundersdata-frontend/td-design/commit/98eaaa6)) by: **chenyingjie** (13487079308@163.com)
* 修改image组件可以选择是否loadding ([1ef72a5](https://github.com/thundersdata-frontend/td-design/commit/1ef72a5)) by: **chenyingjie** (929104662@qq.com)
* 修改table组件样式 ([032a5dd](https://github.com/thundersdata-frontend/td-design/commit/032a5dd)) by: **chenyingjie** (13487079308@163.com)
* 修改组件写法以支持按需加载功能 ([4a4b26e](https://github.com/thundersdata-frontend/td-design/commit/4a4b26e)) by: **chj_damon** (chjdamon@gmail.com)
* 升级dumi到最新版本 ([e79a001](https://github.com/thundersdata-frontend/td-design/commit/e79a001)) by: **chj_damon** (chjdamon@gmail.com)
* 基于最新的组件规范对代码样式进行重构 ([105a1bf](https://github.com/thundersdata-frontend/td-design/commit/105a1bf)) by: **chj_damon** (chjdamon@gmail.com)
* 完善组件库主题效果 ([5b2790d](https://github.com/thundersdata-frontend/td-design/commit/5b2790d)) by: **chj_damon** (chjdamon@gmail.com)
* 移除对lodash的使用 ([6ed0362](https://github.com/thundersdata-frontend/td-design/commit/6ed0362)) by: **chj_damon** (chjdamon@gmail.com)
* 解决冲突 ([72b25ff](https://github.com/thundersdata-frontend/td-design/commit/72b25ff)) by: **chenyingjie** (13487079308@163.com)
* 重新定义主题中的spacing和borderRadii ([92e5aa2](https://github.com/thundersdata-frontend/td-design/commit/92e5aa2)) by: **chj_damon** (chjdamon@gmail.com)
* 重新构造example示例测试原生组件情况 ([569bb97](https://github.com/thundersdata-frontend/td-design/commit/569bb97)) by: **chj_damon** (chjdamon@gmail.com)
* 重构Badge组件 ([0f3d37d](https://github.com/thundersdata-frontend/td-design/commit/0f3d37d)) by: **hss** (2274246770@qq.com)
* 重构datePicker组件 ([bdefba6](https://github.com/thundersdata-frontend/td-design/commit/bdefba6)) by: **chj_damon** (chjdamon@gmail.com)
* 重构Modal组件 ([0ad522b](https://github.com/thundersdata-frontend/td-design/commit/0ad522b)) by: **chj_damon** (chjdamon@gmail.com)


### ✨ Features

* countDown组件完成 ([3657c4a](https://github.com/thundersdata-frontend/td-design/commit/3657c4a)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* imageHeader组件增加headerTitle属性 ([f4441e0](https://github.com/thundersdata-frontend/td-design/commit/f4441e0)) by: **hss** (2274246770@qq.com)
* picker组件库新增若干组件 ([5c8741b](https://github.com/thundersdata-frontend/td-design/commit/5c8741b)) by: **chj_damon** (chjdamon@gmail.com)
* 为验证码组件增加自动聚焦的功能 ([c129177](https://github.com/thundersdata-frontend/td-design/commit/c129177)) by: **chj_damon** (chjdamon@gmail.com)
* 主题增加TextVariant说明 ([b5d2b3b](https://github.com/thundersdata-frontend/td-design/commit/b5d2b3b)) by: **chj_damon** (chjdamon@gmail.com)
* 从react-native组件库中抽离share组件 ([ef3813c](https://github.com/thundersdata-frontend/td-design/commit/ef3813c)) by: **hss** (2274246770@qq.com)
* 优化tooltip组件 ([f0a9dbf](https://github.com/thundersdata-frontend/td-design/commit/f0a9dbf)) by: **qiuyan** (qqack225@gmail.com)
* 修改ListItem的brief传递组件的类型 ([ee49288](https://github.com/thundersdata-frontend/td-design/commit/ee49288)) by: **qiuyan** (qqack225@gmail.com)
* 倒计时组件支持边框模式 ([827c27e](https://github.com/thundersdata-frontend/td-design/commit/827c27e)) by: **chj_damon** (chjdamon@gmail.com)
* 初始化picker的example环境 ([4d5b765](https://github.com/thundersdata-frontend/td-design/commit/4d5b765)) by: **chj_damon** (chjdamon@gmail.com)
* 初始化reanimated2环境 ([07b70cc](https://github.com/thundersdata-frontend/td-design/commit/07b70cc)) by: **chj_damon** (chjdamon@gmail.com)
* 升级其他组件到reanimated2 ([964d039](https://github.com/thundersdata-frontend/td-design/commit/964d039)) by: **chj_damon** (chjdamon@gmail.com)
* 合并tooltip代码 ([31e3af0](https://github.com/thundersdata-frontend/td-design/commit/31e3af0)) by: **qiuyan** (qqack225@gmail.com)
* 合并最新代码 ([fd16749](https://github.com/thundersdata-frontend/td-design/commit/fd16749)) by: **qiuyan** (qqack225@gmail.com)
* 增加react-native-calendar包 ([d90e27e](https://github.com/thundersdata-frontend/td-design/commit/d90e27e)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 增加tree组件下拉动画 ([febe0ec](https://github.com/thundersdata-frontend/td-design/commit/febe0ec)) by: **chenyingjie** (929104662@qq.com)
* 增加验证码发送前校验功能 ([c8c6cd6](https://github.com/thundersdata-frontend/td-design/commit/c8c6cd6)) by: **chj_damon** (chjdamon@gmail.com)
* 完善CountDown组件 ([a2ab3b3](https://github.com/thundersdata-frontend/td-design/commit/a2ab3b3)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 完成refreshView组件的安卓部分 ([65e8f97](https://github.com/thundersdata-frontend/td-design/commit/65e8f97)) by: **chj_damon** (chjdamon@gmail.com)
* 完成自定义刷新组件 ([bab4222](https://github.com/thundersdata-frontend/td-design/commit/bab4222)) by: **chj_damon** (chjdamon@gmail.com)
* 对tabs、image-picker、password、rating等组件进行抽离 ([fcd7e9e](https://github.com/thundersdata-frontend/td-design/commit/fcd7e9e)) by: **hss** (2274246770@qq.com)
* 导出useTheme ([ce50b7c](https://github.com/thundersdata-frontend/td-design/commit/ce50b7c)) by: **chj_damon** (chjdamon@gmail.com)
* 把Picker抽离成单独组件 ([b5f3eec](https://github.com/thundersdata-frontend/td-design/commit/b5f3eec)) by: **chj_damon** (chjdamon@gmail.com)
* 支持在图表初始化时注入参数 ([defb88a](https://github.com/thundersdata-frontend/td-design/commit/defb88a)) by: **chj_damon** (chjdamon@gmail.com)
* 新增calendar组件当type为period时内置选中日期段的方法 ([e34b940](https://github.com/thundersdata-frontend/td-design/commit/e34b940)) by: **hss** (2274246770@qq.com)
* 新增Menu组件和文档 ([dcfa1cc](https://github.com/thundersdata-frontend/td-design/commit/dcfa1cc)) by: **chj_damon** (chjdamon@gmail.com)
* 新增PickerItem和DatePickerItem组件 ([d7a9a33](https://github.com/thundersdata-frontend/td-design/commit/d7a9a33)) by: **chj_damon** (chjdamon@gmail.com)
* 新增react-native-refresh组件 ([36b447a](https://github.com/thundersdata-frontend/td-design/commit/36b447a)) by: **chj_damon** (chjdamon@gmail.com)
* 新增tree组件 ([6672453](https://github.com/thundersdata-frontend/td-design/commit/6672453)) by: **chenyingjie** (13487079308@163.com)
* 新增两个指示器组件 ([55286a8](https://github.com/thundersdata-frontend/td-design/commit/55286a8)) by: **chj_damon** (chjdamon@gmail.com)
* 新增图表组件 ([2bc952f](https://github.com/thundersdata-frontend/td-design/commit/2bc952f)) by: **chj_damon** (chjdamon@gmail.com)
* 新增数字输入表单组件 ([573983c](https://github.com/thundersdata-frontend/td-design/commit/573983c)) by: **chj_damon** (chjdamon@gmail.com)
* 新增表头隐藏和固定表头功能 ([8ea3da9](https://github.com/thundersdata-frontend/td-design/commit/8ea3da9)) by: **chenyingjie** (13487079308@163.com)
* 新增软件开发菜单 ([455ceca](https://github.com/thundersdata-frontend/td-design/commit/455ceca)) by: **chj_damon** (chjdamon@gmail.com)
* 暂存 ([182207f](https://github.com/thundersdata-frontend/td-design/commit/182207f)) by: **chenyingjie** (13487079308@163.com)
* 更新组件文档以及部分主题定义 ([a728212](https://github.com/thundersdata-frontend/td-design/commit/a728212)) by: **chj_damon** (chjdamon@gmail.com)
* 添加tooltip组件 ([ff45486](https://github.com/thundersdata-frontend/td-design/commit/ff45486)) by: **qiuyan** (qqack225@gmail.com)
* 组件重构 ([0fc9691](https://github.com/thundersdata-frontend/td-design/commit/0fc9691)) by: **chj_damon** (chjdamon@gmail.com)
* 补充PullRefresh文档 ([301d050](https://github.com/thundersdata-frontend/td-design/commit/301d050)) by: **chj_damon** (chjdamon@gmail.com)
* 补充rn-template说明 ([57edba6](https://github.com/thundersdata-frontend/td-design/commit/57edba6)) by: **chj_damon** (chjdamon@gmail.com)
* 补充更多的组件 ([f8c740b](https://github.com/thundersdata-frontend/td-design/commit/f8c740b)) by: **chj_damon** (chjdamon@gmail.com)
* 表单组件增加关闭键盘功能 ([b7f6be0](https://github.com/thundersdata-frontend/td-design/commit/b7f6be0)) by: **chj_damon** (chjdamon@gmail.com)
* 解决Modal.confirm没有图标问题，以及listItem缩放问题以及修复tree引入组件名大小写问题 ([68bfe70](https://github.com/thundersdata-frontend/td-design/commit/68bfe70)) by: **qiuyan** (qqack225@gmail.com)
* 调整tooltips在屏幕滚动时的展示 ([43f82c6](https://github.com/thundersdata-frontend/td-design/commit/43f82c6)) by: **qiuyan** (qqack225@gmail.com)


### 🎫 Chores

* 优化组件，增加deom ([68b3f1c](https://github.com/thundersdata-frontend/td-design/commit/68b3f1c)) by: **chenyingjie** (13487079308@163.com)
* 修改package.json里的某些配置 ([e2dfaa9](https://github.com/thundersdata-frontend/td-design/commit/e2dfaa9)) by: **chj_damon** (chjdamon@gmail.com)
* 修改tree组件 ([769c5e3](https://github.com/thundersdata-frontend/td-design/commit/769c5e3)) by: **chenyingjie** (929104662@qq.com)
* 修改本地图片不需要loading ([34f4b4c](https://github.com/thundersdata-frontend/td-design/commit/34f4b4c)) by: **chenyingjie** (929104662@qq.com)
* 删除react-native中多余代码 ([9a35ae6](https://github.com/thundersdata-frontend/td-design/commit/9a35ae6)) by: **hss** (2274246770@qq.com)
* 发布@td-design/react-native 1.3.8版本 ([cf76624](https://github.com/thundersdata-frontend/td-design/commit/cf76624)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 发布3.2.3版本 ([a37b608](https://github.com/thundersdata-frontend/td-design/commit/a37b608)) by: **chj_damon** (chjdamon@gmail.com)
* 发布3.2.7版本 ([452a6fe](https://github.com/thundersdata-frontend/td-design/commit/452a6fe)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([7c2ca2b](https://github.com/thundersdata-frontend/td-design/commit/7c2ca2b)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([69028a5](https://github.com/thundersdata-frontend/td-design/commit/69028a5)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([1082491](https://github.com/thundersdata-frontend/td-design/commit/1082491)) by: **hss** (2274246770@qq.com)
* 发布新版本 ([38a1f3b](https://github.com/thundersdata-frontend/td-design/commit/38a1f3b)) by: **hss** (2274246770@qq.com)
* 发布新版本 ([37ee4d3](https://github.com/thundersdata-frontend/td-design/commit/37ee4d3)) by: **hss** (2274246770@qq.com)
* 发布新版本 ([56b353f](https://github.com/thundersdata-frontend/td-design/commit/56b353f)) by: **hss** (2274246770@qq.com)
* 发布新版本 ([a230ae7](https://github.com/thundersdata-frontend/td-design/commit/a230ae7)) by: **hss** (2274246770@qq.com)
* 发布新版本 ([00572eb](https://github.com/thundersdata-frontend/td-design/commit/00572eb)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([f661f16](https://github.com/thundersdata-frontend/td-design/commit/f661f16)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([6c03ae7](https://github.com/thundersdata-frontend/td-design/commit/6c03ae7)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([ab35736](https://github.com/thundersdata-frontend/td-design/commit/ab35736)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([51e1cde](https://github.com/thundersdata-frontend/td-design/commit/51e1cde)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([40fac20](https://github.com/thundersdata-frontend/td-design/commit/40fac20)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([6c52a79](https://github.com/thundersdata-frontend/td-design/commit/6c52a79)) by: **chj_damon** (chjdamon@gmail.com)
* 发布新版本 ([c6b6bc0](https://github.com/thundersdata-frontend/td-design/commit/c6b6bc0)) by: **chj_damon** (chjdamon@gmail.com)
* 更新依赖版本 ([051b80e](https://github.com/thundersdata-frontend/td-design/commit/051b80e)) by: **chj_damon** (chjdamon@gmail.com)
* 添加发布新版本的文件 ([67be255](https://github.com/thundersdata-frontend/td-design/commit/67be255)) by: **hss** (2274246770@qq.com)
* 组件库不用构建，直接引源码 ([6934fe6](https://github.com/thundersdata-frontend/td-design/commit/6934fe6)) by: **chj_damon** (chjdamon@gmail.com)
* 解决冲突 ([df4f99d](https://github.com/thundersdata-frontend/td-design/commit/df4f99d)) by: **hss** (2274246770@qq.com)
* 解决冲突 ([4fbe94a](https://github.com/thundersdata-frontend/td-design/commit/4fbe94a)) by: **chenyingjie** (929104662@qq.com)
* 解决冲突 ([7ae2c1e](https://github.com/thundersdata-frontend/td-design/commit/7ae2c1e)) by: **chenyingjie** (929104662@qq.com)
* 解决冲突 ([ae81180](https://github.com/thundersdata-frontend/td-design/commit/ae81180)) by: **chenyingjie** (13487079308@163.com)
* 解决冲突 ([484c150](https://github.com/thundersdata-frontend/td-design/commit/484c150)) by: **chenyingjie** (13487079308@163.com)
* 调整Empty组件格式 ([b7d33a6](https://github.com/thundersdata-frontend/td-design/commit/b7d33a6)) by: **chj_damon** (chjdamon@gmail.com)
* 调整组件库安装依赖 ([5e8c16a](https://github.com/thundersdata-frontend/td-design/commit/5e8c16a)) by: **chj_damon** (chjdamon@gmail.com)


### 🐛 Bug Fixes

* chartDom组件支持card组件的titleStyle配置 ([0a44865](https://github.com/thundersdata-frontend/td-design/commit/0a44865)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* imageHeader的高度由必填改为非必填 ([12a254c](https://github.com/thundersdata-frontend/td-design/commit/12a254c)) by: **hss** (2274246770@qq.com)
* update comment ([ffda897](https://github.com/thundersdata-frontend/td-design/commit/ffda897)) by: **hss** (2274246770@qq.com)
* 优化PullRefresh和Toast组件 ([b14fa98](https://github.com/thundersdata-frontend/td-design/commit/b14fa98)) by: **chj_damon** (chjdamon@gmail.com)
* 优化写法 ([8480f93](https://github.com/thundersdata-frontend/td-design/commit/8480f93)) by: **hss** (2274246770@qq.com)
* 优化多个组件的用户体验问题 ([81c992e](https://github.com/thundersdata-frontend/td-design/commit/81c992e)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Accordion组件在Modal中无法展开的问题 ([c92e1ad](https://github.com/thundersdata-frontend/td-design/commit/c92e1ad)) by: **chj_damon** (chjdamon@gmail.com)
* 修复badge组件位置显示偏差问题 ([bafcff5](https://github.com/thundersdata-frontend/td-design/commit/bafcff5)) by: **hss** (2274246770@qq.com)
* 修复button组件文字不居中的问题 ([e9f9ccc](https://github.com/thundersdata-frontend/td-design/commit/e9f9ccc)) by: **chj_damon** (chjdamon@gmail.com)
* 修复calendarlist滑动块导致白屏的bug ([0cb0a06](https://github.com/thundersdata-frontend/td-design/commit/0cb0a06)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 修复cli工具安装后报错的问题 ([77862ec](https://github.com/thundersdata-frontend/td-design/commit/77862ec)) by: **chj_damon** (chjdamon@gmail.com)
* 修复cli工具无法使用的问题 ([98e689c](https://github.com/thundersdata-frontend/td-design/commit/98e689c)) by: **chj_damon** (chjdamon@gmail.com)
* 修复dumi升级到1.1.0之后构建失败的问题 ([2fe1853](https://github.com/thundersdata-frontend/td-design/commit/2fe1853)) by: **chj_damon** (chjdamon@gmail.com)
* 修复image-picker升级到最新版本后的写法问题 ([c324815](https://github.com/thundersdata-frontend/td-design/commit/c324815)) by: **chj_damon** (chjdamon@gmail.com)
* 修复ImagePicker在IOS无法多次执行的问题 ([b529c38](https://github.com/thundersdata-frontend/td-design/commit/b529c38)) by: **chj_damon** (chjdamon@gmail.com)
* 修复ImagePicker在表单中无法回显图片的问题 ([42e974f](https://github.com/thundersdata-frontend/td-design/commit/42e974f)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Indicator导出后引用报错的问题 ([c5bc3ee](https://github.com/thundersdata-frontend/td-design/commit/c5bc3ee)) by: **chj_damon** (chjdamon@gmail.com)
* 修复md样式写法问题 ([9e9d503](https://github.com/thundersdata-frontend/td-design/commit/9e9d503)) by: **chj_damon** (chjdamon@gmail.com)
* 修复NormalPicker组件选择问题 ([8f8b89b](https://github.com/thundersdata-frontend/td-design/commit/8f8b89b)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Password组件的文档描述错误 ([0c44910](https://github.com/thundersdata-frontend/td-design/commit/0c44910)) by: **chj_damon** (chjdamon@gmail.com)
* 修复picker组件没有默认导出的问题 ([52516d7](https://github.com/thundersdata-frontend/td-design/commit/52516d7)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Picker组件直接点确定时没有选中值的问题 ([88c72d3](https://github.com/thundersdata-frontend/td-design/commit/88c72d3)) by: **chj_damon** (chjdamon@gmail.com)
* 修复pull-refresh组件内Touchable*组件无法正常使用的问题 ([57b6d70](https://github.com/thundersdata-frontend/td-design/commit/57b6d70)) by: **chj_damon** (chjdamon@gmail.com)
* 修复Toast会直接把Modal关掉的问题 ([74d8c18](https://github.com/thundersdata-frontend/td-design/commit/74d8c18)) by: **chj_damon** (chjdamon@gmail.com)
* 修复value没有值时显示的不是placeholder的问题 ([8d63d16](https://github.com/thundersdata-frontend/td-design/commit/8d63d16)) by: **chj_damon** (chjdamon@gmail.com)
* 修复一些发现的bug ([d9f98d5](https://github.com/thundersdata-frontend/td-design/commit/d9f98d5)) by: **chj_damon** (chjdamon@gmail.com)
* 修复包引用源文件的问题 ([23dcca6](https://github.com/thundersdata-frontend/td-design/commit/23dcca6)) by: **chj_damon** (chjdamon@gmail.com)
* 修复发现的问题 ([06958b3](https://github.com/thundersdata-frontend/td-design/commit/06958b3)) by: **chj_damon** (chjdamon@gmail.com)
* 修复因package名称错误导致安卓启动报错的问题 ([cdaca97](https://github.com/thundersdata-frontend/td-design/commit/cdaca97)) by: **chj_damon** (chjdamon@gmail.com)
* 修复因为升级dumi版本导致构建失败的问题 ([ce4b992](https://github.com/thundersdata-frontend/td-design/commit/ce4b992)) by: **chj_damon** (chjdamon@gmail.com)
* 修复图片选择器组件的问题 ([cb532eb](https://github.com/thundersdata-frontend/td-design/commit/cb532eb)) by: **chj_damon** (chjdamon@gmail.com)
* 修复复选框全选按钮一直存在的问题 ([9c34b14](https://github.com/thundersdata-frontend/td-design/commit/9c34b14)) by: **chj_damon** (chjdamon@gmail.com)
* 修复安卓运行时报错 ([890691d](https://github.com/thundersdata-frontend/td-design/commit/890691d)) by: **chj_damon** (chjdamon@gmail.com)
* 修复循环引用的警告 ([b07899a](https://github.com/thundersdata-frontend/td-design/commit/b07899a)) by: **chj_damon** (chjdamon@gmail.com)
* 修复按钮组件和倒计时组件的显示问题 ([7ea76c1](https://github.com/thundersdata-frontend/td-design/commit/7ea76c1)) by: **chj_damon** (chjdamon@gmail.com)
* 修复文档显示问题 ([b482009](https://github.com/thundersdata-frontend/td-design/commit/b482009)) by: **chj_damon** (chjdamon@gmail.com)
* 修复文档编译失败的问题 ([aa771af](https://github.com/thundersdata-frontend/td-design/commit/aa771af)) by: **chj_damon** (chjdamon@gmail.com)
* 修复无法link原生组件的问题 ([708be30](https://github.com/thundersdata-frontend/td-design/commit/708be30)) by: **chj_damon** (chjdamon@gmail.com)
* 修复无法回显文本的问题 ([d2f3e57](https://github.com/thundersdata-frontend/td-design/commit/d2f3e57)) by: **chj_damon** (chjdamon@gmail.com)
* 修复版本号被回退的问题 ([931fadb](https://github.com/thundersdata-frontend/td-design/commit/931fadb)) by: **chj_damon** (chjdamon@gmail.com)
* 修复物理返回键不生效的问题 ([a017de7](https://github.com/thundersdata-frontend/td-design/commit/a017de7)) by: **chj_damon** (chjdamon@gmail.com)
* 修复生成的类型文件中有不需要的.map文件的问题 ([1c36fd9](https://github.com/thundersdata-frontend/td-design/commit/1c36fd9)) by: **chj_damon** (chjdamon@gmail.com)
* 修复类型声明文件丢失的问题 ([3302a8e](https://github.com/thundersdata-frontend/td-design/commit/3302a8e)) by: **chj_damon** (chjdamon@gmail.com)
* 修复类型导出方式不正确的问题 ([5486266](https://github.com/thundersdata-frontend/td-design/commit/5486266)) by: **chj_damon** (chjdamon@gmail.com)
* 修复返回按钮没有居中的问题 ([d219def](https://github.com/thundersdata-frontend/td-design/commit/d219def)) by: **chj_damon** (chjdamon@gmail.com)
* 修复项目中使用组件库但原生模块没有安装的问题 ([ce9acf5](https://github.com/thundersdata-frontend/td-design/commit/ce9acf5)) by: **chj_damon** (chjdamon@gmail.com)
* 修复项目中使用组件库时无法安装原生模块的问题 ([0606790](https://github.com/thundersdata-frontend/td-design/commit/0606790)) by: **chj_damon** (chjdamon@gmail.com)
* 修改calendar包的一些依赖 ([8fb0065](https://github.com/thundersdata-frontend/td-design/commit/8fb0065)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 修改文档 ([4aad5fa](https://github.com/thundersdata-frontend/td-design/commit/4aad5fa)) by: **chj_damon** (chjdamon@gmail.com)
* 删除多余代码 ([b18cee8](https://github.com/thundersdata-frontend/td-design/commit/b18cee8)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 删除多余代码 ([10b4c93](https://github.com/thundersdata-frontend/td-design/commit/10b4c93)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 删除多余的.md文件 ([385c5f5](https://github.com/thundersdata-frontend/td-design/commit/385c5f5)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 删除无用属性 ([5ecfab1](https://github.com/thundersdata-frontend/td-design/commit/5ecfab1)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 弹窗新增 maskVisible 属性,修复下拉报错问题 ([32e017a](https://github.com/thundersdata-frontend/td-design/commit/32e017a)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 把rn-fetch-blob作为依赖提出去 ([ba8508c](https://github.com/thundersdata-frontend/td-design/commit/ba8508c)) by: **chj_damon** (chjdamon@gmail.com)
* 更新g2plot版本,修复ts报错 ([7b0ba7a](https://github.com/thundersdata-frontend/td-design/commit/7b0ba7a)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 移除一些不必要的依赖 ([1b7be22](https://github.com/thundersdata-frontend/td-design/commit/1b7be22)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 补充value和onChange ([585ba0a](https://github.com/thundersdata-frontend/td-design/commit/585ba0a)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 调整图表主题 ([2996530](https://github.com/thundersdata-frontend/td-design/commit/2996530)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整玫瑰图样式写法,解决类型报错 ([4205b73](https://github.com/thundersdata-frontend/td-design/commit/4205b73)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 调整环图字体样式,调整玫瑰图tooltip ([c448bba](https://github.com/thundersdata-frontend/td-design/commit/c448bba)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 还原代码 ([2314145](https://github.com/thundersdata-frontend/td-design/commit/2314145)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 进一步修复类型报错,修复样式问题 ([86fb7b0](https://github.com/thundersdata-frontend/td-design/commit/86fb7b0)) by: **rxs-michael** (ruanxusong@thundersdata.com)
* 重写Image组件 ([e93f407](https://github.com/thundersdata-frontend/td-design/commit/e93f407)) by: **chj_damon** (chjdamon@gmail.com)
* 重新定义NoticeBar组件 ([a266dc1](https://github.com/thundersdata-frontend/td-design/commit/a266dc1)) by: **chj_damon** (chjdamon@gmail.com), closes [#131](https://github.com/thundersdata-frontend/td-design/issues/131)


### 📝 Documentation

* 为SwipeRow组件补充文档 ([59bb6ff](https://github.com/thundersdata-frontend/td-design/commit/59bb6ff)) by: **chj_damon** (chjdamon@gmail.com)
* 数据结构-数组 ([f3da9c6](https://github.com/thundersdata-frontend/td-design/commit/f3da9c6)) by: **chenyingjie** (929104662@qq.com)
* 文档图片表格修改 ([b5d8b8d](https://github.com/thundersdata-frontend/td-design/commit/b5d8b8d)) by: **chenyingjie** (13487079308@163.com)
* 新增ImagePicker组件文档 ([967193d](https://github.com/thundersdata-frontend/td-design/commit/967193d)) by: **chj_damon** (chjdamon@gmail.com)
* 更新文档首页组件数量 ([36183d5](https://github.com/thundersdata-frontend/td-design/commit/36183d5)) by: **chj_damon** (chjdamon@gmail.com)
* 补充countDown文档（截图待完善） ([dea091c](https://github.com/thundersdata-frontend/td-design/commit/dea091c)) by: **SunshineH2** (huangshanshan@thundersdata.com)
* 补充CountDown组件截图 ([bff7a7a](https://github.com/thundersdata-frontend/td-design/commit/bff7a7a)) by: **chj_damon** (chjdamon@gmail.com)
* 补充主题与样式的文章 ([a6a08e9](https://github.com/thundersdata-frontend/td-design/commit/a6a08e9)) by: **chj_damon** (chjdamon@gmail.com)
* 调整md文件的位置 ([95e5f64](https://github.com/thundersdata-frontend/td-design/commit/95e5f64)) by: **chj_damon** (chjdamon@gmail.com)



