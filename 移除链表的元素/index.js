/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 不适用虚拟头结点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    while (head && head.val === val) {
      const delNode = head
      head = head.next
      delNode.next = null
    }

    if (!head) {
      return null
    }

    let cur = head
    while (cur.next) {
      if (cur.next.val === val) {
        const delNode = cur.next
        cur.next = delNode.next
        delNode.next = null
      } else {
        cur = cur.next
      }
    }

    return head
};

/**
 * 使用虚拟头结点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements2 = function(head, val) {
    const dummyHead = new ListNode(-1)
    dummyHead.next = head

    let cur = dummyHead
    while (cur.next) {
      if (cur.next.val === val) {
        const delNode = cur.next
        cur.next = delNode.next
        delNode.next = null
      } else {
        cur = cur.next
      }
    }

    return dummyHead.next
};