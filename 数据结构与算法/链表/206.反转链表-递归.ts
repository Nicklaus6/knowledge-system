// leetcode链接：https://leetcode-cn.com/problems/reverse-linked-list/

// [题目] 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

// 思路：
// 考虑边界情况： 如果链表只有一个节点的时候反转也是它自己，直接返回即可

// 我们的 reverse 函数定义是这样的：
// 输入一个节点 head，将「以 head 为起点」的链表反转，并返回反转之后的头结点。

// 当链表递归反转之后，新的头结点是 last，而之前的 head 变成了最后一个节点，别忘了链表的末尾要指向 null

// 参考 https://labuladong.github.io/algo/2/17/16/

import { ListNode } from "./206.反转链表-循环";

function reverseList(head: ListNode | null): ListNode | null {
  if (head.next == null) return head;
  let last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}

