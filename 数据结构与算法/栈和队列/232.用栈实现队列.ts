// leetcode链接：https://leetcode-cn.com/problems/implement-queue-using-stacks

// [题目] 
// 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：
// 实现 MyQueue 类：

// void push(int x) 将元素 x 推到队列的末尾
// int pop() 从队列的开头移除并返回元素
// int peek() 返回队列开头的元素
// boolean empty() 如果队列为空，返回 true ；否则，返回 false
//  

// 说明：

// 你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
//  

// 进阶：

// 你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。


// 思路：
// 栈 —— 后进先出；队列 —— 先进先出
// 双栈实现。队列pop的是尾部元素。可以让元素先入栈1，然后再全部弹出，存入栈2，这样栈2就是先进先出的顺序了。

class MyQueue{
  s1: number[];
  s2: number[]
  
  constructor() {
   this.s1 = [];
   this.s2 = [];
  }

  push(x: number): void {
    this.s1.push(x)
  }

  pop(): number {
    this.peek();
    return this.s2.pop()
  }

  peek(): number {
    if(!this.s2.length){
      while(this.s1.length){
        this.s2.push(this.s1.pop())
      }
    }
    return this.s2[this.s2.length - 1]
  }

  empty(): boolean {
    return !this.s1.length && !this.s2.length
  }
}

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/


