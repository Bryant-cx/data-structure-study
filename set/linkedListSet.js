class Node {
  constructor (val = null) {
    this.val = val
    this.next = null
  }
}

class LinkedListSet {
  constructor () {
    let head = null
    let size = 0

    // 获取集合长度
    this.getSize = () => {
      return size
    }

    // 集合是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 集合是否包含某元素
    this.contains = (val) => {
      let cur = head

      while(cur) {
        if (cur.val === val) {
          return true
        }

        cur = cur.next
      }

      return false
    }

    // 向集合中添加元素
    this.add = (val) => {
      if (!this.contains(val)) {
        const node = new Node(val)

        node.next = head
        head = node
        size++
      }
    }

    // 删除集合的元素
    this.remove = (val) => {
      if (this.contains(val)) {
        let dummyHead = new Node(null)
        dummyHead.next = head

        let cur = dummyHead

        while (cur.next) {
          if (cur.next.val === val) {
            const delNode = cur.next
            cur.next = delNode.next
            delNode.next = null
            size--
          } else {
            cur = cur.next
          }
        }

        head = dummyHead.next
      }
    }

    // 打印集合
    this.toString = () => {
      let res = 'set ['
      let cur = head

      while (cur) {
        res += ' ' + cur.val

        if (cur.next) {
          res += ','
        }

        cur = cur.next
      }

      res += ']'
      return res
    }
  }
}