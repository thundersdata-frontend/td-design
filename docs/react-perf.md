---
nav:
  title: React应用开发性能优化手段
  path: /faq
group:
  title: 开发常见问题
  path: /
  order: 2
---

# React 应用开发常见性能优化手段

**性能优化应该遵循的基本法则：将变的部分和不变的部分分离。**

- 变的部分：
  - state
  - props
  - context

`props`和`context`都是基于`state`演变过来的。父组件的`state`传给子组件，就成为了子组件的`props`； 父组件的`state`传到了`context`里，就成为一个子孙组件的`context`了。

## 1. state 尽可能地下放到子组件

```jsx | pure
import { useState } from 'react';

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}

export default function App() {
  const [num, updateNum] = useState(0);

  return (
    <div>
      <input value={num} onChange={e => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCpn />
    </div>
  );
}
```

以上面的代码为例，当`num`发生变化的时候，`ExpensiveCpn`就会被重新渲染。因为`num`是`App`组件的 state，它的改变会让`App`组件重新渲染，`ExpensiveCpn`作为`App`的子组件，自然也就重新渲染了。

所以，我们应该将`num`下放到跟`ExpensiveCpn`不相关的子组件中：

```jsx | pure
import { useState } from 'react';

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}

function Input() {
  const [num, updateNum] = useState(0);
  return (
    <>
      <input value={num} onChange={e => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  );
}

export default function App() {
  return (
    <div>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}
```

如上所示，现在`num`状态位于`Input`组件中，它的改变只会引起`Input`组件自身的重新渲染，而不会引起`ExpensiveCpn`的重新渲染。

假如在`App`里面用到了`num`这个`state`，那我们又能怎么优化代码呢？ 答案是我们可以借助`children`来实现：

优化前的代码：

```jsx | pure
import { useState } from 'react';

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}

export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <div title={num + ''}>
      <input value={num} onChange={e => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCpn />
    </div>
  );
}
```

优化后的代码：

```jsx | pure
import { ReactNode, useState } from 'react';

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}

function InputWrapper({ children }: { children: ReactNode }) {
  const [num, updateNum] = useState(0);

  return (
    <div title={num + ''}>
      <input value={num} onChange={e => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <InputWrapper>
      <ExpensiveCpn /> // <- 把`ExpensiveCpn`做为`InputWrapper`的`children`
    </InputWrapper>
  );
}
```

## 2. 避免不必要的 re-render

以`FlatList.renderItem`的使用为例：

```jsx | pure
const renderItem = useCallback(
  ({ item: { node } }) => {
    const slug = node.slug;

    const handlePress = () => {
      push('SignedOutAssetScreen', { assetSlug: slug });
    };

    return <MarketCell onPress={handlePress} key={node.uuid} asset={node} />;
  },
  [push]
);

// const MarketCell = memo((props) => ...)
```

上面的代码，即便是`renderItem`方法被`useCallback`包裹了，但`MarketCell`组件还是会重新渲染。因为`useCallback`里面定义的函数每次都会重新创建，导致`MarketCell`组件重新渲染。

所以解决办法也很简单，我们只要把`handlePress`方法用`useCallback`包裹起来，就不会重新创建，这样就不会重新渲染了。同时我们应该把整个`renderItem`里面的函数封装成一个自定义组件：

```jsx | pure
const Item = memo(({ asset }: { asset: MarketCellProps['asset'] & { slug: string } }) => {
  const slug = asset.slug;

  // 将push方法从renderItem的依赖，转移到自定义组件内部
  const { push } = useStackNavigation();

  // handlePress 不会被重新创建
  const handlePress = useCallback(() => {
    push('SignedOutAssetScreen', { assetSlug: slug });
  }, [slug, push]);

  return <MarketCell onPress={handlePress} asset={asset} />;
});

// renderItem 返回一个组件
const renderItem = useCallback(({ item: { node } }) => {
  return <Item key={node.uuid} asset={node} />;
}, []);
```

## 3. 使用`useMemo`来缓存计算耗时的结果

