# TypeScript
>Typed JavaScript at Any Scale.
添加了类型系统的 JavaScript，适用于任何规模的项目。

## TypeScript 的特性
### 类型系统
我们知道，JavaScript 是一门非常灵活的编程语言：

+ 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
+ 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
+ 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
+ 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值。

这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军；另一方面也使得它的代码质量参次不起，维护成本高，运行时错误多。

而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。

#### TypeScript 是静态类型
类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。

动态类型是指在 **运行时** 才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型。

静态类型是指 **编译阶段** 就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型。

#### TypeScript 是弱类型
类型系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型。

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型。

这样的类型系统体现了 TypeScript 的核心设计理念：在完整保留 JavaScript 运行时行为的基础上，通过引入静态类型系统来提高代码的可维护性，减少可能出现的 bug。

### 适用任何规模
TypeScript 非常适用于大型项目——这是显而易见的，类型系统可以为大型项目带来更高的可维护性，以及更少的 bug。

在中小型项目中推行 TypeScript 的最大障碍就是认为使用 TypeScript 需要写额外的代码，降低开发效率。但事实上，由于有类型推论，大部分类型都不需要手动声明了。相反，TypeScript 增强了编辑器（IDE）的功能，包括代码补全、接口提示、跳转到定义、代码重构等，这在很大程度上提高了开发效率。而且 TypeScript 有近百个编译选项，如果你认为类型检查过于严格，那么可以通过修改编译选项来降低类型检查的标准。

TypeScript 还可以和 JavaScript 共存。这意味着如果你有一个使用 JavaScript 开发的旧项目，又想使用 TypeScript 的特性，那么你不需要急着把整个项目都迁移到 TypeScript，你可以使用 TypeScript 编写新文件，然后在后续更迭中逐步迁移旧文件。如果一些 JavaScript 文件的迁移成本太高，TypeScript 也提供了一个方案，可以让你在不修改 JavaScript 文件的前提下，编写一个类型声明文件，实现旧项目的渐进式迁移。


## 总结
+ TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
+ TypeScript 是一门静态类型、弱类型的语言。
+ TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
+ TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
+ TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
+ TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
+ TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
+ TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
+ TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。

## 知识点
- [ ] 数据类型
- [ ] 作用域和作用域链
- [ ] this
- [ ] 闭包
- [ ] 原型和原型链
- [ ] 继承
- [ ] 类
- [ ] 异步编程
- [ ] 事件循环机制
- [ ] 数组方法

## 参考
[TypeScript 入门教程](https://ts.xcatliu.com/introduction/what-is-typescript.html)