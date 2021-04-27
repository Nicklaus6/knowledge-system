// leetcode链接：https://leetcode-cn.com/problems/daily-temperatures

// [题目] 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。

// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，
// 你的输出应该是                    [1,  1,  4,  2,  1,  1,  0,  0]。

// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

// 思路：
// 遍历数组，每个值都想后面找比它大的值。如果比他大，就大值入栈，自己出栈；如果比他小，就压栈
// 大数消除小数，所以是递减单调栈

/**
 *
 * @param {number[]} T
 * @return {number[]}
 */
let dailyTemperatures = function (T) {
  let stack = []; // 递减栈
  let tLength = T.length;
  let res = Array(tLength).fill(0)

  for (let i = 0; i < tLength; i++) {
    // 如果栈不为空，且 当前元素大于栈顶元素
    while(stack.length && T[i] > T[stack[stack.length - 1]]) {
      let stackTopIndex = stack.length - 1
      // 成功消除，存入下标差
      res[stack[stackTopIndex]] = i - stack[stackTopIndex];
      stack.pop();
    }
    // 存入下标
    stack.push(i);
  }
  console.log(res);
  return res;
};

let temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
dailyTemperatures(temperatures);

// 单调栈套路：
// 递增栈（递减栈）的定义是通过【出栈】的顺序是递增还是递减决定的。
// 单调递增栈：从 栈底 到 栈顶 递增，栈顶大
// 单调递减栈：从 栈底 到 栈顶 递减，栈顶小
// 当前项向左找第一个比自己【大】的位置 —— 从左向右维护一个单调递减栈
// 当前项向左找第一个比自己【小】的位置 —— 从左向右维护一个单调递增栈
