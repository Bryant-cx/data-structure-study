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

    function addNode(root, val) {
      if (!root) {
        size++
        return new Node(val)
      }

      if (val < root.val) {
        root.left = addNode(root.left, val)
      } else if (val > root.val) {
        root.right = addNode(root.right, val)
      }

      return root
    }
  }
}