---
nav:
  title: 单例模式
  path: /pattern
group:
  title: 设计模式
  path: /
  order: 1
---

# 单例模式 - Singleton

单例模式是保证一个类只有一个实例，并且提供一个访问它的全局访问点

# 问题

在开发中，可能遇到一些操作比较耗费资源，像一些弹窗,一些组件,外部引入的一些重型的类，如果我们每次使用都去创建一个对象，那么会造成很多性能的浪费。如同下列的代码，每次点击时会创建一个新的 div。

```jsx
import React from 'react';

export default () => {
  const modal = string => {
    const html = document.createElement('div');
    html.innerHTML = string;
    document.getElementById('app_1').appendChild(html);
  };

  return (
    <div id="app_1">
      <ul>
        {[1, 2, 3, 4, 5, 6].map(item => {
          return (
            <li
              key={item}
              onClick={() => {
                modal(`弹窗${item}`);
              }}
            >
              弹窗{item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
```

这是一个简单的 demo，只进行了创建的处理，没有对后续关闭等一些事件的处理。每次创建一个 div 看起来或许没有什么问题，但是这个时候我们仅仅需要一个弹窗，也就是说最好能保存下来，每次创建的时候都是同一个，就不需要去多次创建了。

# 解决方案

在第一次创建弹窗的时候使用闭包进行缓存实例，后续便可以每次都使用这个实例。

```jsx
import React from 'react';

export default () => {
  const createDiv = (function () {
    let instance;
    return function () {
      if (instance) {
        return instance;
      }
      const html = document.createElement('div');
      document.getElementById('app_2').appendChild(html);
      instance = html;
      return instance;
    };
  })();

  const modal = string => {
    const html = createDiv();
    html.innerHTML = string;
  };

  return (
    <div id="app_2">
      <ul>
        {[1, 2, 3, 4, 5, 6].map(item => {
          return (
            <li
              key={item}
              onClick={() => {
                modal(`弹窗${item}`);
              }}
            >
              弹窗{item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
```
