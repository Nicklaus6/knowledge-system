# 继承

> 继承是面向对象编程中讨论最多的话题。很多面向对象语言都支持两种继承：接口继承和实现继承。前者只继承方法签名，后者继承实际的方法。接口继承在 ECMAScript 中是不可能的，因为函数没有签名。**实现继承是 ECMAScript 唯一支持的继承方式，而这主要是通过原型链实现的。** —— 红宝书

## 实现继承的方式

### 1.原型链

ECMA-262 把原型链定义为 ECMAScript 的主要继承方式。其基本思想就是通过原型继承多个引用类型的属性和方法。

```js
function Parent() {
  this.name = 'a';
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();

// 创建实例
let child1 = new Child();

console.log(child1.getName()); // a
```

#### 缺点：

- **引用类型的属性被所有实例共享：**

  ```js
  function Parent() {
    this.names = ['kevin', 'daisy'];
  }

  function Child() {}

  Child.prototype = new Parent();

  // 创建实例
  let child1 = new Child();
  child1.names.push('jj');
  console.log(child1.names); // (3) ["kevin", "daisy", "jj"]

  let child2 = new Child();
  console.log(child2.names); // (3) ["kevin", "daisy", "jj"]
  ```

  这就不对了，child1 的名字在父母的基础上多了个自己的 `'jj'` ，而 child2 的名字怎么变成和 child1 一样了？？？

  这是因为两个实例对象用的是一个原型对象，共享同一个内存空间，所以当一个发生变化另一个也会变。

  这也是为什么属性通常会在构造函数中定义，而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型 的实例。这意味着原先的实例属性摇身一变成为了原型属性。

- **子类在实例化时不能给父类的构造函数传参。**

#### 注意点：

**1. 默认原型**

默认情况下， **所有引用类型都继承自 Object** ，这也是通过原型链实现的。

任何函数的默认原型都是一个 Object 的实例，这意味着这个实例有一个内部指针指向 `Object.prototype` 。这也是为什么自定义类型能够继承包括 `toString()`、`valueOf` 在内的所有默认方法的原因。

**2. 原型与实例关系的确认方式**

- `instanceof`

  如果一个实例的原型链中出现过相应的构造函数，则 `instanceof` 返回 `true`。

- `isPrototypeOf`

  原型链中的每个原型都可以调用这个 方法，只要原型链中包含这个原型，这个方法就返回 `true`。

**3. 关于方法**

子类有时候需要覆盖父类的方法，或者增加父类没有的方法。为此，这些方法必须在原型赋值之后再添加到原型上。

另一个重点是，以 **对象字面量** 方式创建原型方法会 **破坏之前的原型链** ，因为这相当于重写了原型链。

具体可以查看红宝书 P241。

### 2.盗用构造函数（借助 call ）

为了解决原型包含引用值导致的继承问题，出现了“盗用构造函数”的方法。

基本思路很简单：在子类构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用 `apply()` 和 `call()` 方法以新创建的对象为上下文执行构造函数。

```js
function Parent() {
  this.names = ['kevin', 'daisy'];
}

function Child() {
  Parent.call(this);
}

// 创建实例
let child1 = new Child();
child1.names.push('jj');
console.log(child1.names); // (3) ["kevin", "daisy", "jj"]

let child2 = new Child();
console.log(child2.names); // (2) ["kevin", "daisy"]
```

#### 优点：

- **避免了引用类型属性被所有实例共享。**

- **可以在子类构造函数中向父类构造函数传参。**

  ```js
  function Parent(name) {
    this.name = name;
  }

  function Child(name) {
    Parent.call(this, name);
  }

  // 创建实例
  let child1 = new Child('JJ');
  console.log(child1.name); // JJ

  let child2 = new Child('Jay');
  console.log(child2.name); // Jay
  ```

#### 缺点：

- **必须在构造函数中定义方法** ， **因此函数不能重用** 。这也是使用构造函数模式自定义类型的问题。

- **子类不能访问父类原型上定义的属性或方法** ，因此所有类型只能使用构造函数模式。

  ```js
  function Parent() {
    this.name = 'parent';
  }

  Parent.prototype.getName = function () {
    return this.name;
  };

  function Child() {
    Parent.call(this);
    this.type = 'child';
  }

  // 创建实例
  let child1 = new Child();
  console.log(child1); // Child {name: "parent", type: "child"}
  console.log(child1.getName()); // Uncaught TypeError: child1.getName is not a function

  // 所以借用构造函数实现继承的缺点就是：
  // 只能继承父类的实例属性和方法，不能继承原型属性或者方法。
  ```

