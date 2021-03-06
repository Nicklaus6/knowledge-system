# 定位
> CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。—— MDN

## 五种定位

+ `static`

  + `posiition` 的默认值

  + 元素处于**文档流**
  + 此时 `top`, `right`, `bottom`, `left` 和 `z-index `属性无效。

+ `relative`

  + 元素处于 **文档流**
  + 相对于 **其正常位置** 进行定位
  + 元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此 **会在此元素未添加定位时所在位置留下空白** ）。
  + 对 `table-*-group`, `table-row`, `table-column`, `table-cell`, `table-caption` 元素 **无效** 。

+ `absolute`

  + 元素 **不处于文档流** ，且 **不占位**
  + 相对于 **其最近的非 static 定位祖先元素** 定位
  + 绝对定位的元素可以设置 **外边距**，且 **不会与其他边距合并** 。

+ `fixed`

  + 元素 **不处于文档流** ，且 **不占位**

  + 相对于 **屏幕视口（viewport）的位置** 来定位。

    元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。

  + `fixed` 属性会创建新的层叠上下文。当元素祖先的 `transform`, `perspective` 或 `filter` 属性非 `none` 时，**相对其祖先元素定位**。([查看 demo](https://github.com/Nicklaus6/knowledge-system/blob/master/CSS/%E5%AE%9A%E4%BD%8D/fixed%E7%9B%B8%E5%AF%B9%E4%BA%8E%E8%B0%81%E5%AE%9A%E4%BD%8D.html))

+ `sticky`

  + 可以说是 **相对定位** 和 **固定定位** 的混合。元素在 **跨越特定阈值前为相对定位** ，**之后为固定定位**
  + 元素根据 **文档流** 进行定位（relative），然后相对它的 **最近滚动祖先和最近块级祖先** （包括table-related元素）进行定位（fixed）。偏移值不会影响任何其他元素的位置。
  + **必须指定 `top`, `right`, `bottom`, `left` 至少其中之一**，才生效。否则其行为与相对定位相同。
  + 该值总是 **创建一个新的层叠上下文** 。一个 sticky 元素会”固定“在离它最近的一个拥有“滚动机制”的祖先上。当该 **祖先元素的`overflow` 是 `visible`以外的值时** ，**sticky 将无效**（即便这个祖先不是最近的真实可滚动祖先）。
  + 当 `祖先元素的 height值 = 粘性定位元素高度`，也 **没有粘滞效果**。

## 总结

+ `static` 、`relative` 和 跨越阈值前的 `sticky` 都处于 **普通文档流** 。

  `absolute` 、`fixed` 和 跨越阈值后的 `sticky` **脱离文档流** 。

  

+ `relative` 相对于 **其正常位置** 定位。

  `absolute` 相对于 **最近的非 static 定位的祖先元素** 定位。

  `fixed` 相对于 **屏幕视口** 定位，如果祖先元素设置了 transform、perspective 、filter 属性，相对于 **祖先元素** 定位。

  `sticky` 根据文档流进行定位，然后相对于 **最近的滚动祖先和最近的块级祖先** 进行定位。

  

+ `fixed` 和 `sticky` 会 **创建新的层叠上下文** 。



## 参考

+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#%E8%AF%AD%E6%B3%95)
+ [杀了个回马枪，还是说说position:sticky吧](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)

  

  

  

