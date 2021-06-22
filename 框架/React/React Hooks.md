# React Hooks

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。—— React 官方文档

## Function Component 🆚 Class Component

React 的核心是组件。v16.8 版本之前，组件的标准写法是类（class）,v16.8之后新增了基于函数的钩子（hooks）。

任何一个组件，可以用类来写，也可以用钩子来写。下面是类组件（左边）和函数组件（右边）的比较。对于复杂的组件，差的就更多。

![类组件（左边）和函数组件（右边）的比较](https://www.wangbase.com/blogimg/asset/202009/bg2020091320.jpg)

由此可以看出，**函数组件更简洁，代码量少，用起来比较“轻”，而类组件比较“重”。**

Redux 的作者 Dan Abramov [总结](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)了**组件类的几个缺点**：

- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- 组件类引入了复杂的编程模式，比如 render props 和高阶组件

## 🤔 类和函数的差异

严格地说，类组件和函数组件是有差异的。不同的写法，代表了不同的编程方法论。

**类（class）是数据和逻辑的封装。** 也就是说，组件的状态和操作方法是封装在一起的。如果选择了类的写法，就应该把相关的数据和操作，都写在同一个 class 里面。

**函数一般来说，只应该做一件事，就是返回一个值。** 如果你有多个操作，每个操作应该写成一个单独的函数。而且，数据的状态应该与操作方法分离。根据这种理念，**React 的函数组件只应该做一件事情：返回组件的 HTML 代码**，而没有其他的功能。

![react 的函数组件只应该做一件事：返回组件的 HTML 代码](https://www.wangbase.com/blogimg/asset/202009/bg2020091409.jpg)

React 早就支持[函数组件](https://reactjs.org/docs/components-and-props.html)，下面就是一个例子。

```react
function Welcome(props) {
	return <h1>hello,{props.name}</h1>
}
```

这个函数只做一件事，就是根据输入的参数，返回组件的 HTML 代码。这种只进行单纯的数据计算（换算）的函数，在函数式编程里面称为 **"纯函数"**（pure function）。

但是，这种写法有重大限制，不能包含状态，也不支持生命周期方法，因此无法取代类。

**React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。**

如果纯函数只能进行数据计算，那些不涉及计算的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？

函数式编程将那些跟数据计算无关的操作，都称为 **"副效应"** （side effect） 。如果函数内部直接包含产生副效应的操作，就不再是纯函数了，我们称之为不纯的函数。

![函数式变成将那些跟数据计算无关的操作称为副效应](https://www.wangbase.com/blogimg/asset/202009/bg2020091410.jpg)

纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。

## Hook

Hook 这个单词的意思是"钩子"。

**React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副效应，就用钩子把副效应"钩"进来。**所以，**钩子（hook）就是 React 函数组件的副效应解决方案。**

你需要什么功能，就使用什么钩子。React 默认提供了一些常用钩子，你也可以封装自己的钩子。

所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用`use`前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

下面介绍 React 默认提供的四个最常用的钩子：

- useState()
- useContext()
- useReducer()
- useEffect()

## useState()：状态钩子

`useState()`用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

用户点击按钮，会导致按钮的文字改变，文字取决于用户是否点击，这就是状态。

```react
import React, { useState } from "react";

export default function  Button()  {
  const  [buttonText, setButtonText] =  useState("Click me,   please");

  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }

  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```

上面代码中，Button 组件是一个函数，内部使用`useState()`钩子引入状态。

`useState()`这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是`buttonText`），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是`set`前缀加上状态的变量名（上例是`setButtonText`）。

## useContext()：共享状态钩子

如果需要在组件之间共享状态，可以使用`useContext()`。

现在有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。

```react
<div className="App">
  <Navbar/>
  <Messages/>
</div>
```

第一步就是使用 React Context API，在组件外部建立一个 Context。

```react
const AppContext = React.createContext({})
```

组件封装代码如下。`AppContext.Provider` 提供了一个 Context 对象，这个对象可以被子组件共享。

```react
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
```

Navbar 组件的代码如下。`useContext()`钩子函数用来引入 Context 对象，从中获取`username`属性。

```react
const Navbar = () => {
  const { username } = useContext(AppContext);
  
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
}
```

Message 组件的代码也类似。

```react
const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```

## useReducer()：action 钩子

React 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux。

**Redux 的核心概念**是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是`(state, action) => newState`。

`useReducers()`钩子用来引入 Reducer 功能。

```react
const [state, dispatch] = useReducer(reducer, initialState);
```

 上面是`useReducer()`的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的`dispatch`函数。

下面是一个计数器的例子。用于计算状态的 Reducer 函数如下。

```react
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}
```

组件代码如下。

```react
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

由于 Hooks 可以提供共享状态和 Reducer 函数，所以它在这些方面可以取代 Redux。但是，它没法提供中间件（middleware）和时间旅行（time travel），如果你需要这两个功能，还是要用 Redux。

## useEffect()：副作用钩子

上面这些钩子，都是引入某种特定的副效应，而 **`useEffect()`是通用的副效应钩子** 。找不到对应的钩子时，就可以用它。最常见的就是向服务器请求数据。以前，放在`componentDidMount`里面的代码，现在可以放在 `useEffect()`。

`useEffect()`的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。

`useEffect()`的用法如下。

```react
useEffect(()  =>  {
  // Async Action
}, [dependencies])
```

`useEffect()`接受两个参数。第一个参数是一个函数，异步操作的代码放在里面。第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，`useEffect()`就会执行。第二个参数可以省略，这时每次组件渲染时，就会执行`useEffect()`。

如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。

只要是副效应，都可以使用`useEffect()`引入。它的常见用途有下面几种。

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

下面看一个例子。

```react
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

上面代码中，每当组件参数`personId`发生变化，`useEffect()`就会执行。组件第一次渲染时，`useEffect()`也会执行。

使用`useEffect()`时，有一点需要注意。如果有多个副效应，应该调用多个`useEffect()`，而不应该合并写在一起。

### useEffect() 的返回值

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，`useEffect()`就不用返回任何值。

```react
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

上面例子中，`useEffect()`在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。

实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。

## 创建自己的 Hooks

上例的 Hooks 代码还可以封装起来，变成一个自定义的 Hook，便于共享。

```react
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);  
  return [loading, person];
};
```

上面代码中，`usePerson()`就是一个自定义的 Hook。

Person 组件就改用这个新的钩子，引入封装的逻辑。

```react
const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```



## 📎 参考

[官方文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)

[轻松学会 React 钩子：以 useEffect() 为例](https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)

[React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

