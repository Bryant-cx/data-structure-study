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

class LinkedList {
  constructor () {
    // 头结点
    let head = null
    // 链表长度
    let size = 0

    // 获取链表长度
    this.getSize = () => {
      return size
    }

    // 链表是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 向链表的头部添加节点
    this.addFirst = (val) => {
      // const node = new Node(val)
      // node.next = head
      // head = node
      head = new Node(val, head)
      size++
    }

    // 向链表索引为index处插入节点
    this.add = (index, val) => {
      if (index < 0 || index > size) {
        new Error('Invalid index')
      }

      if (index === 0) {
        this.addFirst(val)
      } else {
        let prev = head

        for (let i = 0; i < index; i++) {
          prev = prev.next
        }

        // const node = new Node(val)
        // node.next = prev.next
        // prev.next = node
        prev.next = new Node(val, prev.next)
        size++
      }
    }

    // 向链表结尾添加节点
    this.addLast = (val) => {
      this.add(size, val)
    }
  }
}