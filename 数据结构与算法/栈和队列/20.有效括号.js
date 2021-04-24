// leetcode链接：https://leetcode-cn.com/problems/valid-parentheses

// [题目]给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 思路：
// 如果字符串长度为或奇数 false
// 将所有左括号放入栈中 做匹配消除 当弹出当左括号当数量 === 剩余的右括号  true

/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
  let stringLength = s.length;
  // 如果 字符串为空 或者 为奇数 肯定不合法
  if (stringLength === 0 || stringLength % 2 === 1) {
    return false;
  }

  let stack = [];
  for (let i = 0; i < stringLength; i++) {
    let bracket = s[i];

    // 取出字符 如果是左括号，压栈
    if (bracket === "(" || bracket === "[" || bracket === "{") {
      stack.push(bracket);
      // 如果是右括号，栈中如果没有括号或者栈中弹出的不是对应的左括号，false
    } else if (bracket === ")") {
      if (!stack.length || stack[stack.length - 1] !== "(") {
        return false;
      }
      stack.pop();
    } else if (bracket === "]") {
      if (!stack.length || stack[stack.length - 1] !== "[") {
        return false;
      }
      stack.pop();
    } else if (bracket === "}") {
      if (!stack.length || stack[stack.length - 1] !== "{") {
        return false;
      }
      stack.pop();
    } else {
      return false;
    }
  }
  return !stack.length;
};

isValid('()');
isValid('()[]{}');
isValid('([{}])');
isValid("([)]");
isValid("({})[()]")
