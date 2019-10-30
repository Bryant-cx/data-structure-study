class AVLSet {
  constructor () {
    let root = null
    let size = 0

    class Node {
      constructor (val = null) {
        this.val = val
        this.left = null
        this.right = null
        this.height = 1
      }
    }

    // set 是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 获取set元素个数
    this.getSize = () => {
      return size
    }

    // set中是否包含val
    this.contains = (val) => {
      return contains(root, val)
    }

    // 向set中添加元素
    this.add = (val) => {
      root = addNode(root, val)
    }

    // 向node为根节点的二分搜索树添加值为val的节点
    function addNode (node, val) {
      if (!node) {
        size++
        return new Node(val)
      }

      if (val < node.val) {
        node.left = addNode(node.left, val)
      }

      if (val > node.val) {
        node.right = addNode(node.right, val)
      }

      node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right))

      const balanceFactor = getBalanceFactor(node)
      if (Math.abs(balanceFactor) > 1) {
        return balanceTree(node, balanceFactor)
      }
      return node
    }

    // 删除set中的元素
    this.remove = (val) => {
      root = removeNode(root, val)
    }

    // 从以node为根节点的二分搜索树中删去值为val的节点
    function removeNode (node, val) {
      if (!node) {
        return
      }

      let retNode = null

      if (val < node.val) {
        node.left = removeNode(node.left, val)
        retNode = node
      } else if (val > node.val) {
        node.right = removeNode(node.right, val)
        retNode = node
      } else { // val === node.val
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
          const succsor = new Node(min.val)
          succsor.left = node.left
          succsor.right = removeNode(node.right, min.val)
          node.left = node.right = null

          retNode = succsor
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
  }
}

// 以node为根节点的二分搜索树中是否包含val
function contains (node, val) {
  if (!node) {
    return false
  }

  if (val === node.val) {
    return true
  }

  if (val < node.val) {
    return contains(node.left, val)
  }

  if (val > node.val) {
    return contains(node.right, val)
  }
}

// node的节点高度
function getHeight (node) {
  if (!node) {
    return 0
  }

  return node.height
}

// 获取node的平衡因子
function getBalanceFactor (node) {
  return getHeight(node.left) - getHeight(node.right)
}

// 将二分搜索树调整为平衡二叉树
function balanceTree (node, balanceFactor) {
  /**
   * LL，左子树高度比右子树的高度高，且高度差超过1
   * 左子树的平衡因子不小于0
   * 执行右旋操作
   */
  if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
    return rotateRight(node)
  }

  /**
   * RR，右子树的高度比左子树高度高，且高度差超过1
   * 右子树的平衡因子不小于0
   * 执行左旋操作
   */
  if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
    return rotateLeft(node)
  }

  /**
   * LR，左子树的高度比右子树的高度高，且高度差超过1
   * 左子树的平衡因子小于0
   * 先对左子树执行左旋操作，再对node执行右旋操作
   */
  if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
    node.left = rotateLeft(node.left)
    return rotateRight(node)
  }

  /**
   * RL，右子树的高度比左子树高，且高度差超过1
   * 右子树的平衡因子小于0
   * 先对右子树执行右旋操作，再对node执行左旋操作
   */
  if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
    node.right = rotateRight(node.right)
    return rotateLeft(node)
  }
}

/**
 * 节点右旋操作
 *              y                                x
 *            /   \                           /     \
 *           x     t4       ---->            z        y
 *         /   \                           /   \     /  \
 *        z     t3                        t1    t2  t3  t4
 *      /   \
 *     t1    t2
 */

function rotateRight (y) {
  const x = y.left
  const t3 = x.right

  x.right = y
  y.left = t3

  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right))

  return x
}

/**
 * 节点左旋操作
 *          y
 *        /   \                                     x
 *       t1    x          ---->                   /    \
 *           /   \                              y        z
 *          t2    z                           /   \    /    \
 *              /   \                        t1    t2 t3     t4
 *             t3    t4
 */

function rotateLeft (y) {
  const x = y.right
  const t2 = x.left

  y.right = t2
  x.left = y

  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right))
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right))

  return x
}

// 获取二分搜索树中的最小节点
function getMinNode (node) {
  if (!node.left) {
    return node
  }

  return getMinNode(node.left)
}

// 中序遍历
function inOrder (node, arr) {
  if (!node) {
    return
  }

  if (node.left) {
    inOrder(node.left, arr)
  }

  arr.push(node.val)

  if (node.right) {
    inOrder(node.right, arr)
  }
}

// 是否是平衡二叉树
function isBalanced (node) {
  if (!node) {
    return true
  }

  if (Math.abs(getBalanceFactor(node)) > 1) {
    return false
  }

  return isBalanced(node.left) && isBalanced(node.right)
}