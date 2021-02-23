# 类
> *在面向对象的编程中，**class** 是用于 **创建对象的可扩展的程序代码模版**，它为对象提供了状态（成员变量）的初始值和行为（成员函数或方法）的实现。* —— Wikipedia

## JS 中类的由来

我们发现用 ES5 的特性来模拟 **类** 的策略都有自己的问题，实现继承的代码也显得特别冗长和混乱。

为解决这些问题，ES6 新引入的 `class` 关键字具有正式定义类的能力,更接近传统语言(比如 C++ 和 Java)的写法。

JavaScript 语言中，生成实例对象的传统方法是通过 **构造函数**。下面是一个例子：

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2); // Point {x: 1, y: 2}
```

基本上，ES6 的 `class` 可以看作是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 `class` 写法让 **对象原型** 的写法更加清晰、更像 **面向对象编程** 的语法。

上面的代码用 ES6 的`class`改写，就是下面这样：

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
};

var p1 = new Point(, 2); // Point {x: 1, y: 2}
```

## class 语法

### 基本语法：

```js
class MyClass {
	// class 方法
  constructor() {...}
  method1() {...}
  method2() {...}
  method3() {...}
  ...
}
```

然后使用 `new MyClass()` 来创建具有上述列出的所有方法的新对象。

`new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化对象。

比如：

```javascript
class User {
	constructor(name) {
    this.name = name;
  }
  
  sayHi() {
    alert(this.name);
  }
  
}

// 用法：
let user = new User('JJ');
user.sayHi();
```

当 `new User("John")` 被调用：

1. 一个新对象被创建。
2. `constructor` 使用给定的参数运行，并为其分配 `this.name`。

……然后我们就可以调用对象方法了，例如 `user.sayHi`。

注意：**类的方法之间没有逗号**。

### 取值函数 `getters` / 存值函数 `setters` 

就像对象字面量，类可能包括 `getters` / `setters` ，计算属性（computed properties）等。

这是一个使用 `get/set` 实现 `user.name` 的示例：

```js
class User {
  constructor(name) {
    // 调用 setter
    this.name = name;
  }
  
