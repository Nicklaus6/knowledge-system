# 四、页面解析与处理
这一阶段浏览器需要处理的东西很多，为了更好地理解性能优化，我们主要将其分为几个部分：

+ 页面 DOM 的解析；
  
+ 页面静态资源的加载，包括了页面引用的 JavaScript / CSS / 图片 / 字体等；
  
+ 静态资源的解析与处理，像是 JavaScript 的执行、CSSOM 的构建与样式合成等；


大致过程就是解析页面 DOM 结构，遇到外部资源就加载，加载好了就使用。但是由于这部分的内容比较多，所以在这一节里我们重点关注页面的解析（页面静态资源在下一节中）。

## 1. 注意资源在页面文档中的位置

loading……

## 2. 使用 defer 和 async

loading……

## 3. 页面文档压缩

loading……

## 4. 避免重排和重绘

在 [解析页面流程](https://github.com/Nicklaus6/knowledge-system/tree/master/%E6%B5%8F%E8%A7%88%E5%99%A8/%E8%A7%A3%E6%9E%90%E9%A1%B5%E9%9D%A2%E6%B5%81%E7%A8%8B) 中我们已经知道 **页面的生成** 分为以下 6 步：

+ 解析 HTML 生成 DOM 树
+ 解析 CSS 生成 CSSOM 树
+ 结合 DOM 树和 CSSOM 树，生成渲染树
+ 布局渲染树（layout / flow）
+ 绘制渲染树（paint）
+ 浏览器把各层信息发送给 GPU，GPU将各层合成，显示在屏幕上

而 **布局和绘制** 是 **最耗时** 的部分，这两步合在一起就是 **渲染**。

**网页生成的时候，至少会渲染一次。在用户访问的过程中，还会不断触发重排(reflow)和重绘(repaint)**，不管页面发生了重绘还是重排，都会影响性能，最可怕的是重排，会使我们付出高额的性能代价，所以我们应尽量避免。

### 重排(reflow)：

#### 概念：

当DOM的变化影响了元素的 **几何信息** (元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

重排也叫回流，简单的说就是 **重新生成布局，重新排列元素** 。

#### 下面情况会发生重排：

+ 页面初始渲染，这是开销最大的一次重排
+ 添加/删除可见的 DOM 元素
+ 改变元素位置
+ 改变元素尺寸，比如 margin / padding / border / width / height 等
+ 改变元素内容，比如文字数量，图片大小等
+ 改变元素字体大小
+ 改变浏览器窗口尺寸，比如 resize 事件发生时
+ 激活 CSS 伪类，比如 `:hover`
+ 设置 style 属性的值，因为通过设置 style 属性改变节点样式的话，每一次设置都会触发一次重排
+ 查询某些属性或调用某些计算方法： `offsetWidth` / `offsetHeight` 等。除此之外，当我们调用 `getComputedStyle` 方法，或者 IE 里的 `currentStyle`，也会触发重排。

| 常见引起重排属性和方法  | --                       | --                 | --         |
| ----------------------- | ------------------------ | ------------------ | ---------- |
| width                   | height                   | margin             | padding    |
| display                 | border-width             | border             | position   |
| overflow                | font-size                | vertical-align     | min-height |
| clientWidth             | clientHeight             | clientTop          | clientLeft |
| offsetWudth             | offsetHeight             | offsetTop          | offsetLeft |
| scrollWidth             | scrollHeight             | scrollTop          | scrollLeft |
| scrollIntoView()        | scrollTo()               | getComputedStyle() |            |
| getBoundingClientRect() | scrollIntoViewIfNeeded() |                    |            |


#### 重排影响的范围

由于浏览器渲染界面是基于流式布局模型的，所以触发重排时会对周围 DOM 重新排列，影响的范围有两种：

+ 全局范围：从根节点 html 开始对整个渲染树进行重新布局
+ 局部范围：对渲染树的某部分或某一个渲染对象进行重新布局

**全局范围重排：**

```html
<body>
  <div class="hello">
    <h4>hello</h4>
    <p><strong>Name:</strong>BDing</p>
    <h5>male</h5>
    <ol>
      <li>coding</li>
      <li>loving</li>
    </ol>
  </div>
</body>

```

当p节点上发生reflow时，hello和body也会重新渲染，甚至h5和ol都会收到影响。

**局部范围重排：**

用局部布局来解释这种现象：把一个dom的宽高之类的几何信息定死，然后在dom内部触发重排，就只会重新渲染该dom内部的元素，而不会影响到外界。

### 重绘(Repaints):

#### 概念：

当一个元素的 **外观** 发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

#### 常见的引起重绘的属性：

| 属性：          | --               | --                  | --                |
| --------------- | ---------------- | ------------------- | ----------------- |
| color           | border-style     | visibility          | background        |
| text-decoration | background-image | background-position | background-repeat |
| outline-color   | outline          | outline-style       | border-radius     |
| outline-width   | box-shadow       | background-size     |                   |

### 重排比重绘大：

大，在这个语境里的意思是：谁能影响谁？

- 重绘：某些元素的外观被改变，例如：元素的填充颜色
- 重排：重新生成布局，重新排列元素。

就如上面的概念一样，单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分。比如改变元素高度，这个元素乃至周边dom都需要重新绘制。

也就是说：重绘不一定导致重排，**但重排一定会导致重绘**。

### 浏览器的渲染队列：

思考以下代码将会触发几次渲染？

```js
div.style.left = '10px';
div.style.top = '10px';
div.style.width = '20px';
div.style.height = '20px';
```

根据我们上文的定义，这段代码理论上会触发4次重排+重绘，因为每一次都改变了元素的几何属性.

**实际上最后只触发了一次重排**，这都得益于浏览器的 **渲染队列机制**：

> 当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了**一定的数量或者到了一定的时间间隔** 时，浏览器就会批量执行这些操作。

#### 强制刷新队列：

```js
div.style.left = '10px';
console.log(div.offsetLeft);
div.style.top = '10px';
console.log(div.offsetTop);
div.style.width = '20px';
console.log(div.offsetWidth);
div.style.height = '20px';
console.log(div.offsetHeight);
```

这段代码会触发 **4次重排+重绘**，因为在`console`中你请求的这几个样式信息，无论何时浏览器都会 **立即执行渲染队列的任务** ，即使该值与你操作中修改的值没关联。

**因为队列中，可能会有影响到这些值的操作，为了给我们最精确的值，浏览器会立即重排+重绘**。

**强制刷新队列的style样式请求**：

1. `offsetTop`, `offsetLeft`, `offsetWidth`, `offsetHeight`
2. `scrollTop`, `scrollLeft`, `scrollWidth`, `scrollHeight`
3. `clientTop`, `clientLeft`, `clientWidth`, `clientHeight`
4. `getComputedStyle()`, 或者 IE的 `currentStyle`

我们在开发中，应该 **慎用这些style请求**，注意上下文关系,避免一行代码一个重排，这对性能是个巨大的消耗。

### 重排优化建议：

重排需要更新渲染树，性能花销非常大，会破坏用户体验，并且让UI展示非常迟缓。最简单的优化重排方式就是尽可能的 **缩小重排范围、减少重排次数**  。

#### 缩小重排范围

重排的性能花销跟 **渲染树有多少节点需要重新构建** 有关系：

我们应该尽量以 **局部布局** 的形式组织html结构，尽可能小的影响重排的范围。

+ 尽可能 **直接作用在低层级的DOM节点上** 。

  而不是像上述全局范围的示例代码一样，如果你要改变p的样式，class就不要加在div上，通过父元素去影响子元素不好。

+ **不要使用 table 布局**，可能很小的一个改动会造成整个 table 的重新布局。

  在不得已使用table的场合，可以设置`table-layout: auto;`或者是`table-layout:fixed `，这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围。

#### 减少重排次数

##### 1. 样式集中改变

不要频繁的操作样式，对于一个静态页面来说，明智且可维护的做法是 **更改类名** 而不是修改样式。

对于动态改变的样式来说，相较每次微小修改都直接触及元素，更好的办法是 **统一在 `cssText` 变量中编辑** 。虽然现在大部分现代浏览器都会有 `Flush` 队列进行渲染队列优化，但是有些老版本的浏览器比如 IE6 的效率依然低下。

```js
// bad
var left = 10;
var top = 10;
el.style.left = left + "px";
el.style.top = top + "px";

// 当top和left的值是动态计算而成时...
// better 
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";

// better
el.className += "theClassName";


```

##### 2. 分离读写操作

```js
div.style.left = '10px';
div.style.top = '10px';
div.style.width = '20px';
div.style.height = '20px';
console.log(div.offsetLeft);
console.log(div.offsetTop);
console.log(div.offsetWidth);
console.log(div.offsetHeight);
```

还是上面触发4次重排+重绘的代码，**这次只触发了一次重排**：

在第一个`console`的时候，浏览器把之前上面四个写操作的渲染队列都给清空了。剩下的console，因为渲染队列本来就是空的，所以并没有触发重排，仅仅拿值而已。

##### 3. 离线改变 DOM

+ `display: none` 隐藏要操作的DOM

  一旦我们给元素设置 `display:none` 时（只有一次重排重绘），元素便 **不再存在于渲染树中** ，相当于将其从页面上“拿掉”，我们之后的操作将不会触发重排和重绘，添加足够多的变更后，通过 `display`属性显示（另一次重排重绘）。通过这种方式即使大量变更也只触发两次重排。

  另外，`visibility : hidden` 的元素只对重绘有影响，不影响重排。

+ 通过使用 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)创建一个`dom`碎片,在它上面批量操作dom，操作完成之后，再添加到文档中，这样只会触发一次重排。

+ 复制节点，在副本上工作，然后替换它！

##### 4. 使用 absolute 或 fixed 脱离文档流

使用绝对定位会使的该元素单独成为渲染树中 `body` 的一个子元素，重排开销比较小，不会对其它节点造成太多影响。当你在这些节点上放置这个元素时，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。

##### 5. 优化动画

+ 可以把动画效果应用到 `position`属性为 `absolute` 或 `fixed` 的元素上，这样对其他元素影响较小。

  动画效果还应牺牲一些平滑，来换取速度，这中间的度自己衡量： 比如实现一个动画，以1个像素为单位移动这样最平滑，但是Layout就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多

+ 启用GPU加速 `GPU` 硬件加速是指应用 `GPU` 的图形性能对浏览器中的一些图形操作交给 `GPU` 来完成，因为 `GPU` 是专门为处理图形而设计，所以它在速度和能耗上更有效率。

  `GPU` 加速通常包括以下几个部分：Canvas2D，布局合成, CSS3转换（transitions），CSS3 3D变换（transforms），WebGL和视频(video)。

  ```javascript
    /*
    * 根据上面的结论
    * 将 2d transform 换成 3d
    * 就可以强制开启 GPU 加速
    * 提高动画性能
    */
    div {
      transform: translate3d(10px, 10px, 0);
    }
  
  ```

### 参考

+ [重排(reflow)和重绘(repaint)](https://juejin.cn/post/6844904083212468238#heading-15)
+ [掌握浏览器重绘(repaint)重排(reflow))-前端进阶](https://segmentfault.com/a/1190000017491520)