如果在一个组件里面会调用一个计算特别耗时的函数，那么我们应该使用`useMemo`来缓存计算结果，以避免重复计算。

```jsx | pure
// 避免这样做
function Component(props) {
  const calcResult = heavyCalculation(props.item);

  return <AnotherComponent value={calcResult} />;
}

// 只有 `props.item` 改变时someProp的值才会被重新计算
function Component(props) {
  const calcResult = useMemo(() => heavyCalculation(props.item), [props.item]);

  return <AnotherComponent value={calcResult} />;
}
```

## 4. 避免使用内联对象和内联函数

使用内联对象时，react 会在每次渲染时重新创建对此对象的引用，这会导致接收此对象的组件将其视为不同的对象。因此，该组件对于 prop 的浅层比较始终返回 false，导致组件一直重新渲染。

```jsx | pure
function Component(props) {
  return <AnotherComponent style={{ margin: 0 }} {...props} />;
}
```

- 如果这个对象跟 props 无关，那么我们可以把它抽取出作为一个变量定义在组件外部；
- 如果这个对象跟 props 有关，那么我们可以用`useMemo`帮我们缓存这个对象，以避免重复创建。

```jsx | pure
// 跟props无关
const style = { margin: 0 };
function Component(props) {
  return <AnotherComponent style={style} {...props} />;
}

// 跟props有关
function Component(props) {
  const style = useMemo(() => ({ margin: props.margin }), [props.margin]);

  return <AnotherComponent style={style} {...props} />;
}
```

内联函数也是一样，组件每次渲染时都会创建一个新的引用。这时我们可以用`useCallback`进行包裹，以避免重复创建。

```jsx | pure
// bad
function Component(props) {
  return (
    <AnotherComponent
      {...props}
      onPress={() => {
        // do something...
      }}
    />
  );
}

// good
function Component(props) {
  const handlePress = useCallback(() => {
    // do something...
  }, []);

  return <AnotherComponent {...props} onPress={handlePress} />;
}
```

