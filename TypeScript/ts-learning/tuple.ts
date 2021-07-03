// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
// 元组起源于函数编程语言，这些语言中会频繁使用元组。
// 元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。

// 定义一对值分别为 string 和 number 的元组：
let tom: [string, number] = ["tom", 2];

// 当赋值或访问一个已知索引的元素时，会得到正确的类型：
console.log(tom[0], tom[1]);
console.log(tom[0].slice(1), tom[1].toFixed(1));

// 也可以只赋值其中一项：
tom[1] = 12;

// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
tom = ["tom", 1];

// tom = ['Tom'];
// Property '1' is missing in type '[string]' but required in type '[string, number]'.

// 当添加越界元素时，它的类型会被限制为元组中每个类型当联合类型。
// tom.push(true);
// // Argument of type 'true' is not assignable to parameter of type 'string | number'.
