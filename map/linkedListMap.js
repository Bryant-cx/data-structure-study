class Node {
  constructor (key = null, val = null) {
    this.key = key
    this.val = val
    this.next = null
  }
}

class LinkedListMap {
  constructor () {
    let head = null
    let size = 0

    // 获取映射长度
    this.getSize = () => {
      return size
    }

    // 映射是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 映射中是否包含key
    this.contains = (key) => {
      let cur = head

      while (cur) {
        if (cur.key === key) {
          return true
        }

        cur = cur.next
      }

      return false
    }

    // 向集合中添加元素（key, val）
    this.add = (key, val) => {
      if (!this.contains(key)) {
        const node = new Node(key, val)
        node.next = head
        head = node
        size++
      }
    }

    // 修改集合中的元素，如果不存在就添加一个新元素
    this.set = (key, val) => {
      if (this.contains(key)) {
        let cur = head
        while (cur) {
          if (cur.key === key) {
            cur.val = val
            return
          }

          cur = cur.next
        }
      } else {
        this.add(key, val)
      }
    }

    // 删除集合中的元素key
    this.remove = (key) => {
      if (this.isEmpty()) {
        throw Error('The map is empty')
      }

      let dummyHead = new Node()
      dummyHead.next = head
      let cur = dummyHead

      while (cur.next) {
        if (cur.next.key === key) {
          const delNode = cur.next
          cur.next = delNode.next
          delNode.next = null
          size--
          return
        }

        cur = cur.next
      }

      head = dummyHead.next
    }

    // 打印输出
    this.toString = () => {
      let res = 'map [ '
      let cur = head

      while (cur) {
        res += `{key: ${cur.key}, val: ${cur.val}}`

        if (cur.next) {
          res += ', '
        }
        cur = cur.next
      }

      res += ']'
      return res
    }
  }
}