class RBTree {
  constructor () {    
    class Node {
      constructor (key = null, val = null) {
        this.key = key
        this.val = val
        this.left = null
        this.right = null
        this.color = RED // 新增节点默认为黑色
      }
    }

    const RED = true
    const BLACK = false

    let root = null
    let size = 0

    // 红黑树是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 红黑树的节点个数
    this.getSize = () => {
      return size
    }

    // 红黑树中是否含有索引为key的节点
    this.contains = (key) => {
      return contains(root, key)
    }

    // 获取红黑树中索引为key的val
    this.get = (key) => {
      return get(root, key)
    }

    // 向红黑树中添加节点
    this.add = (key, val) => {
      root = addNode(root, key, val)
      root.color = BLACK // 红黑树的根节点始终为黑色
    }

    // 删除红黑树的节点
    this.remove = (key) => {
      root = remove(root, key)
    }

    // 向以node为根节点的红黑树中添加节点
    // 
    function addNode (node, key, val) {
      if (!node) {
        size++
        return new Node(key, val)
      }

      if (key < node.key) {
        node.left = addNode(node.left, key, val)
      } else if (key > node.key) {
        node.right = addNode(node.right, key, val)
      } else {
        node.val = val
      }

      // 是否需要进行左旋操作
      if (isRed(node.right) && !isRed(node.left)) {
        node = rotateLeft(node)
      }

      // 是否需要进行右旋操作
      if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node)
      }

      // 是否需要进行颜色翻转
      if (isRed(node.left) && isRed(node.right)) {
        flipColors(node)
      }

      return node
    }

    // 左旋操作
    //     node                                       x
    //   /      \             左旋                  /     \
    //  t1       x            ---->               node    t3
    //         /   \                            /      \
    //        t2    t3                         t1       t2
    function rotateLeft (node) {
      const x = node.right
      const t2 = x.left

      //左旋
      node.right = t2
      x.left = node

      x.color = node.color
      node.color = RED

      return x
    }

    // 右旋操作
    //            node                                            x
    //          /      \              右旋                      /     \
    //         x        t1          ------->                  z        node
    //      /     \                                                  /      \
    //     z       t2                                               t2       t1
    function rotateRight (node) {
      const x = node.left

      // 右旋
      node.left = x.right
      x.right = node

      x.color = node.color
      node.color = RED

      return x
    }

    // 节点是否为红色
    function isRed (node) {
      if (!node) {
        return BLACK
      }

      return node.color
    }

    // 删除以node为根节点的红黑树的索引为key的节点
    function remove (node, key) {
      if (!node) {
        return
      }

      if (key < node.key) {
        node.left = remove(node.left, key)
        return node
      } else if (key > node.key) {
        node.right = remove(node.right, key)
        return node
      } else { // key === node.key
        if (!node.left) {
          const rightNode = node.right
          node.right = null
          size--
          return rightNode
        } else if (!node.right) {
          const leftNode = node.left
          node.left = null
          size--
          return leftNode
        } else {
          const min = getMinNode(node.right)
          const succsor = new Node(min.key, min.val)
          succsor.left = node.left
          succsor.right = remove(node.right, min.key)

          return succsor
        }
      }
    }

    // 获取以node为根节点的最小节点
    function getMinNode (node) {
      while (node.left) {
        node = node.left
      }

      return node
    }

    // 颜色翻转
    function flipColors (node) {
      node.color = RED
      node.left.color = BLACK
      node.right.color = BLACK
    }

    // 以node为根节点的红黑树中是否包含索引为key的节点
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

    // 获取索引为key的节点的值
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
  }
}