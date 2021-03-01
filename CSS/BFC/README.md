# BFC
> **块级格式化上下文 （Block Formatting Context, BFC）** 是 Web 页面的可视 CSS 渲染的一部分，是 **块盒子** 的布局过程发生的区域，也是浮动元素与其他元素交互的区域。—— MDN

## 定义
在解释什么是BFC之前，我们需要先知道Box、Formatting Context的概念。

### Box：CSS布局的基本单位

Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

+ **block-level box** : display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
+ **inline-level box** :  display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
+ **run-in box** : CSS3 中才有

### Formatting Context

Formatting context 是 **页面中的一块渲染区域，**并且有一套 **渲染规则** ，它 **决定了其子元素将如何定位 **，以及 **和其他元素的关系和相互作用** 。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

**BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。**

## 触发BFC

+ 根元素  `<html>`
+ 浮动元素
+ 绝对定位元素（`position`的值不是static 或者 relative。）
+ `display` 为 inline-block / flex / table-cell / table-caption  / flow-root
+ `overflow` 除了 visible 以外的值（hidden / auto / scroll）

#### `display: flow-root` 创建无副作用的 BFC

一个新的 `display` 属性的值，它可以创建 **无副作用的 BFC** 。在父级块中使用 `display: flow-root` 可以创建新的 BFC。

给 `<div>` `display: flow-root` 属性后，`<div>` 中的所有内容都会参与 BFC，浮动的内容不会从底部溢出。

关于值 `flow-root`的这个名字，当你明白你实际上是在创建一个行为类似于根元素 （浏览器中的`<html>`元素） 的东西时，就能发现这个名字的意义了——即创建一个上下文，里面将进行 flow layout。



## BFC的特性和应用

1. **同一BFC下，外边距会重叠。**如果不想重叠，给另一个盒子触发BFC即可。

   注意：

   `overflow` 和 `display: flow-root` 都是要用在 **父元素** 上的。

   如果是 **同级** 之间的外边距重叠，给另一个元素直接设置 `display: inline-block` 即可

2. 给容器触发BFC可以包含浮动元素（**解决高度塌陷，清除浮动**）。

3. 给自己触发BFC可以 **阻止被浮动元素遮挡** 的问题，可以通过此方法实现 **两栏自适应布局** 。

具体可查看[demo](https://github.com/Nicklaus6/knowledge-system/blob/master/CSS/BFC/BFC%E7%9A%84%E7%89%B9%E6%80%A7%E5%92%8C%E5%BA%94%E7%94%A8.html)



## 参考

+ [什么是BFC？看这一篇就够了](https://blog.csdn.net/sinat_36422236/article/details/88763187)
+ [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

