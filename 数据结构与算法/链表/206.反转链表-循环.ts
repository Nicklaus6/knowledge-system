// leetcode链接：https://leetcode-cn.com/problems/reverse-linked-list/

// [题目] 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

// 思路：
// 保存下一个结点的值

//Definition for singly-linked list.
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }
  let cur = head,
    prev = null;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next
  }
  return prev;
}