**推荐使用[ahooks/useMemoizedFn](https://ahooks-next.surge.sh/zh-CN/hooks/use-memoized-fn)，它会自动帮你缓存函数的返回值，并且可以接受一个参数，用于指定缓存的依赖。**

## 5. 遍历生成组件时使用 key

老生常谈的话题，这也是在渲染列表时必须要做的事儿。可以讨论的是到底可不可以用`index`作为 key 呢？首先，官方文档里面推荐的使用列表项里面自带一个能够唯一标识的属性作为 key；但是，官网文档里面并没有说不能用 index 作为 key，[官方文档链接](https://reactjs.org/docs/lists-and-keys.html)。只是提醒说如果列表项会改变的情况下不能用 index 作为 key。

所以，我们如果能够保证列表项不会改变，那么我们就可以用`index`作为 key。

```jsx | pure
const todoItems = todos.map(todo => (
  // 优先使用todo里面能唯一标识这条数据的属性作为key
  <li key={todo.id}>{todo.text}</li>
));

// 或者

const todoItems = todos.map((todo, index) => (
  // 用index作为key需要保证todos不会改变
  <li key={index}>{todo.text}</li>
));
```

## 6. 延迟加载不是立即需要的组件

常见做法：

- 使用`React.lazy`，在组件加载时才加载组件；

```jsx | pure
const Component = React.lazy(() => import('./Component'));
```

- 基于路由进行代码分割，如`react-router` / `umi`

- 组件按需加载， 配合插件`babel-plugin-import`使用

```jsx | pure
import { Button } from 'antd';
```

## 7. Context 性能优化

跨层级传递数据，通常会使用 React Context 作为媒介，hooks 提出之后，使用 context 前所未有的方便，但同样地，context payload 变更会触发所有用到了这个 Context 的组件重新渲染，即使这个组件用到的那部分数据没有发生变化。

```jsx | pure
import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();

export function ChildNonTheme() {
  console.log('不关心皮肤的子组件渲染了');
  return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}

export function ChildWithTheme() {
  const theme = useContext(ThemeContext);
  return <div>我是有皮肤的哦~ {theme}</div>;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const onChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={onChangeTheme}>改变皮肤</button>
      <ChildWithTheme />
      <ChildNonTheme />
    </ThemeContext.Provider>
  );
}
```

上面的代码中，`theme`发生改变的时候，会让`ChildNonTheme`组件也跟着被重新渲染（虽然它压根儿就不关心 theme，但谁让它在 Context 下呢...）

怎么解这个问题呢？我们可以巧妙地利用`children`来解决。

```jsx | pure
import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();

function ChildNonTheme() {
  console.log('不关心皮肤的子组件渲染了');
  return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}

function ChildWithTheme() {
  const theme = useContext(ThemeContext);
  return <div>我是有皮肤的哦~ {theme}</div>;
}

// 定义一个组件，把`children`传进去
function ThemeApp({ children }) {
  const [theme, setTheme] = useState('light');
  const onChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={onChangeTheme}>改变皮肤</button>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeApp>
      {/* 这两个组件作为ThemeApp组件的chilren传进去 */}
      <ChildWithTheme />
      <ChildNonTheme />
    </ThemeApp>
  );
}
```

对`ThemeApp`组件而言， `ChildWithTheme`和`ChildNonTheme`是作为`children`传进来的，也就意味着`ThemeApp`组件在重新渲染时，是不会对 children 造成影响的。可以直接复用。

## 8. 多用 Fragment

react 规定返回多个元素必须要有一个父元素，这样一来就会导致应用中多出现了很多无用的父元素，这样会导致性能问题。

```jsx | pure
function Component() {
  return (
    <div>
      <h1>Hello world!</h1>
      <h1>Hello there!</h1>
      <h1>Hello there again!</h1>
    </div>
  );
}
```

我们可以使用`Fragment`或者`<></>`来避免创建不必要的元素

```jsx | pure
function Component() {
  return (
    <>
      <h1>Hello world!</h1>
      <h1>Hello there!</h1>
      <h1>Hello there again!</h1>
    </>
  );
}
```

## 9. 正确认识 props

我们知道，父组件传值给子组件有两种方式，第一种是通过`props`，第二种是通过`context`。

但是，即便一个子组件不接收任何`props`，这并不意味着它的 props 不存在，相反，props 一直存在，这种情况下它是一个`{}`。

React 中是默认使用全等来判断`props`是否相等的，所以即便是`{}`也不会被认为是相等的。这就导致 react 的性能优化没有被命中，从而子组件还是发生了重新渲染。

```jsx | pure
import React, { useState, useContext } from 'react';

const numCtx = React.createContext < number > 0;
const updateNumCtx = React.createContext < React.Dispatch < number >> (() => {});

function Button() {
  const updateNum = useContext(updateNumCtx); // updateNum是一个dispatch，它是不变的。
  console.log('btn render');
  return <button onClick={() => updateNum(Math.random())}>产生随机数</button>;
}

function Show() {
  const num = useContext(numCtx); // 用到了context里面的num，所以num改变时会触发重新渲染。
  return <p>num is: {num}</p>;
}

const Middle = () => {
  return (
    <>
      <Button />
      <Show />
    </>
  );
};

export default function App() {
  const [num, updateNum] = useState(0);

  return (
    <numCtx.Provider value={num}>
      <updateNumCtx.Provider value={updateNum}>
        <Middle />
      </updateNumCtx.Provider>
    </numCtx.Provider>
  );
}
```

如上代码所示，虽然 Middle 不接收任何 props，但是实际上 props 是{}, react 在用全等比较的时候，{}和{}不会认为是相等的，所以 APP 组件发生重新渲染的时候，Middle 组件也会跟着重新渲染，从而使它的 Button 子组件也跟着重新渲染。

我们可以使用`memo`或者`useMemo`来解决 Middle 组件的重新渲染问题。

```jsx | pure
// 使用memo
const Middle = React.memo(() => {
  return (
    <>
      <Button />
      <Show />
    </>
  );
});

// 使用useMemo
const Middle = () => {
  return useMemo(
    () => (
      <>
        <Button />
        <Show />
      </>
    ),
    []
  );
};
```
