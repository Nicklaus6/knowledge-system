// leetcode链接：https://leetcode-cn.com/problems/decode-string/

// [题目] 给定一个经过编码的字符串，返回它解码后的字符串。

// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

// 例如：
// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"

// 输入：s = "3[a2[c]]"
// 输出："accaccacc"

// [思路]：辅助栈 + 由内向外层层拆解
// 遍历 s ，当遇到 [ 就要入栈，遇到 ] 就要出栈了。

// 数字: 一定出现在 [ 前面，存入数字栈，做倍数
// [ : 数字要存下来做“倍数”,字母也要存下来
// ] : 遇到 ] ，就可以弹出了

// 输入：s = "30[a22[f]]"
// 输出："30[a[22f]]"

/**
 * @param {string} s
 * @return {string}
 */
const decodeString = function (s) {
  let strStack = []; // 存放等待拼接的字符串
  let numStack = []; // 存放倍数
  let num = 0;
  let result = "";
  for (const char of s) {
    if (!isNaN(char)) {
      num = num * 10 + Number(char); // 倍数不一定是个位数哦
    } else if (char === "[") {
      strStack.push(result);
      numStack.push(num);
      result = ""; // 字符串清零
      num = 0; // 倍数清零
    } else if (char === "]") {
      // 计算字符串
      let repeatTimes = numStack.pop();
      result = strStack.pop() + result.repeat(repeatTimes); // 别忘了拼上栈中等待拼接的字符串
    } else {
      result += char; // 遇到字母，加入字符串
    }
  }
  return result;
};

let s = "3[a2[f]]";

console.time(1);
decodeString(s);
console.timeEnd(1);
