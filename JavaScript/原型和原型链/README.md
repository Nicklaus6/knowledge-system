# 原型和原型链
> 原型和原型链是JS中的重点和难点，本文在看了一些优秀文章后整理出以下 **精简总结** ，如果需要理解可以查看本文底部的参考部分，都是我看过的很好理解的文章。

``` js
function Person() {};
let person = new Person();
```
## 总结
+ 通过构造函数和 `new` 可以创建一个 **实例对象** 。（[这一次，彻底搞懂 —— 构造函数和new](https://juejin.cn/post/6920565094955155470)）
+ 每个对象在创建的时候会关联另一个对象，它就是 **原型** ，每一个对象都会从原型 **继承** 属性，实现继承的主要方式 即 **原型链**。
+ 每个函数都有一个 `prototype` 属性，即 **显式原型对象** ，它指向使用这个函数创建的 **实例的原型** 。
  
  在例子中，`Person.prototype` 即实例原型。
+ 每个对象都有一个 内部隐藏属性 `[[Prototype]]` 属性，即 **隐式原型对象** ，可以使用 `obj.__proto__` 访问它(`__proto__` 是 `[[prototype]]`的 getter/setter)，它指向该对象的原型。
  
  `person.__proto__ === Person.prototype`
+ 每个原型都有一个 `constructor` 属性，它指向关联的构造函数。
  
  `Person.prototype.constructor = Person`
+ `Object.getPrototypeOf()`可以获得对象原型
  
  `Object.getPrototypeOf(person) === Person.prototype`
+ 当读取实例的属性时，如果找不到，就会查找该对象原型中的属性，如果还找不到，就查找原型的原型，直到顶层，这种规则就是 **原型链** 。
+ 原型对象就是通过 Object 构造函数生成的。
  
  `Person.prototype.__proto__ === Object.prototype`

+ `Object.prototype` 的原型是 `null`
  
  `Object.prototype.__proto__ === null`

  `null` 表示“没有对象”，即该处不应该有值。

  所以 `Object.prototype.__proto__` 的值为 `null` 跟 `Object.prototype` 没有原型，是一个意思。

  所以查找属性的时候查到 `Object.prototype` 就可以停止查找了。
+ 一张图解释原型链：
  ![原型链](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/prototype5.png)

+ 构造函数、原型和实例三者之间的关系：
  每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，而实例包含一个原型对象的指针。
+ JavaScript 规范中规定， `__proto__` 是过时的且 **不推荐** 使用，因为 proto 必须仅在浏览器环境下才能得到支持。
+ **设置和直接访问原型** 的现代方法有：
  + [`Object.create(proto, [descriptors])`](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/create) —— 利用给定的 proto 作为 `[[Prototype]]`（可以是 null）和可选的属性描述来创建一个空对象。
  + [` Object.getPrototypeOf(obj)`](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) —— 返回对象 obj 的 `[[Prototype]]`（与 __proto__ 的 getter 相同）。
  + [`Object.setPrototypeOf(obj, proto)`](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) —— 将对象 obj 的 `[[Prototype]]` 设置为 proto（与 __proto__ 的 setter 相同）。

+ `Object.create(null)` 可以创建一个没有 `__proto__` 的非常干净的空对象。



## 参考
+ [JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype1.png)
+ [现代JS教程——原型继承](https://zh.javascript.info/prototype-inheritance#zong-jie)