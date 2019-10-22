class UnionFind2 {
  constructor (capacity = 10) {
    const arr = new Array(capacity)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }

    // 获取并查集长度
    this.getSize = () => {
      return arr.length
    }

    // 查找元素的根节点
    // O(h)复杂度，h为树的高度
    function find (p) {
      if (p < 0 || p > arr.length) {
        throw Error('Index out of bound')
      }

      while (p !== arr[p]) {
        p = arr[p]
      }

      return p
    }

    // 两个元素是否处于同一集合
    // O(h)复杂度，h为树的高度
    this.isConnected = (p, q) => {
      return find(p) === find(q)
    }

    // 合并两个元素所在的集合，如果两个元素的根节点相同则什么也不做，否则将p的根节点指向q即可
    // O(h)复杂度，h为树的高度
    this.union = (p, q) => {
      const pRoot = find(p)
      const qRoot = find(q)

      if (pRoot === qRoot) {
        return
      }

      arr[pRoot] = qRoot
    }
  }
}