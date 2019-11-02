class AVLMap {
  constructor () {
    class Node {
      constructor (key = null, val = null) {
        this.key = key
        this.val = val
        this.left = null
        this.right = null
        this.height = 1
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

    // 向map中添加元素(key, val)，如果key已存在，则更新val
    this.put = (key, val) => {
      root = addNode(root, key, val)
    }

    // 向以node为根节点的二分搜索树中添加元素(key, val)，如果key已存在，则更新val
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

    // 修改元素的值
    this.set = (key, val) => {
      setVal(root, key, val)
    }

    // 是否包含key
    this.contains = (key) => {
      return contains(root, key)
    }

    // 删除索引为key的节点
    this.remove = (key) => {
      root = remove(root, key)
    }

    // 从node为根节点的二分搜索树中删去索引为key的节点
    function remove (node, key) {
      if (!node) {
        return
      }

      let retNode = null
      if (key < node.key) {
        retNode = remove(node.left, key) 
      } else if (key > node.key) {
        retNode = remove(node.right, key)
      } else {
        if (!node.left) {
          retNode = node.right
          node.right = null
          size--
        } else if (!node.right) {
          retNode = node.left
          node.left = null
          size--
        } else {
          const min = getMinNode(node.right)
          retNode = new Node(min.key, min.val)
          retNode.left = node.left
          retNode.right = remove(node.right, min.key)
          node.left = node.right = null
        }
      }

      if (!retNode) {
        return
      }

      retNode.height = 1 + Math.max(getHeight(retNode.left), getHeight(retNode.right))

      const balanceFactor = getBalanceFactor(retNode)

      if (Math.abs(balanceFactor) > -1) {
        return balanceTree(retNode)
      }

      return retNode
    }
  }
}

// 返回节点node的高度值
function getHeight (node) {
  if (!node) {
    return 0
  }

  return node.height
}

// 获取node的平衡因子
function getBalanceFactor (node) {
  if (!node) {
    return 0
  }

  return getHeight(node.left) - getHeight(node.right)
}

// 将以node为根节点的二分搜索树转换为平衡二叉树
function balanceTree (node, balanceFactor) {
  // LL，平衡因子大于1，且左子树的平衡因子大于等于0
  // 直接执行右旋操作
  if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
    return rotateRight(node)
  }

  // RR，平衡因子小于-1，且右子树的平衡因子小于等于0
  // 直接执行左旋操作
  if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
    return rotateLeft(node)
  }

  // LR，平衡因子大于1，且左子树的的平衡因子小于0
  // 先对左子树执行左旋操作，再对node执行右旋操作
  if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
    node.left = rotateLeft(node.left)
    return rotateRight(node)
  }

  // RL，平衡因子小于-1，且右子树的平衡因子大于0
  // 先对右子树执行右旋操作，再对node执行左旋操作
  if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
    node.right = rotateRight(node.right)
    return rotateLeft(node)
  }
}

/**
 * 右旋操作
 *                  y                     
 *                /   \                                  x
 *               x     t4                             /     \
 *             /    \           ----->               z        y
 *            z      t3                            /   \     /  \
 *          /   \                                 t1    t2  t3   t4
 *         t1    t2
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
 * 左旋操作
 * 
 *      y                                                x
 *    /   \                                           /     \
 *   t4    x                                         y        z
 *       /   \            ---->                    /   \     /  \
 *      t3    z                                   t4    t3  t2  t1
 *          /   \
 *         t2    t1
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

// 修改元素的值
function setVal (node, key, val) {
  if (!node) {
    return
  }

  if (key < node.key) {
    setVal(node.left, key, val)
  } else if (key > node.key) {
    setVal(node.right, key, val)
  } else {
    node.val = val
  }
}

// 以node为根节点的二分搜索树中是否包含key
function contains (node, key) {
  if (!node) {
    return false
  }

  if (key < node.key) {
    return contains(node.left, key)
  } else if (key > node.key) {
    return contains(node.right, key)
  } else {
    return true
  }
}

// 获取以node为根节点的二分搜索树的最小节点
function getMinNode (node) {
  if (!node.left) {
    return node
  }

  return getMinNode(node.left)
}