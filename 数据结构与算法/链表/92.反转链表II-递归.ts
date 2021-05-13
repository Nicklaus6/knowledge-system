// leetcode链接：https://leetcode-cn.com/problems/reverse-linked-list-ii

// [题目] 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。


// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]

// 思路：
// 考虑边界情况： 如果链表只有一个节点的时候反转也是它自己，直接返回即可

// 我们的 reverse 函数定义是这样的：
// 输入一个节点 head，将「以 head 为起点」的链表反转，并返回反转之后的头结点。

// 当链表递归反转之后，新的头结点是 last，而之前的 head 变成了最后一个节点，别忘了链表的末尾要指向 null

// 参考 https://labuladong.github.io/algo/2/17/16/

function ListNode(val, next) {
       this.val = (val===undefined ? 0 : val)
       this.next = (next===undefined ? null : next)
   }
  

let sucessor = null;
// 反转链表前 n 个 元素
let reverseN = function (head,n) {
  if(!head) return 
  if (n === 1) {
    // 记录后驱结点
    sucessor = head.next;
    return head
  };
  // 以 head.next 为起点。反转前 n-1 个结点
  let last = reverseN(head.next,n);
  head.next.next = head;
  // 让反转之后的 head 节点和后面的节点连起来
  head.next = sucessor;
  return last
}

var reverseBetween = function(head, left, right) {
  if(!head) return 
  if (left = 1) {
    // 反转链表前 n 个 元素
    return reverseN(head,right)
  }
  head.next = reverseBetween(head.next, m - 1, n - 1)
  console.log(head)
  return head
};

let ln = new ListNode(1,2)
reverseBetween(ln,1,2)