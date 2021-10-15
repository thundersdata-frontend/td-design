---
nav:
  title: 策略模式
  path: /pattern
group:
  title: 设计模式
  path: /
  order: 3
---

# 策略模式 - Strategy

策略模式是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。

## 问题

简单的说在一些时候，我们需要根据传入的参数不同来执行不同的代码，比如说当用户认证状态分别为:未认证，已认证，审核中登状态时，我们需要进行不同的处理。或许我们写以下的代码：

```js
function navigation(status) {
  switch (status) {
    case '未认证':
      history.push('未认证');
      break;
    case '已认证':
      history.push('已认证');
      break;
    case '审核中':
      history.push('审核中');
      break;
  }
}
```

当我们需要增加一个新的状态审核失败时，就需要对 navigation 进行修改增加一个分支，或许一个状态不算什么，但是在未来我们也不确定会增加多少个状态，整个函数的分支就会非常的多，整个方法就会非常的庞大，导致可读性也十分的差，同时它也违反了开放-封闭原则。这一块的代码也无法进行很好的复用，如果还有一个地方需要未认证的逻辑，那我们只能复制粘贴了。

## 解决方案

在对分支进行拆解，将其拆解成多个小的策略，并且有一个中间函数做上下文的链接，而不是直接去使用

```js

interface Strategy {
  navigation: () => void;
}

class StrategyA implements Strategy {
  public navigation() {
    // history.push('未认证');
    console.log('未认证');
  }
}

class StrategyB implements Strategy {
  public navigation() {
    // history.push('已认证');
    console.log('已认证');
  }
}

class StrategyC implements Strategy {
  public navigation() {
    // history.push('审核中');
    console.log('审核中');
  }
}

class Context {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
  public doStrategy() {
    this.strategy.navigation();
  }
}

const navigation = new Context(new StrategyA());
navigation.doStrategy();
console.log('-----');
navigation.setStrategy(new StrategyB());
navigation.doStrategy();
console.log('-----');
navigation.setStrategy(new StrategyC());
navigation.doStrategy();

```

策略模式建议找出负责用许多不同方式完成特定任务的类， 然后将其中的算法抽取到一组被称为策略的独立类中。

名为上下文的原始类必须包含一个成员变量来存储对于每种策略的引用。 上下文并不执行任务， 而是将工作委派给已连接的策略对象。

就是将各种互不相关的行为进行独立封装，然后使用中间的上下文进行应用，使调用者本身和方法没有直接的关联，这时候需要增加一个新的状态审核失败只需要新增一种策略就可以解决，符合了开放-封闭原则。不会对原有的代码进行改动。同时也增加了代码的复用性。当然这是面向对象的策略模式，在 js 中可以进行一些省略，方法本身也是一个对象，我们可以直接使用一个对象进行对策略的存放。

```js
const Context{
  "StrategyA":()=>{
    console.log('未认证');
  },
  "StrategyB":()=>{
    console.log('已认证');
  },
  "StrategyC":()=>{
    console.log('审核中');
  },
}
function navigation(name){
  Context[name]?.()
}
```

## 策略模式

1. 将一些独立的逻辑或者业务进行封装
2. 拥有一个上下问链接封装的逻辑和调用者
3. 调用者通过对上下文来访问相应的方法

## 优缺点

优点:

1. 提高了代码的复用率
2. 通过测量将判断分支给剪切了，使得代码中没有那么庞大的 if 或 switch。
3. 开闭原则。 你无需对上下文进行修改就能够引入新的策略

缺点：

1. 增加了对策略了解的成本
2. 代码中会存在很多策略方法，和上下文
