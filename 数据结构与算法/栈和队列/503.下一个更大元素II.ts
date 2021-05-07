// leetcode链接：https://leetcode-cn.com/problems/next-greater-element-ii

// [题目] 给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。数字 x 的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。

// 示例
// 输入: [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数；
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。

// 套路：
// 单调栈 —— 从右向左维护一个单调递减栈
// 循环数组 —— 两倍长度数组 + %索引取模

function nextGreaterElements(nums: number[]): number[] {
  let n = nums.length;
  let res: number[] = new Array(n);
  let stack: number[] = [];
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop(); // 矮个子起开
    }
    res[i % n] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(nums[i % n]);
  }
  return res;
}

nextGreaterElements([1, 2, 1]);

// 参考：https://labuladong.github.io/algo/2/19/40/