### 3. 组合继承

**组合继承综合了原型链和盗用构造函数的优点** ，是 JavaScript 中最常用的继承模式。

基本思路：使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```js
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  // 盗用构造函数——继承实例的属性
  Parent.call(this, name);

  this.age = age;
}

// 原型链——继承原型的方法
Child.prototype = new Parent();

// 手动挂上构造器，指向自己的构造函数
console.log(Child.prototype.constructor); // Parent(name){...}
Child.prototype.constructor = Child;

// 创建实例
let child1 = new Child('JJ', 3);
child1.colors.push('purple');

child1.sayName(); // JJ
console.log(child1); // Child {name: "JJ", colors: Array(4), age: 3}
console.log(child1.colors); // (4) ["red", "blue", "green", "purple"]

let child2 = new Child('Jay', 4);
child2.colors.push('black');

child2.sayName(); // Jay
console.log(child2); // Child {name: "Jay", colors: Array(4), age: 4}
console.log(child2.colors); // (4) ["red", "blue", "green", "black"
```

#### 优点：

- 解决了 **原型链继承** 方法中 **引用类型的属性被实例共享** 的问题。
- 解决了 **盗用构造函数** 方法中只能继承实例的方法和属性，**无法继承父类原型的属性和方法 **的问题。

#### 缺点：

**父类函数执行了两次。**第一次是改变 Child 的 prototype 的时候，第二次是通过 call 方法调用 Parent 的时候，那么 Parent 多构造一次就多进行了一次性能开销。

第六种方法可以解决这个问题。

上面介绍的更多是围绕着构造函数的方式，那么对于 JavaScript 的 **普通对象** ，怎么实现继承呢？来看第四种方法。

### 4.原型式继承

这是 2006 年一个叫 Douglas Crockford 提出的继承方式。他的出发点是即使不自定义类型也可以通过原型实现对象之间的信息共享。

```js
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

这个 `object()` 函数会创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例。**本质上，`createObject()` 是对传入的对象执行了一次浅拷贝。**

这就是 ES5 `Object.create` 的模拟实现，将传入的对象作为创建的对象的原型。这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）。

```js
let person = {
  name: 'kevin',
  friends: ['daisy', 'kelly'],
};

// 创建实例
let person1 = Object.create(person);
let person2 = Object.create(person);

person1.name = 'p1';
person1.friends.push('a');

console.log(person1.name); // p1
console.log(person1.friends); // (3) ["daisy", "kelly", "a"]

console.log(person2.name); // 'kevin'
console.log(person2.friends); // ["daisy", "kelly", "a"]
// 可以发现，这里又不对了哦
// 只给 person1 加了朋友'a'，怎么 person2 也有 'a' 朋友了？？
```

#### 优点

- 非常适合 **不需要单独创建构造函数** ，但仍然需要 **在对象间共享信息** 的场合。

#### 缺点

- 和原型链继承的问题一样，存在 **引用类型的属性被所有实例共享** 的问题。

### 5. 寄生式继承

寄生式继承的思路类似于寄生构造函数和工厂模式：**创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。**

基本的寄生继承模式如下：

```js
function createAnother(original) {
  let clone = Object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function () {
    //以某种方式增强这个对象
    console.log('hi');
  };
  return clone; // 返回这个对象
}
```

看个例子：

```js
let person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van'],
};

// 创建实例
let person1 = createAnother(person);
let person2 = createAnother(person);

person1.name = 'p1';
person1.friends.push('a');

console.log(person1.name); // p1
console.log(person1.friends); // (4) ["Shelby", "Court", "Van", "a"]

