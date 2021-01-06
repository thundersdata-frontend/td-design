---
sidemenu: false
nav:
  title: 常见问题
  path: /faq
---

# FAQ - 常见问题

## 组件库常见问题

### 1. 如何自定义图标？

组件库已经内置了[react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)作为项目中图标源。如果您项目里有很多图标是自己定义的，比如[iconfont](https://www.iconfont.cn/)上的，那么我们可以用一下方法来使用自定义的图标库：

1. 将您的图标库对应的 ttf 文件放到项目根目录的`assets/fonts`目录下
2. 在项目根目录的`src`目录下，新建`Iconfont`文件夹，里面包含两个文件：

- `iconfont.json`: 一个用来描述图标库的 JSON 文件，key 是图标名，value 是图标的 16 进制值

```json
{
  "tab_home_sel": 59072
}
```

- `index.tsx`：

```tsx | pure
import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './iconfont.json';

export default createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');
```

3. 在 app.tsx 文件中引入 Iconfont

```tsx | pure
import { helpers } from '@td-design/react-native';
import Iconfont from './Iconfont';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);

const App = () => {
  // your code
};

export default App;
```

4. 使用

```tsx | pure
import React from 'react';
import { Box, Icon } from '@td-design/react-native';

const IconDemo = () => {
  return (
    <Box flex={1}>
      <Icon name="tab_home_sel" color="gold" size={40} />
    </Box>
  );
};

export default IconDemo;
```

按照以上步骤，就可以轻松集成自己的图标库到项目中了。

### 2. 如何集成极光推送

### 3. 如何集成热更新

### 4. 如何集成微信(包括支付、登录、分享)

### 5. 如何集成支付宝

### 6. 如何通过外链唤醒 APP

### 7. 如何集成 Sentry 进行异常监控
