// leetcode链接：https://leetcode-cn.com/problems/min-stack

// [题目] 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。

/**
 * initialize your data structure here.
 */

// 思路：辅助栈
// 栈的特点是后进先出，所以如果栈中的元素有 a,b,c,d，那么如果a元素在栈中，b,c,d一定也还在栈中
// 所以可以在每次元素入栈时，和辅助栈中的栈顶元素做比较，如果比他小，就入辅助栈，最后辅助栈的栈顶元素即最小值

var MinStack = function () {
  this.x_stack = [];
  this.min_stack = [Infinity];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.x_stack.push(val);
  this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], val));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.x_stack.pop();
  this.min_stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.x_stack[this.x_stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

