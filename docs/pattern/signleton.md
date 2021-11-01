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

在开发中，可能遇到一些操作比较耗费资源，像一些弹窗,一些 io 操作,一些组件,外部引入的一些重型的类，如果我们每次使用都去创建一个对象，那么会造成很多性能的浪费,同时存在多个相同类的实例化可能会存在一些问题。

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.comeRunning = function () {
  console.log(this.name + '跑过来！');
};

function Children(dog) {
  this.dog = dog;
}

Children.prototype.playWithDog = function () {
  this.dog.comeRunning();
};

const dog = new Dog('旺财');

const children1 = new Children(dog);
const children2 = new Children(dog);
children1.playWithDog();
children2.playWithDog();
```

如果有一种场景，两个孩子和一只狗玩耍,我们可以把他们放在同一片草地上或者是同一个房间中，在 js 中也就是在同一个作用域下。当然如果他们要在不同房间中，隔空去喊话的时候，我们可以将狗放在两个房间外面，让它来回跑。

```js
const dog = new Dog('旺财');
function room1() {
  const children1 = new Children(dog);
  children1.playWithDog();
}
function room1() {
  const children1 = new Children(dog);
  children1.playWithDog();
}
```

就像这样子，js 去找外层作用域的对象。但是如果层级很深的时候就需要将对象定义在外层的作用域就很不安全。如果其中一个房间中出现了另一只叫小黄狗，那么那个孩子再也见不到旺财了！！！

# 解决方案

可以再第一次创建对象的时候进行缓存对象实例，这样可以再下一次获取的时候拿到当前实例，而不需要去重新创建新的实例。

## 闭包

说到缓存数据,总是能想到闭包

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.comeRunning = function () {
  console.log(this.name + '跑过来！');
};

const getDog = (function () {
  let instance;
  return function () {
    if (instance) {
      return instance;
    }
    const dog = new Dog('旺财');
    instance = dog;
    return instance;
  };
})();

console.log(getDog() === getDog()); // true
```

使用闭包来缓存实例，来建立了一个简单的闭包。

## class

当然使用 class 来创建单例也很方便

```js
class Dog {
  instance;
  static getInstance() {
    if (this.instance) {
      // 由于是静态函数，这里的this指的是Dog，并不是 new Dog() 产生的对象哦。
      return this.instance;
    }
    return (this.instance = new this()); // 如果没有值就new 构造函数
  }

  constructor() {
    const sourceClass = this.constructor; // 获取构造函数对象
    if (!sourceClass.instance) {
      // 判断对象上面是否已经有了单例
      sourceClass.instance = this; // 这里的this指的是已经构造好的对象，空对象，只是constructor指向A
    }
    return sourceClass.instance; // 如果已经存在则直接返回
  }
}

console.log(new Dog() === new Dog());

console.log(Dog.getInstance() === Dog.getInstance());
```

# js 中的单例

在 java 等动态语言中代码主要是以类的形式出现，想要实现一个单例，要创建一个类，并进行实例化，当然对于 js 来说并不一定需实现一个类。单例的思想是全局实例化一个对象，并提供一个全局的访问，所以很明显如果直接声明一个全局对象那便是一个单例。

```js
var a = {};
```

以上代码不论你在哪里调用 a 都是同一个对象，当然这种做法是不推荐的。会对全局作用域进行污染，也很容易造成命名的冲突。现在前端模块化的普及对于这个问题也有了更好的解决方式，通过模块话可以避免了对全局作用域的污染，也不容易造成命名的冲突
