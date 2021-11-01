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
