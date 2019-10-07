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
    // let head = null
    // 虚拟头节点
    let dummyHead = new Node(null, null)
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

    // 向链表索引为index处插入节点
    this.add = (index, val) => {
      if (index < 0 || index > size) {
        throw Error('Invalid index')
      }

      let prev = dummyHead

      for (let i = 0; i < index; i++) {
        prev = prev.next
      }

      // const node = new Node(val)
      // node.next = prev.next
      // prev.next = node
      prev.next = new Node(val, prev.next)
      size++
    }

    // 向链表的头部添加节点
    this.addFirst = (val) => {
      // const node = new Node(val)
      // node.next = head
      // head = node
      // head = new Node(val, head)
      this.add(0, val)
    }

    // 向链表结尾添加节点
    this.addLast = (val) => {
      this.add(size, val)
    }

    // 获取索引为index处的节点的值
    this.get = (index) => {
      if (index < 0 || index >= size) {
        throw Error('Invalid index')
      }

      let cur = dummyHead.next

      for (let i = 0; i < index; i++) {
        cur = cur.next
      }

      return cur.val
    }

    // 获取首元素
    this.getFirst = () => {
      return this.get(0)
    }

    // 获取尾元素
    this.getLast = () => {
      return this.get(size - 1)
    }

    // 是否包含某元素
    this.contains = (val) => {
      let cur = dummyHead.next

      while (cur) {
        if (cur.val === val) {
          return true
        }
      }

      return false

      // for (let cur = dummyHead.next; cur; cur = cur.next) {
      //   if (cur.val === val) {
      //     return true
      //   }
      // }

      // return false
    }

    // 打印输出
    this.toString = () => {
      let res = ''
      let cur = dummyHead.next

      while (cur) {
        res = res + cur.val + '-->'
        cur = cur.next
      }

      return res + 'NULL'
    }

    // 删除元素
    this.remove = (index) => {
      let prev = dummyHead

      for (let i = 0; i < index; i++) {
        prev = prev.next
      }

      const node = prev.next
      prev.next = node.next
      node.next = null
      size--

      return node.val
    }

    // 删除首元素
    this.removeFirst = () => {
      return this.remove(0)
    }

    // 删除尾元素
    this.removeLast = () => {
      return this.remove(size - 1)
    }
  }
}