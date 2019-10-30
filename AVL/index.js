class Node {
  constructor (key = null, val = null) {
    this.key = key
    this.val = val
    this.left = null
    this.right = null
    // 节点的初始高度为1
    this.height = 1
  }
}

class AVLTree {
  constructor () {
    let root = null
    let size = 0

    // 获取节点个数
    this.getSize = () => {
      return size
    }

    // 是否包含索引为key的节点
    this.contains = (key) => {
      return contains(root, key)
    }

    // avltree是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 获取索引为key的值
    this.get = (key) => {
      return get(root, key)
    }

    // 是否是二分搜索树
    this.isBST = () => {
      const arr = []
      inOrder(root, arr)

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
          return false
        }
      }

      return true
    }

    // 是否是平衡二叉树
    this.isBalanced = () => {
      return isBalanced(root)
    }

    // 向树中添加元素
    this.add = (key, val) => {
      root = addNode(root, key, val)
    }

    // 获取最小节点
    this.getMin = () => {
      return getMinNode(root)
    }

    // 获取最大节点
    this.getMax = () => {
      return getMaxNode(root)
    }

    // 删除树中索引为key的节点
    this.remove = (key) => {
      root = removeNode(root, key)
    }

    // 删除最小节点
    this.removeMin = () => {
      root = removeMinNode(root)
    }

    // 删除最大节点
    this.removeMax = () => {
      root = removeMaxNode(root)
    }

    // 向node为根节点的avltree中添加值为（key, val）的节点
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

      node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right))

      const balanceFactor = getBalanceFactor(node)
      if (Math.abs(balanceFactor) > 1) {
        return balanceTree(node, balanceFactor)
      }
      
      return node
    }

    // 在以node为根节点的avltree中删除索引为key的节点
    function removeNode (node, key) {
      if (!node) {
        return null
      }

      let retNode = null

      if (key < node.key) {
        node.left = removeNode(node.left, key)
        retNode = node
      } else if (key > node.key) {
        node.right = removeNode(node.right, key)
        retNode = node
      } else { // key === node.key
        if (!node.left) {
          const rightNode = node.right
          node.right = null
          size--
          retNode = rightNode
        } else if (!node.right) {
          const leftNode = node.left
          node.left = null
          size--
          retNode = leftNode
        } else {
          const minNode = getMinNode(node.right)
          const successor = new Node(minNode.key, minNode.val)
          successor.left = node.left
          successor.right = removeNode(node.right, minNode.key)
          node.left = node.right = null
          retNode = successor
        }
      }

      if (!retNode) {
        return null
      }

      retNode.height = 1 + Math.max(getHeight(retNode.left), getHeight(retNode.right))

      const balanceFactor = getBalanceFactor(retNode)

      if (Math.abs(balanceFactor) > 1) {
        return balanceTree(retNode, balanceFactor)
      }

      return retNode
    }

    // 删除以node为根节点的avltree的最小节点
    function removeMinNode (node) {
      if (!node) {
        return null
      }

      if (!node.left) {
        size--
        return node.right
      }

      node.left = removeMinNode(node.left)
      return node
    }

    // 删除以node为根节点的avltree的最大节点
    function removeMaxNode (node) {
      if (!node) {
        return null
      }

      if (!node.right) {
        size--
        return node.left
      }

      node.right = removeMaxNode(node.right)
      return node
    }
  }
}

// 获取以node为根节点的avltree最小节点
function getMinNode (node) {
  if (!node) {
    return null
  }

  if (!node.left) {
    return node
  }

  return getMinNode(node.left)
}

// 获取以node为根节点的avltree的最大节点
function getMaxNode (node) {
  if (!node) {
    return null
  }

  if (!node.right) {
    return node
  }

  return getMaxNode(node.right)
}

// 以node为根节点的avltree中是否包含索引为key的节点
function contains (node, key) {
  if (!node) {
    return false
  }

  if (key < node.key) {
    return contains(node.left, key)
  }

  if (key > node.key) {
    return contains(node.right, key)
  }

  return true
}

// 在以node为根节点的avltree中查找索引为key的节点的值
function get (node, key) {
  if (!node) {
    return
  }

  if (key < node.key) {
    return get(node.left, key)
  }

  if (key > node.key) {
    return get(node.right, key)
  }

  return node.val
}

// 中序遍历以node为根节点的二分搜索树
function inOrder (node, arr) {
  if (!node) {
    return
  }

  if (node.left) {
    inOrder(node.left, arr)
  }

  arr.push(node.key)

  if (node.right) {
    inOrder(node.right, arr)
  }
}

// 获取节点的平衡因子
function getBalanceFactor(node) {
  if (!node) {
    return 0
  }

  return getHeight(node.left) - getHeight(node.right)
}

  // 获取节点高度
  function getHeight (node) {
    if (!node) {
      return 0
    }

    return node.height
  }

  // 以node为根节点的二分搜索树是否是平衡二叉树
  function isBalanced (node) {
    if (!node) {
      return true
    }

    if (Math.abs(getBalanceFactor(node)) > 1) {
      return false
    }

    return isBalanced(node.left) && isBalanced(node.right)
  }

  /**
   * 右旋
   *           y                                x
   *         /   \                            /   \
   *        x     t4                        z       y
   *      /   \         ----->            /   \    / \
   *     z     t3                        t1   t2  t3  t4
   *   /   \
   *  t1    t2
   */
  function rotateRight (y) {
    const x = y.left
    const t3 = x.right

    y.left = t3
    x.right = y

    y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
    x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right))

    return x
  }

  /**
   * 左旋
   *    y                                 x
   *  /   \                            /      \
   * t4    x          ----->          y        z
   *     /   \                      /   \     /  \
   *    t3    z                    t4    t3  t2   t1
   *        /   \
   *       t2    t1
   */
  function rotateLeft (y) {
    const x = y.right
    const t3 = x.left

    y.right = t3
    x.left = y

    y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
    x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right))

    return x
  }

  // 完成二叉树的自平衡
  function balanceTree (node, balanceFactor) {
    // 平衡因子超过1，且左子树的平衡因子大于等于0
    // LL，此时应该执行右旋操作
    if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
      return rotateRight(node)
    }

    // 平衡因子小于-1，且右子树的平衡因子小于0
    // RR，此时应该执行左旋操作
    if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
      return rotateLeft(node)
    }

    // 平衡因子超过1，且左子树的平衡因子小于0
    // LR，此时先对左子树左旋，形成LL，再执行右旋操作
    if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
      node.left = rotateLeft(node.left)
      return rotateRight(node)
    }

    // 平衡因子小于-1，且右子树的平衡因子大于等于0
    // RL，此时应该先对右子树右旋，形成RR，再执行左旋操作
    if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
      node.right = rotateRight(node.right)
      return rotateLeft(node)
    }
  }
