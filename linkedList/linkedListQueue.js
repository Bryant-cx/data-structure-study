/**
 * @param val 节点的值
 * @param next 下一个节点
 */
class Node {
  constructor (val = null, next = null) {
    this.val = val
    this.next = next
  }
}

class LinkedListQueue {
  constructor () {
    let head = null
    let tail = null
    let size = 0

    // 获取队列长度
    this.getSize = () => {
      return size
    }

    // 队列是否为空
    this.isEmpty = () => {
      return size === 0
    }

    /**
     * 入队
     * @param {*} val 
     * 如果入队前队列为空，则入队之后head和tail均指向新增节点
     */
    this.enQueue = (val) => {
      if (!tail) {
        tail = new Node(val)
        head = tail
      } else {
        tail.next = new Node(val)
        tail = tail.next
      }
      size++
    }

    /**
     * 出队
     * 如果队列只有一个元素，则出队之后，head和tail均要置空
     */
    this.deQueue = () => {
      if (this.isEmpty()) {
        throw Error('Can not dequeue from an empty queue')
      }
      const retNode = head
      head = head.next
      retNode.next = null

      if (!head) {
        tail = null
      }
      size--
    }

    // 查看队首元素
    this.getFront = () => {
      if (this.isEmpty()) {
        throw Error('The queue is empty')
      }

      return head.val
    }

    // 打印输出
    this.toString = () => {
      let res = 'linkedListQueue: head '
      let cur = head

      while (cur) {
        res += cur.val
        res += '-->'
        cur = cur.next
      }

      res += 'NULL tail'

      return res
    }
  }
}