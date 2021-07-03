# 元组（tuple）

数组合并了相同类型的对象，而 **元组** 合并了不同类型的对象。
元组最重要的特性是，可以 **限制数组的类型和个数**，它特别适合用来实现多值返回。

我们熟知的一个使用元组的场景是 React Hooks，例如 useState 示例：

```js
import { useState } from 'react';

function useCount() {

  const [count, setCount] = useState(0);

  return ....;

}
```

在 JavaScript 中并没有元组的概念，作为一门动态类型语言，它的优势是天然支持多类型元素数组。

我们假设以下两个数组的元素类型如下代码所示：

```
[state, setState]

[setState, state]
```

从上面可以看出，state 是一个类型为 State 的对象，而 setState 是一个类型为 SetState 的函数。

对于 JavaScript 而言，上面的数组其实长的都一样，并没有一个有效的途径可以区分彼此。

不过，出于较好的扩展性、可读性和稳定性考虑，我们往往会更偏向于把不同类型的值通过键值对的形式塞到一个 **对象** 中，再返回这个对象（尽管这样会增加代码量），而不是使用没有任何限制的数组。比如我们可能会使用如下的对象结构来替换数组：

```
{
  state,
  setState
}
```

而 TypeScript 的元组类型正好弥补了这个不足，使得定义包含固定个数元素、每个元素类型未必相同的数组成为可能。（需要注意的是，毕竟 TypeScript 会转译成 JavaScript，所以 TypeScript 的元组无法在运行时约束所谓的“元组”像真正的元组一样，保证元素类型、长度不可变更）。

对于 TypeScript 而言，如下所示的两个元组类型其实并不相同：

```
[State, SetState]

[SetState, State]
```

所以添加了不同元组类型注解的数组后，在 TypeScript 静态类型检测层面就变成了两个不相同的元组，如下代码所示：

```js
const x: [State, SetState] = [state, setState];

const y: [SetState, State] = [setState, state];
```

下面还是用的 React Hooks 来介绍 TypeScript 元组的应用场景。

比如 useState 的返回值类型是一个元组类型，如下代码所示（以下仅是简单的例子，事实上 useState 的类型定义更为复杂）：

```js
(state: State) => [State, SetState];
```

**元组相较对象而言，不仅为我们实现解构赋值提供了极大便利，还减少了不少代码量，这可能也是 React 官方如此设计核心 Hooks 的重要原因之一。**

但事实上，许多第三方的 Hooks 往往会出于扩展性、稳定性等考虑，尤其是需要返回的值的个数超过 2 个时，会更偏向于使用对象作为返回值。

这里需要注意：数组类型的值只有显示添加了元组类型注解后（或者使用 as const，声明为只读元组），TypeScript 才会把它当作元组，否则推荐出来的类型就是普通的数组类型。
