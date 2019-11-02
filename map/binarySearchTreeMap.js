class BSTMap {
  constructor () {
    let size = 0
    let root = null

    class Node {
      constructor (key = null, val = null) {
        this.key = key
        this.val = val
        this.left = null
        this.right = null
      }
    }

    this.getSize = () => {
      return size
    }

    this.isEmpty = () => {
      return size === 0
    }

    // map是否包含key
    this.contains = (key) => {
      return containElement(root, key)
    }

    // 向映射中添加元素（key, val）
    this.put = (key, val) => {
      root = putElement(root, key, val)
    }

    // 删除元素
    this.remove = (key) => {
      if (this.isEmpty()) {
        // throw Error('map is empty')
        return
      }

      root = removeElement(root, key)
    }

    // 前序遍历
    this.inOrder = () => {
      const stack = [root]
      let res = 'map ['

      while (stack.length > 0) {
        const node = stack.pop()
        res += `{key: ${node.key}, val: ${node.val}}`

        if (node.right) {
          stack.push(node.right)
        }

        if (node.left) {
          stack.push(node.left)
        }

        if (stack.length > 0) {
          res += ', '
        }
      }

      res += ']'

      return res
    }

    // 添加元素，如果key已存在，更新val
    function putElement (node, key, val) {
      if (!node) {
        size++
        return new Node(key, val)
      }

      if (key < node.key) {
        node.left = putElement(node.left, key, val)
      } else if (key > node.key) {
        node.right = putElement(node.right, key, val)
      } else {
        node.val = val
      }

      return node
    }

    // 查询最小节点
    function findMinNode (node) {
      if (!node.left) {
        return node
      }

      return findMinNode(node.left)
    }

    // 查询最大节点
    function findMaxNode (node) {
      if (!node.right) {
        return node
      }

      return findMaxNode(node.right)
    }

    // 删除最小节点
    function delMinNode (node) {
      if (!node.left) {
        const rightNode = node.right
        node.right = null
        size--
        return rightNode
      }

      node.left = delMinNode(node.left)
      return node
    }

    // 删除最大节点
    function delMaxNode (node) {
      if (!node.right) {
        const leftNode = node.left
        node.left = null
        size --
        return leftNode
      }

      node.right = delMaxNode(node.right)
      return node
    }

    // 删除任意节点
    function removeElement (node, key) {
      if (!node) {
        return
      }

      if (key < node.key) {
        node.left = removeElement(node.left, key)
        return node
      }

      if (key > node.key) {
        node.right = removeElement(node.right, key)
        return node
      }

      if (!node.left) {
        size--
        return node.right
      }

      if (!node.right) {
        size--
        return node.left
      }

      const min = findMinNode(node.right)
      const successor = new Node(min.key, min.val)
      successor.right = delMinNode(node.right)
      successor.left = node.left
      node.left = node.right = null

      return successor
    }
  }
}

function containElement (node, key) {
  if (!node) {
    return false
  }

  if (key < node.key) {
    return containElement(node.left, key)
  }

  if (key > node.key) {
    return containElement(node.right, key)
  }

  return true
}