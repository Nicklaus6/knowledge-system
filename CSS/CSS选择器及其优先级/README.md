# CSS选择器
> 选择器用来选择页面多个元素的条件。一对选择器与声明块称为规则集（ruleset)，常简称为规则（rule)。

## 11种选择器

+ 元素选择器（`div`, `p`）

+ 分组选择器（`div, p, h1`）

+ 类选择器（`.content`）

+ id选择器（`#content`）

  - 根据提供的唯一id号快速获取标签对象
  - 用于充当label标签for属性的值：用户名：，表示单击此label标签时，id为userid的标签获得焦点

+ 属性选择器

  **注意**：只有在规定了 !DOCTYPE 时，IE7 和 IE8 才支持属性选择器。在 IE6 及更低的版本中，不支持属性选择。

  | 选择器                                                       | 例子            | 例子描述                                          | CSS  |
  | :----------------------------------------------------------- | :-------------- | :------------------------------------------------ | :--- |
  | [[*attribute*\]](https://www.w3school.com.cn/cssref/selector_attribute.asp) | [target]        | 选择带有 target 属性所有元素。                    | 2    |
  | [[*attribute*=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value.asp) | [target=_blank] | 选择 target="_blank" 的所有元素。                 | 2    |
  | [[*attribute*~=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | [title~=flower] | 选择 title 属性包含单词 "flower" 的所有元素。     | 2    |
  | [[*attribute*\|=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | [lang\|=en]     | 选择 lang 属性值是"en" 或以"en-"开头的所有元素。  | 2    |
  | [[*attribute*^=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_begin.asp) | a[src^="https"] | 选择其 src 属性值以 "https" 开头的每个 <a> 元素。 | 3    |
  | [[*attribute*$=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_end.asp) | a[src$=".pdf"]  | 选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。    | 3    |
  | [[attribute*=value]](https://www.w3school.com.cn/cssref/selector_attr_contain.asp) | a[src*="abc"]   | 选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。 | 3    |

+ 后代选择器（`div p`）

+ 子元素选择器（`div>p`）

+ 相邻选择器

  + 直接相邻元素选择器（`div+p`）
  + 普通相邻元素选择器（`div~p`） （CSS3新增）

+ 伪类选择器（`:hover`, `:first-child`）

  | 属性                                                         | 描述                                     | CSS  |
  | :----------------------------------------------------------- | :--------------------------------------- | :--- |
  | [:active](https://www.w3school.com.cn/cssref/pr_pseudo_active.asp) | 向被激活的元素添加样式。                 | 1    |
  | [:focus](https://www.w3school.com.cn/cssref/pr_pseudo_focus.asp) | 向拥有键盘输入焦点的元素添加样式。       | 2    |
  | [:hover](https://www.w3school.com.cn/cssref/pr_pseudo_hover.asp) | 当鼠标悬浮在元素上方时，向元素添加样式。 | 1    |
  | [:link](https://www.w3school.com.cn/cssref/pr_pseudo_link.asp) | 向未被访问的链接添加样式。               | 1    |
  | [:visited](https://www.w3school.com.cn/cssref/pr_pseudo_visited.asp) | 向已被访问的链接添加样式。               | 1    |
  | [:first-child](https://www.w3school.com.cn/cssref/pr_pseudo_first-child.asp) | 向元素的第一个子元素添加样式。           | 2    |
  | [:lang](https://www.w3school.com.cn/cssref/pr_pseudo_lang.asp) | 向带有指定 lang 属性的元素添加样式。     | 2    |

+ 伪元素选择器 （`:before`, `:after`）

  | 属性                                                         | 描述                             | CSS  |
  | :----------------------------------------------------------- | :------------------------------- | :--- |
  | [:first-letter](https://www.w3school.com.cn/cssref/pr_pseudo_first-letter.asp) | 向文本的第一个字母添加特殊样式。 | 1    |
  | [:first-line](https://www.w3school.com.cn/cssref/pr_pseudo_first-line.asp) | 向文本的首行添加特殊样式。       | 1    |
  | [:before](https://www.w3school.com.cn/cssref/pr_pseudo_before.asp) | 在元素之前添加内容。             | 2    |
  | [:after](https://www.w3school.com.cn/cssref/pr_pseudo_after.asp) | 在元素之后添加内容。             | 2    |

+ 通配符选择器 （`*`）

## 选择器优先级

+ **优先级由高到低**

  !important > 内联样式 > id选择题 > 类选择器 > 标签选择器 > 通配符选择器 > 继承 

+ **优先级权重**

  + 标签选择器：1

  + class选择器：10

  + id选择器：100

  + 内联样式（最大）：1000

  + 继承得到的样式优先级最低

  + 比较多个 **权重相同** 的CSS选择器优先级，由**定义的位置决定**。

    由高到低分为六级：

    1. `<head/>` 标签里的 `<style/>` 中定义的样式
    2. `<style/>` 标签中 `@import`引入的样式
    3. `<link/>` 标签中引入的样式
    4. `<link/>` 标签中`@import`引入的样式
    5. 用户设定
    6. 浏览器默认

    同位置情况下，优先级相同，选择后面定义的样式



## 参考

+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#%E8%AF%AD%E6%B3%95)
+ [杀了个回马枪，还是说说position:sticky吧3](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)

  

  

  

