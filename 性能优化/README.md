# 性能优化
> 性能优化一直以来都是前端工程领域中的一个重要部分。网站应用的性能（加载速度、交互流畅度）优化对于提高用户留存、转化率等都有积极影响。可以理解为，提升你的网站性能，就是提升你的业务数据（甚至是业务收入）。

从用户开始来访问你的网站应用，到最终它在上面浏览信息、操作交互，其间经历了非常多的环节，每个环节都有可能出现性能问题，同时也是我们实现性能提升机会。所以，前端性能优化会要求你从整体维度来分析系统，甚至是业务。

那么如何能够更有效地梳理与理解性能优化呢？面试都会被问到：“从地址栏输入XXX到访问之间经历了什么？”其实我们也可以从这个视角来看待性能优化。

从访问开始，用户可能会经历：

「查询缓存 -> 发送请求 -> 等待响应 -> 页面解析 -> 下载并处理各类静态资源 -> 运行时 -> 预加载（等待后续的请求）」

这样一个不断往复的“旅程” —— 也就是我们的「性能优化之旅」。Web 应用在其中每一站都可能遇到性能问题，当然也会有对应的优化手段。

所以接下来将会顺着这条路径学习常见的性能问题和优化技术

## 系统性学习路线
#### 一、缓存
+  1.1 本地数据库
   +  cookie
   +  localStorage / sessionStorage
   +  indexedDB
  
+  1.2 内存缓存
  
+  1.3 Cache API
+  1.4 HTTP缓存
   +  强缓存
   +  协商缓存
  
+ 1.5 Push Cache

#### 二、发送请求
+ 2.1 避免不必要的重定向
  + 301
  + 302
  
+ 2.2 DNS与解析

+ 2.3 预先建立连接
  
+ 2.4 使用CDN
  
#### 三、服务端响应
+ 3.1 使用流进行响应
  
+ 3.2 业务接口内部聚合
  
+ 3.3 避免代码问题


#### 四、页面解析与处理
+ 4.1 资源位置顺序
  
+ 4.2 合理使用 defer / async 脚本

+ 4.3 关键渲染路径

+ 4.4 避免重排和重绘


#### 五、页面静态资源
+ 5.1 JavaScript
  + 减少不必要的请求
  + 减少包体大小
  + 加快解析与执行
  + 缓存

+ 5.2 CSS
  + 使用关键CSS
  + 优化资源请求
  + 减少包体大小
  + 加快解析与渲染树构建
  + 缓存

+ 5.3 图片
  + 优化请求
  + 减小图片大小
  + 缓存

+ 5.4 字体
  + 使用 font-display 实现 FOUT
  + 内联字体
  + 使用 CSS Font Loading API
  + FOFT

+ 5.5 视频
  + 使用合适的视频格式
  + 压缩视频
  + 移除不必要的音轨信息
  + 使用“流”
  + 移除页面中不必要的视频

#### 六、运行时
+ 6.1 注意强制同步布局
  + 避免代码出现在不合适的位置
  + 批量化操作

+ 6.2 长列表优化
  + 实现 Virtual List 机制
  + 原生 Virtual Scroller

+ 6.3 避免 JavaScript 运行占用事件过长
  + 任务拆解
  + 延迟执行
  + 并行计算

+ 6.4 善用 composite 机制
+ 6.5 滚动的性能优化
+ 6.6 Passive event listeners
#### 七、预加载
+ 7.1 预加载技术
  + Resource Hints
  + 基于 JavaScript 实现的预加载

+ 7.2 视屏预加载技术
  + preload 属性
  + link preload
  + 自定义 buffer

+ 7.3 预加载策略
  + quicklink
  + guess.js

![性能优化学习图谱](https://alienzhou.com/projects/fe-performance-journey/assets/img/overall.dcdd4140.svg)
## 参考
[前端性能优化之旅](https://alienzhou.com/projects/fe-performance-journey/#%E5%89%8D%E7%AB%AF%E9%9C%80%E8%A6%81%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E4%B9%88%EF%BC%9F)

[雅虎的性能优化35条](https://github.com/creeperyang/blog/issues/1)


