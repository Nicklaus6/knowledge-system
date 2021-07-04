# 字面量类型、类型拓宽和类型缩小

在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。

目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，具体示例如下：

```ts
{
  let specifiedStr: "this is string" = "this is string";
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;
}
```

**字面量类型是集合类型的子类型，它是集合类型的一种更具体的表达。**

比如 'this is string' （这里表示一个字符串字面量类型）类型是 string 类型（确切地说是 string 类型的子类型），而 string 类型不一定是 'this is string'（这里表示一个字符串字面量类型）类型，如下具体示例：

```ts
{
  let specifiedStr: "this is string" = "this is string";
  let str: string = "any string";
  specifiedStr = str; // ts(2322) 类型 '"string"' 不能赋值给类型 'this is string'
  str = specifiedStr; // ok
}
```

实际上，定义单个的字面量类型并没有太大的用处，它真正的应用场景是可以把多个字面量类型组合成一个 **联合类型**，用来描述拥有明确成员的实用的集合。

如下代码所示，我们使用字面量联合类型描述了一个明确、可 'up' 可 'down' 的集合，这样就能清楚地知道需要的数据结构了。

```ts
type Direction = "up" | "down";

function move(dir: Direction) {
  // ...
}

move("up"); // ok

move("right"); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
```

通过使用字面量类型组合的联合类型，我们可以限制函数的参数为指定的字面量类型集合，然后编译器会检查参数是否是指定的字面量类型集合里的成员。

因此，相较于使用 string 类型，使用字面量类型（组合的联合类型）可以将函数的参数限定为更具体的类型。这不仅提升了程序的可读性，还保证了函数的参数类型，可谓一举两得。

## let 和 const 定义的变量类型

看完三种字面量类型后，我们再来看看通过 let 和 const 定义的变量的值相同，而变量类型不一致的具体原因。

我们先来看一个 const 示例，如下代码所示：

```ts
{
  const str = "this is string"; // str: 'this is string'
  const num = 1; // num: 1
  const bool = true; // bool: true
}
```

在上述代码中，我们将 const 定义为一个不可变更的常量，在缺省类型注解的情况下，TypeScript 推断出它的类型直接 **由赋值字面量的类型决定**，这也是一种比较合理的设计。

接下来我们看看如下所示的 let 示例:

```ts
{
  let str = "this is string"; // str: string
  let num = 1; // num: number
  let bool = true; // bool: boolean
}
```

在上述代码中，缺省显式类型注解的可变更的变量的类型转换为了 **赋值字面量类型的父类型**，比如 str 的类型是 'this is string' 类型（这里表示一个字符串字面量类型）的父类型 string，num 的类型是 1 类型的父类型 number。

这种设计符合编程预期，意味着我们可以分别赋予 str 和 num 任意值（只要类型是 string 和 number 的子集的变量）：

```ts
str = "any string";
num = 2;
bool = false;
```

我们将 TypeScript 的 **字面量子类型转换为父类型** 的这种设计称之为 **"literal widening"**，也就是 **字面量类型的拓宽**，比如上面示例中提到的字符串字面量类型转换成 string 类型。

### Literal Widening

所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显式添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。

基于字面量类型拓宽的条件，我们可以通过如下所示代码,添加显示类型注解控制类型拓宽行为。

```ts
{
  const specifiedStr: "this is string" = "this is string"; // 类型是 '"this is string"'

  let str2 = specifiedStr; // 即便使用 let 定义，类型是 'this is string'
}
```

实际上，除了字面量类型拓宽之外，TypeScript 对 `null` 和 `undefined`也有类似 "Type Widening" （类型拓宽）的设计。

```ts
{
  let x = null; // 类型拓宽成 any

  let y = undefined; // 类型拓宽成 any

  /** -----分界线------- */

  const z = null; // 类型是 null

  /** -----分界线------- */

  let anyFun = (param = null) => param; // 形参类型是 null

  let z2 = z; // 类型是 null

  let x2 = x; // 类型是 null

  let y2 = y; // 类型是 undefined
}
```

在现代 TypeScript 中，以上示例的第 2~3 行的类型拓宽更符合实际编程习惯，我们可以赋予任何其他类型的值给具有 null 或 undefined 初始值的变量 x 和 y。

示例第 7~10 行的类型推断行为因为开启了 strictNullChecks=true，此时我们可以从类型安全的角度试着思考一下：这几行代码中出现的变量、形参的类型为什么是 null 或 undefined，而不是 any？因为前者可以让我们更谨慎对待这些变量、形参，而后者不能。

既然有类型拓宽，自然也会有类型缩小。

## Type Narrowing

在 TypeScript 中，我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合，这就是 "Type Narrowing"。

比如，我们可以使用 **类型守卫** 将函数参数的类型从 any 缩小到明确的类型，具体示例如下：

```ts
{
  let func = (anything: any) => {
    if (typeof anything === "string") {
      return anything; // 类型是 string
    } else if (typeof anything === "number") {
      return anything; // 类型是 number
    }

    return null;
  };
}
```

同样，我们可以 **使用类型守卫将联合类型缩小到明确的子类型**，具体示例如下：

```ts
{
  let func = (anything: string | number) => {
    if (typeof anything === "string") {
      return anything; // 类型是 string
    } else {
      return anything; // 类型是 number
    }
  };
}
```

当然，我们也可以通过字面量类型等值判断（===）或其他控制流语句（包括但不限于 if、三目运算符、switch 分支）将联合类型收敛为更具体的类型。

## 总结

- 在 TS 中，字面量还能表示类型，现在有三种字面量类型：字符串字面量类型，数字字面量类型和布尔字面量类型。

* 字面量类型是集合类型的子类型，它是集合类型的一种更具体的表达。

- 字面量类型的真正的 **应用场景** 是把多个字面量类型组合成一个 **联合类型**，用来描述具体成员，提高程序的可读性。

* 在缺省类型注解的情况下，用 `const` 定义的变量的类型被推断为 **赋值的字面量类型**；而用 `let` 定义的变量的类型被推断为 **赋值的字面量类型的父类型**。

- 我们将 TypeScript 的 **字面量子类型转换为父类型** 的这种设计称之为 "literal widening"，也就是 **字面量类型的拓宽**。

* TypeScript 对用 `let` 声明赋值为 null 和 undefined 也有类似 "Type Widening" （类型拓宽）的设计，会被推断为 any 类型。

- 在 TypeScript 中，我们可以通过某些操作 **将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合**，这就是 "Type Narrowing"（类型缩小）。

* 可以通过 **类型守卫** 来进行类型缩小。
