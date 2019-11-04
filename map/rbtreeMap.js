class RBTreeMap {
  constructor () {
    const RED = true
    const BLACK = false

    class Node {
      constructor (key = null, val = null) {
        this.key = key
        this.val = val
        this.left = null
        this.right = null
        this.color = RED
      }
    }

    let root = null
    let size = 0

    // 获取map的元素个数
    this.getSize = () => {
      return size
    }

    // map是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // map中是否包含索引为key的值
    this.contains = (key) => {
      return contains(root, key)
    }

    // 查询map中索引为key的节点的值
    this.get = (key) => {
      return get(root, key)
    }

    // 向map中添加元素（key, val）
    this.put = (key, val) => {
      root = add(root, key, val)
      root.color = BLACK // 根节点固定为黑色
    }

    // 从map中删除索引为key的节点
    this.remove = (key) => {
      root = remove(root, key)
    }

    // 以node为根节点的红黑树中是否有索引为key的节点
    function contains (node, key) {
      if (!node) {
        return false
      }

      if (key < node.key) {
        return contains(node.left, key)
      } else if (key > node.key) {
        return contains(node.right, key)
      }

      return true
    }

    // 从以node为根节点的红黑树中获取索引为key的节点的值
    function get (node, key) {
      if (!node) {
        return
      }

      if (key < node.key) {
        return get(node.left, key)
      } else if (key > node.key) {
        return get(node.right, key)
      }

      return node.val
    }

    // 向以node为根节点的红黑树中添加节点（key, val)
    function add (node, key, val) {
      if (!node) {
        size++
        return new Node(key, val) // 插入默认节点
      }

      if (key < node.key) {
        node.left = add(node.left, key, val)
      } else if (key > node.key) {
        node.right = add(node.right, key, val)
      } else {
        node.val = val
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
     *          node                                          x
     *        /      \                  左旋                /     \
     *       t1       x               ------>            node     t3
     *              /   \                               /     \
     *             t2    t3                            t1      t2
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
     *              node                                      x
     *            /      \               右旋               /     \
     *           x        t1            ------>           z       node
     *         /   \                                             /     \
     *        z     t2                                          t2      t1
     */ 
    function rotateRight (node) {
      const x = node.left

      // 右旋
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

    // 获取最小节点
    function getMinNode (node) {
      while (node.left) {
        node = node.left
      }

      return node
    }

    // 是否为红色节点
    function isRed (node) {
      if (!node) {
        return BLACK
      }

      return node.color
    }

    // 从以node为根节点的红黑树中删去索引为key的节点
    function remove(node, key) {
      if (!node) {
        return
      }

      if (key < node.key) {
        node.left = remove(node.left, key)
        return node
      } else if (key > node.key) {
        node.right = remove(node.right, key)
        return node
      } else {
        if (!node.left) {
          const rightNode = node.right
          node.right = null
          size--
          return rightNode
        }

        if (!node.right) {
          const leftNode = node.left
          node.left = null
          size--
          return leftNode
        }

        const min = getMinNode(node.right)
        const succsor = new Node(min.key, min.val)
        succsor.left = node.left
        succsor.right = remove(node.right, min.key)
        node.left = node.right = null

        return succsor
      }
    }
  }
}