console.log(person2.name); // p1
console.log(person2.friends); // (4) ["Shelby", "Court", "Van", "a"]
// 这又不对呀，和原型式继承一个毛病，
```

#### 优点

- 同样适合 **主要关注对象**，而 **不在乎类型和构造函数** 的场景。

#### 缺点

- 通过寄生式继承给对象添加函数会导致 **函数难以重用**，与构造函数模式类似。

### 6.寄生组合式继承

寄生组合式继承 **解决了组合继承的效率问题** 。那就是**父类构造函数会被调用两次。**一次在是创建子类原型时调用，另一次是在子类构造函数中调用。

本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。

如果我们不使用 `Child.prototype = new Parent()` ，而是 **间接** 的让 `Child.prototype` 访问到 `Parent.prototype` 呢？

```js
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 关键的三步
let F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();

// 创建实例
var child1 = new Child('kevin', '18');
console.log(child1); // Child {name: "kevin", colors: Array(3), age: "18"}
```

我们封装一下这个继承方法：

```js
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(child, parent) {
  let prototype = createObj(parent.prototype); // 创建对象
  prototype.constructor = child; // 增强对象
  child.prototype = prototype; // 赋值对象

  // 其实可以简写成
  // Object.create(parent.prototype).constructor = child
  // child.prototype = child
}

inheritPrototype(Child, Parent);

// 创建实例
let child1 = new Child('JJ', 3);
child1.colors.push('purple');

child1.sayName(); // JJ
console.log(child1); // Child {name: "JJ", colors: Array(4), age: 3}
console.log(child1.colors); // (4) ["red", "blue", "green", "purple"]

let child2 = new Child('Jay', 4);
child2.colors.push('black');

child2.sayName(); // Jay
console.log(child2); // Child {name: "Jay", colors: Array(4), age: 4}
console.log(child2.colors); // (4) ["red", "blue", "green", "black"
```

#### 最佳继承方式

这种方式的高效率体现在它只调用了一次 Parent 构造函数，并且因此避免了在 `Parent.prototype` 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 `instanceof` 和 `isPrototypeOf`。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

## ES6 的 extends

我们可以利用 ES6 里的 `extends` 的语法糖，使用关键词很容易直接实现 JavaScript 的继承，

#### 如何使用 `extends` 实现继承：

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  // 使用类字段，直接定义在独立的对象中，而不是原型中
  getName = function () {
    console.log('Person:', this.name);
  };
}

class Singer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，在使用 this 之前必须调用 super()
    super(name);
    this.age = age;
  }
}

let JJ = new Singer('JJ', 3);
console.log(JJ); // Singer {name: "JJ", age: 3, getName: ƒ}
```

#### 本质是寄生组合

因为浏览器的兼容性问题，如果遇到不支持 ES6 的浏览器，那么就得利用 babel 这个编译工具，将 ES6 的代码编译成 ES5，让一些不支持新语法的浏览器也能运行。

那么最后 extends 编译成了什么样子呢？我们看一下转译之后的代码片段。

```javascript
function _possibleConstructorReturn(self, call) {
  // ...

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  // 这里可以看到

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,

      enumerable: false,

      writable: true,

      configurable: true,
    },
  });

  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var Parent = function Parent() {
  // 验证是否是 Parent 构造出来的 this

  _classCallCheck(this, Parent);
};

var Child = (function (_Parent) {
  _inherits(Child, _Parent);

  function Child() {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments)
    );
  }

  return Child;
})(Parent);
```

从上面编译完成的源码中可以看到，它采用的也是 **寄生组合继承** 方式，因此也证明了这种方式是较优的解决继承的方式。

## 总结

我个人这样理解，继承的方法就是 `[(2 + 1) + 2] + 1 `，从内往外看：

- `(2 + 1)`
  - 2 = **构造函数继承** + **原型链继承**
  - 1 = 结合了两者优点的 **组合继承**
- `2`
  - 2 = **原型式继承** + **寄生式继承**
- `1`
  - 1 = 通过 **寄生式继承** 和 **组合继承** 改造成的 **寄生组合继承**

用一张若离大佬的 JS 继承总结图：

![JS的继承总结图](https://s0.lgstatic.com/i/image/M00/8D/4A/Ciqc1F_9SVuAfHXWAAEfwyAfiC0647.png)

通过 `Object.create` 来划分不同的继承方式，最后的寄生式组合继承方式是通过组合继承改造之后的最优继承方式，而 `extends` 的语法糖和寄生组合继承的方式基本类似。

## 参考

- 《JavaScript 高级程序设计第四版》(很多大佬推荐！！)
- [JavaScript 深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)
- 若离大佬的 JavaScript 核心原理精讲
