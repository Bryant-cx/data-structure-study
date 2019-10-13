class Node {
  constructor (val = 0) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor () {
    let root = null
    let size = 0

    // 获取节点数量
    this.getSize = () => {
      return size
    }

    // 二分搜索树是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 向二分搜索树中添加节点
    this.add = (val) => {
      root = addNode(root, val)
      // 非递归写法
      // let cur = root

      // while (cur) {
      //   if (cur.val === val) return

      //   if (val < cur.val) {
      //     cur = cur.left
      //   } else {
      //     cur = cur.right
      //   }
      // }
      // cur = new Node(e)
      // 非递归写法
    }

    function addNode(node, val) {
      if (!node) {
        size++
        return new Node(val)
      }

      if (val < node.val) {
        node.left = addNode(node.left, val)
      } else if (val > node.val) {
        node.right = addNode(node.right, val)
      }

      return node
    }

    // 是否包含某元素
    this.contains = (val) => {
      return ifContains(root, val)
    }

    function ifContains (node, val) {
      if (!node) return false

      if (node.val === val) {
        return true
      }

      if (val < node.val) {
        return ifContains(node.left, val)
      }

      if (val > node.val) {
        return ifContains(node.right, val)
      }
    }

    // 前序遍历
    this.preOrder = () => {
      preOrderFunc(root)
    }

    function preOrderFunc (node) {
      if (!node) {
        return
      }

      console.log(node.val)
      preOrderFunc(node.left)
      preOrderFunc(node.right)
    }

    // 中序遍历
    this.inOrder = () => {
      inOrderFunc(root)
    }

    function inOrderFunc (node) {
      if (!node) {
        return
      }

      inOrderFunc(node.left)
      console.log(node.val)
      inOrderFunc(node.right)
    }

    // 后续遍历
    this.postOrder = () => {
      postOrderFunc(root)
    }

    function postOrderFunc (node) {
      if (!node) {
        return
      }

      postOrderFunc(node.left)
      postOrderFunc(node.right)
      console.log(node.val)
    }

    // 前序遍历的非递归写法
    this.preOrderNR = () => {
      const stack = [root]
      let cur = root

      while(stack.length > 0) {
        const node = stack.pop()

        if (!node) {
          return
        }

        console.log(node.val)

        if (node.right) {
          stack.push(node.right)
        }

        if (node.left) {
          stack.push(node.left)
        }
      }
    }

    // 层序遍历
    this.levelOrder = () => {
      const queue = [root]

      while (queue.length > 0) {
        const node = queue.shift()

        if (!node) {
          return
        }

        console.log(node.val)

        if (node.left) {
          queue.push(node.left)
        }

        if (node.right) {
          queue.push(node.right)
        }
      }
    }

    // 查询二分搜索树的最小值
    this.getMin = () => {
      if (size === 0) {
        throw Error('BST is empty')
      }

      return getMinFunc(root)

      // 非递归写法
      // let cur = root
      // while (cur) {
      //   if (!cur.left) {
      //     return cur.val
      //   }

      //   cur = cur.left
      // }
    }

    function getMinFunc (node) {
      if (!node.left) {
        return node.val
      }

      return getMinFunc(node.left)
    }

    // 查询二分搜索树的最大值
    this.getMax = () => {
      if (size === 0) {
        throw Error('BST is empty')
      }

      return getMaxFunc(root)

      // 非递归写法
      // let cur = root
      // while (cur) {
      //   if (!cur.right) {
      //     return cur.val
      //   }

      //   cur = cur.right
      // }
    }

    function getMaxFunc (node) {
      if (!node.right) {
        return node.val
      }

      return getMaxFunc(node.right)
    }

    // 删除二分搜索树的最小值
    this.removeMin = () => {
      const min = this.getMin()

      root = removeMinFunc(root)
      return min
    }

    function removeMinFunc (node) {
      if (!node.left) {
        const rightNode = node.right
        node.right = null
        size--
        return rightNode
      }

      node.left = removeMinFunc(node.left)
      return node
    }

    // 删除二分搜索树的最大值
    this.removeMax = () => {
      const max = this.getMax()

      root = removeMaxFunc(root)
      return max
    }

    function removeMaxFunc (node) {
      if (!node.right) {
        const leftNode = node.left
        node.left = null
        size--
        return leftNode
      }

      node.right = removeMaxFunc(node.right)
      return node
    }

    // 删除二分搜索树的任意节点
    this.remove = (val) => {
      if (size === 0) {
        throw Error('BST is empty')
      }

      root = removeElement(root, val)
    }

    function removeElement(node, val) {
      if (val < node.val) {
        node.left = removeElement(node.left, val)
        return node
      }

      if (val > node.val) {
        node.right = removeElement(node.right, val)
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

      const min = getMinFunc(node.right)
      const res = new Node(min)
      res.left = node.left
      res.right = removeMinFunc(node.right)
      node.left = node.right = null
      return res
    }
  }
}