  get name() {
    return this._name;
  }
  
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let user = new User('JJ');
alert(user.name); // JJ

user = new User('') // Name is too short.
```

从技术上来讲，这样的类声明可以通过在 `User.prototype` 中创建 getters 和 setters 来实现。

### 计算属性名称 [...]

这里有一个使用中括号 `[...]` 的计算方法名称示例：

```js
class User {
  ['say' + 'Hi']() {
    alert('Hello')
  }
}

new User().sayHi(); // Hello
```

这种特性很容易记住，因为它们和对象字面量类似。

### Class 字段

**旧的浏览器可能需要 polyfill**，类字段（field）是最近才添加到语言中的。

之前，我们的类仅具有方法。

“类字段”是一种允许添加任何属性的语法。

例如，让我们在 `class User` 中添加一个 `name` 属性：

```js
class User {
  name = "John";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

所以，我们就只需在表达式中写 " = "，就这样。

类字段重要的不同之处在于，**它们会在每个独立对象中被设好，而不是设在 `User.prototype`**：

```javascript
class User {
  name = "John";
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

我们也可以在赋值时使用更复杂的表达式和函数调用：

```javascript
class User {
  name = prompt("Name, please?", "John");
}

let user = new User();
alert(user.name); // John
```

## 什么是 class？

在 JavaScript 中，**类的数据类型就是函数，类本身就指向构造函数。**

看看下面这段代码：

```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// 佐证：User 是一个函数
alert(typeof User); // function
```

`class User {...}` 构造实际上做了如下的事：

1. 创建一个名为 `User` 的函数，该函数成为类声明的结果。该函数的代码来自于 `constructor` 方法（如果我们不编写这种方法，那么它就被假定为空）。
2. 存储类中的方法，例如 `User.prototype` 中的 `sayHi`。

当 `new User` 对象被创建后，当我们调用其方法时，它会从原型中获取对应的方法。因此，对象 `new User` 可以访问类中的方法。

下面这些代码很好地解释了它们：

```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}
const u1 = new User()''

// class 是一个函数
alert(typeof User); // function

// ...或者，更确切的说，是 constructor 方法
alert(User === User.prototype.constructor); // true

// 类的所有方法都定义在类的 prototype 属性上面。比如：
alert(User.prototype.sayHi)

// 因此在类的实例上调用方法，就是调用原型上的方法

// 在原型中实际上有两个方法
alert(Object.getOwnPropertyNames(User.prototype)); // ["constructor", "sayHi"]
```



## class和构造函数的区别

人们常说 `class` 是一个语法糖（旨在使内容更易阅读，但不引入任何新内容的语法），因为我们实际上可以在没有 `class` 的情况下声明相同的内容：

```js
// 用纯函数重写 class User

// 1. 创建构造器函数
function User(name) {
  this.name = name;
}
// 函数的原型（prototype）默认具有 "constructor" 属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
User.prototype.sayHi = function() {
  alert(this.name);
};

// 用法：
let user = new User("John");
user.sayHi();
```

这个定义的结果与使用类得到的结果基本相同。因此，这确实是将 `class` 视为一种定义构造器及其原型方法的语法糖的理由。

尽管如此，他们之间存在重大 **差异** ：

### 1. class 创建的函数有特殊内部属性

首先，通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]:"classConstructor"`。因此，它与手动创建并不完全相同。

编程语言会在许多地方检查该属性。例如，与普通函数不同，**必须使用 `new` 来调用** 它：

```js
class User {
	constructor() {}
}

alert(typeof User); // function
User(); // // Error: Class constructor User cannot be invoked without 'new'
```

此外，大多数 JavaScript 引擎中的类构造器的字符串表示形式都以 “class…” 开头

```js
class User {
  constructor() {}
}

alert(User); // class User { ... }
```

### 2. 类方法不可枚举

类方法 **不可枚举**。 类定义将 `"prototype"` 中的所有方法的 `enumerable` 标志设置为 `false`。

这很好，因为如果我们对一个对象调用 `for..in` 方法，我们通常不希望 class 方法出现。

### 3. 类使用严格模式

类总是使用 `use strict`。 在类构造中的所有代码都将自动进入严格模式。

### 4.不存在变量提升（hoist）

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```javascript
new Foo(); 
class Foo {};
// Uncaught ReferenceError: Foo is not defined
```

上面代码中，`Foo`类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的 **继承** 有关，**必须保证子类在父类之后定义**。

```javascript
{
	let Foo = class {};
	class Bar extends Foo {}
}
```

上面的代码不会报错，因为`Bar`继承`Foo`的时候，`Foo`已经有定义了。但是，如果存在`class`的提升，上面代码就会报错，因为`class`会被提升到代码头部，而`let`命令是不提升的，所以导致`Bar`继承`Foo`的时候，`Foo`还没有定义。

## 类定义
与函数类型相似，定义类也有两种主要方式：类声明和类表达式。这两种方式都使用 class 关键字加大括号：

```javascript
// 类声明
class Person {}
// 类表达式
const Animal = class {};
```




## 注意点

### 1. 严格模式

类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

### 2. 不存在变量提升（hoist）

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```javascript
new Foo(); 
class Foo {};
// Uncaught ReferenceError: Foo is not defined
```

上面代码中，`Foo`类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的 **继承** 有关，**必须保证子类在父类之后定义**。

```javascript
{
	let Foo = class {};
	class Bar extends Foo {}
}
```

上面的代码不会报错，因为`Bar`继承`Foo`的时候，`Foo`已经有定义了。但是，如果存在`class`的提升，上面代码就会报错，因为`class`会被提升到代码头部，而`let`命令是不提升的，所以导致`Bar`继承`Foo`的时候，`Foo`还没有定义。

### 3. name 属性

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被`Class`继承，包括`name`属性。

```javascript
class Point {}
Point.name // "Point"
```

`name`属性总是返回紧跟在`class`关键字后面的类名。

### 4. 丢失 this 

正如 [函数绑定](https://zh.javascript.info/bind) 一章中所讲的，JavaScript 中的函数具有动态的 `this`。**它取决于调用上下文。**

因此，如果一个对象方法被传递到某处，或者在另一个上下文中被调用，则 `this` 将不再是对其对象的引用。

类的方法内部如果含有`this`，**它默认指向类的实例** 。但是，必须非常 **小心** ，一旦单独使用该方法，很可能报错。

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，**`this`会指向该方法运行时所在的环境**（由于 class 内部是严格模式，所以 this 实际指向的是`undefined`），从而导致找不到`print`方法而报错。

#### 方法一：在构造方法中绑定 this

一个比较简单的解决方法是，在构造方法中绑定`this`，这样就不会找不到`print`方法了。

```javascript
class Logger {
  // 在构造函数中绑定 this
  constructor() {
    this.printName = this.printName.bind(this)
  }
  
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

#### 方法二：箭头函数

箭头函数内部的 `this` 总是指向 **定义时所在的对象** 。

```javascript
class Logger {
  printName = (name = 'there') => {
    console.log(this); // Logger {printName: ƒ}
    this.print(`Hello ${name}`);
  }
  
	print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // Hello there
```

**类字段直接将属性添加到了对象上。**类字段 `Logger = () => {...}` 是基于每一个对象被创建的，在这里对于每一个 `Button` 对象都有一个独立的方法，在内部都有一个指向此对象的 `this`。

## 总结

+ ES6 的类是 ES5 用构造函数创建对象模板的语法糖，更加面向对象编程。

+ `class` 语法如下：

  ```javascript
  class MyClass {
    prop = value; // 属性
  	
  	constructor(...) { // 构造器
      // ...
    }
    
    method(...) {} // method
    
    get something(...) {} // getter 方法
    set something(...) {} // setter 方法
    
    [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  	// 。。。
  }
  ```

  类的方法之间没有逗号。

+ 类字段 `prop = value` 直接将属性添加到对象上，而不是对象的原型上。

+ **类的数据类型是函数，类的本身指向构造函数。**

+ 类的所有方法都定义在类的 `prototype` 属性上。

+ 类不止是语法糖，和普通构造函数的区别如下：

  + `class` 创建的函数有特殊内部属性，因此 **必须使用 `new` 来调用**
  + 类方法 **不可枚举**
  + 类使用 **严格模式**
  + 类 **不存在变量提升**
  
+ 类有两种定义方式：

  + 类声明 `class Foo {}`
  + 类表达式 `const animal = class {}`

+ 函数的许多特性都被 `Class` 继承，包括 `name` 属性。

+ 类的方法中的 `this` 指向实例，但是单独使用该方法可能会报错，**`this`会指向该方法运行所在的环境** ，因为 `class`  使用严格模式，所以  `this` 是 `undefined`。解决方法：

  + 方法一：在构造函数中绑定 `this`
  + 方法二：使用箭头函数

## 参考

+ [现代JS教程——Class 基本语法](https://zh.javascript.info/class#getterssetters)
+ [ES6入门——Class 的基本语法](https://es6.ruanyifeng.com/#docs/class)
