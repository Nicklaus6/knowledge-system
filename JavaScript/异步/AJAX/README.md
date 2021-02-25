# AJAX
> AJAX是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

## 什么是 AJAX？
AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。

AJAX 是一种用于创建 **快速动态网页** 的技术。

通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现 **异步更新** 。

传统的网页（不使用 AJAX） 如果需要更新内容，必须重载整个网页。

比如 Google Suggest 使用 AJAX 创造出动态性极强的 web 界面：当我们在谷歌搜索框输入关键字时，JS 会把这些字符发送到服务器，然后服务器会返回一个搜索建议的列表。

## XMLHttpRequest
所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 `XMLHttpRequest` 对象。（IE5 和 IE6 使用 ActiveXObject）。它允许使用 JavaScript 发送 HTTP 请求。

`XMLHttpRequest` 用于 在后台 **与服务器交换数据** ，这意味着可以在不重新加载整个网页的情况下更新页面某部分。

虽然它的名字里面有 “XML” 一词，但它可以 **操作任何数据** ，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度等。

#### 异步模式下如何发送请求：

XMLHttpRequest 有两种执行模式：同步（synchronous）和异步（asynchronous）。

异步模式是最常用的。

1. **创建 `XMLHttpRequest`:**

   ```js
   let xhr = new XMLHttpRequest()
   ```

   此构造器没有参数

2. **初始化。**

   ```javascript
   xhr.open(method, URL, [async, user, password])
   ```

   此方法指定请求的主要参数：

   + `method` —— HTTP 方法。通常是 `"GET"` 或`"POST"`。
   + `URL` —— 要请求的URL，通常是一个字符串，也可以是 [URL](https://zh.javascript.info/url) 对象。
   + `async` —— 如果设置为 `false`，那么请求将会以 **同步** 的方式处理。
   + `user`, `password` —— HTTP 基本身份验证（如果需要的话）的登录名和密码。

3. **发送请求。**

   ```javascript
   xhr.send([body])
   ```

   这个方法会建立连接，并将请求发送到服务器，可选参数 `body` 包含了 request body。

   一些请求方法（如 `GET`）没有 request body。还有一些请求方法（如 `POST`）使用 `body` 将数据发送到服务器。

   **`GET` 还是 `POST` ?**

   与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。

   然而以下情况请用 POST：

   + 无法使用缓存文件（更新服务器上的文件或数据库）
   + 向服务器发送大量数据（POST 没有数据量限制）
   + 发送包含位置字符的用户输入时，POSE 比 GET 更稳定可靠

4. **监听 `xhr` 事件以获取响应**

   三个常用事件：

   + `load` —— 当请求完成（即使 HTTP 状态为 400 或 500 等），并且响应已完全下载。
   + `error` —— 当无法发出请求，例如网络中断或无效 URL。
   + `progress` —— 在下载响应期间定期触发，报告已下载了多少。

   ```javascript
   xhr.onload = function() {
     alert(`Loaded: ${xhr.status} ${xhr.response}`);
   };
   
   xhr.onerror = function() { // 仅在根本无法发出请求时触发
     alert(`Network Error`);
   };
   
   xhr.onprogress = function(event) { // 定期触发
     // event.loaded —— 已经下载了多少字节
     // event.lengthComputable = true，当服务器发送了 Content-Length header 时
     // event.total —— 总字节数（如果 lengthComputable 为 true）
     alert(`Received ${event.loaded} of ${event.total}`);
   };
   ```

下面是一个完整的示例。它从服务器加载 `/article/xmlhttprequest/example/load`，并打印加载进度：

```js
// 1. 创建一个 XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 2. 配置他：从 URL /article/.../load GET-request
xhr.open('GET', '/article/xmlhttprequest/example/load')

// 3. 通过网络发送请求
xhr.send();

// 4. 接收到响应后，调用此函数
xhr.onload = function() {
  if(xhr.status !== 200) { // 分析响应的 HTTP 状态
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
  } else { // 显示结果
    alert(`Done,got ${xhr.response.length} bytes`); // response 是服务器响应
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // 没有 Content-Length
  }
};

xhr.onerror = function() {
  alert("Request failed");
};
```

一旦服务器有了响应，我们可以在以下 `xhr` 属性中接收结果：

+ `status`

  HTTP 状态码（一个数字）：`200`，`404`，`403` 等，如果出现非 HTTP 错误，则为 `0`。

+ `statusText`

  HTTP 状态消息（一个字符串）：状态码为 `200` 对应于 `OK`，`404` 对应于 `Not Found`，`403` 对应于 `Forbidden`。

+ `response`（旧脚本可能用的是 `responseText`）

  服务器 response body。

+ `timeout`

  指定超时，如果在给定时间内请求没有成功执行，请求就会被取消，触发 `timeout`

#### readyState

`XMLHttpRequest` 的状态（state）会随着它的处理进度变化而变化。可以通过 `xhr.readyState` 来了解当前状态。

```js
UNSENT = 0; // 初始状态
OPENED = 1; // 服务器连接已建立，open 被调用
HEADERS_RECEIVED = 2; // 接收到 response header
LOADING = 3; // 响应正在被加载（接收到一个数据包）
DONE = 4; // 请求完成
```

`XMLHttpRequest` 对象以 `0` → `1` → `2` → `3` → … → `3` → `4` 的顺序在它们之间转变。每当通过网络接收到一个数据包，就会重复一次状态 `3`。

我们可以使用 `readystatechange` 事件来跟踪它们：

```javascript
xhr.onreadystatechange = function() {
	if (xhr.readyState === 3) {
		// 加载中
	}
	if (xhr.readyState === 4) {
		// 请求完成
	}
}
```

## 参考

+ [XMLHttpRequest](https://zh.javascript.info/xmlhttprequest#xmlhttprequest-ji-chu)