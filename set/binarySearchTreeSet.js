class Node {
  constructor (val = null) {
    this.val = val
    this.next = null
    this.right = null
  }
}

class BSTSet {
  constructor () {
    let size = 0
    let root = null

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
      return containsFunc(root, val)
    }

    // 向集合中添加元素
    this.add = (val) => {
      root = addElement(root, val)
    }

    // 删除集合中的元素
    this.remove = (val) => {
      if (this.isEmpty()) {
        throw Error('Set is empty')
      }
      root = removeElement(root, val)
    }

    // 中序遍历
    this.inOrder = () => {
      inOrderFunc(root)
    }

    function inOrderFunc (node) {
      if (!node) {
        return
      }

      if (node.left) {
        inOrderFunc(node.left)
      }
      console.log(node.val)
      if (node.right) {
        inOrderFunc(node.right)
      }
    }

    // 删除集合中的元素
    function removeElement (node, val) {
      if (!node) {
        return null
      }

      if (val < node.val) {
        node.left = removeElement(node.left, val)
        return node
      }

      if (val > node.val) {
        node.right = removeElement(node.right, val)
        return node
      }

      size--
      if (!node.left) {
        return node.right
      }

      if (!node.right) {
        return node.left
      }

      const min = getMinNode(node.right).val
      const successor = new Node(min)
      successor.left = node.left
      successor.right = removeMinNode(node.right)

      return successor
    }

    // 获取最小节点
    function getMinNode (node) {
      if (!node.left) {
        return node
      }

      return getMinNode(node.left)
    }


    // 获取最大节点
    function getMaxNode (node) {
      if (!node.right) {
        return node
      }

      return getMaxNode(node.right)
    }


    // 删除最小节点
    function removeMinNode (node) {
      if (!node.left) {
        const rightNode = node.right
        node.right = null
        size--
        return rightNode
      }

      node.left = removeMinNode(node.left)
      return node
    }

    // 删除最大节点
    function removeMaxNode (node) {
      if (!node.right) {
        const leftNode = node.left
        node.left = null
        size--
        return leftNode
      }

      node.right = removeMaxNode(node.right)
      return node
    }

    // 向二分搜索树中添加元素
    function addElement (node, val) {
      if (!node) {
        size++
        return new Node(val) 
      }

      if (val < node.val) {
        node.left = addElement(node.left, val)
      } else if (val > node.val) {
        node.right = addElement(node.right, val)
      }

      return node
    }

  }
}

function containsFunc (node, val) {
  if (!node) {
    return false
  }

  if (node.val === val) {
    return true
  }

  if (val < node.val) {
    return containsFunc(node.left)
  }

  if (val > node.val) {
    return containsFunc(node.right)
  }
}
