class RBTreeSet {
  constructor () {
    const RED = true
    const BLACK = false

    class Node {
      constructor (val) {
        this.val = val
        this.left = null
        this.right = null
        this.color = RED // 默认新增一个红节点
      }
    }

    let root = null
    let size = 0

    // 获取set长度
    this.getSize = () => {
      return size
    }

    // set是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // set中是否存在val
    this.contains = (val) => {
      return contains(root, key)
    }

    // 向set中添加val
    this.add = (val) => {
      root = add(root, val)
      root.color = BLACK // 根节点必须为黑节点
    }

    // 从set中删去val
    this.remove = (val) => {
      root = remove(root, val)
    }

    // 以node为根节点的红黑树中是否存在val
    function contains (node, val) {
      if (!node) {
        return false
      }

      if (val < node.val) {
        return contains(node.left, val)
      } else if (val > node.val) {
        return contains(node.right, val)
      }

      return true
    }

    // 向以node为根节点的红黑树中添加val
    function add (node, val) {
      if (!node) {
        size++
        return new Node(val)
      }

      if (val < node.val) {
        node.left = add(node.left, val)
      } else if (val > node.val) {
        node.right = add(node.right, val)
      }

      // 是否需要左旋
      if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node)
      }

      // 是否需要右旋
      if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node)
      }

      // 是否需要颜色翻转
      if (isRed(node.left) && isRed(node.right)) {
        flicpColor(node)
      }

      return node
    }

    /**
     * 左旋操作
     *      node                                              x
     *    /      \                   左旋                   /     \
     *   t1       x                 ------>               node    t3
     *          /   \                                    /    \
     *         t2    t3                                 t1     t2
     */
    function rotateLeft (node) {
      const x = node.right

      // 左旋
      node.right = x.left
      x.left = node

      x.color = node.color
      node.color = RED
      
      return x
    }

    /**
     * 右旋操作
     *              node                                          x
     *            /      \               右旋                   /     \
     *          x         t1            ------>               z       node
     *        /   \                                                  /    \
     *       z     t2                                               t2     t1
     */
    function rotateRight (node) {
      const x = node.left

      node.left = x.right
      x.right = node

      x.color = node.color
      node.color = RED

      return x
    }

    // 颜色翻转
    function flicpColor (node) {
      node.color = RED
      node.left.color = BLACK
      node.right.color = BLACK
    }

    // 查看节点是否为红节点
    function isRed (node) {
      if (!node) {
        return BLACK
      }

      return node.color
    }

    // 从以node为根节点的红黑树中删除val
    function remove (node, val) {
      if (!node) {
        return
      }

      if (val < node.val) {
        node.left = remove(node.left, val)
        return node
      } else if (val > node.val) {
        node.right = remove(node.right, val)
        return node
      }

      if (!node.left) {
        const rightNode = node.right
        size--
        node.right = null
        return rightNode
      } else if (!node.right) {
        const leftNode = node.left
        size--
        node.left = null
        return leftNode
      } else {
        const min = getMinNode(node.right)
        const succsor = new Node(min.val)
        succsor.left = node.left
        succsor.right = remove(node.right, min.val)
        node.left = node.right = null

        return succsor
      }
    }

    // 获取以node为根节点的最小节点
    function getMinNode (node) {
      while (node.left) {
        node = node.left
      }

      return node
    }
  }
}