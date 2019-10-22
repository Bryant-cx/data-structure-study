class UnionFind3 {
  constructor (capacity = 10) {
    const arr = new Array(capacity)
    // 每个根节点包含的节点数
    const size = new Array(capacity)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
      size[i] = 1
    }

    // 获取并查集的元素个数
    this.getSize = () => {
      return arr.length
    }

    // 查找元素的根节点
    // O(h)复杂度，h为树的高度
    function find (p) {
      if (p < 0 || p > arr.length - 1) {
        throw Error('Index out of bound')
      }

      while (p !== arr[p]) {
        p = arr[p]
      }

      return p
    }

    // 两个元素是否属于同一集合
    // O(h)复杂度, h为树的高度
    this.isConnected = (p, q) => {
      return find(p) === find(q)
    }

    // 合并两个元素所在的集合
    // 让元素少一些的集合指向元素多一些的集合的根节点
    // O(h)复杂度，h为树的高度
    this.union = (p, q) => {
      const pRoot = find(p)
      const qRoot = find(q)

      if (pRoot === qRoot) {
        return
      }

      if (size[pRoot] > size[qRoot]) {
        arr[qRoot] = pRoot
        size[pRoot] += size[qRoot]
      } else {
        arr[pRoot] = qRoot
        size[qRoot] += size[pRoot]
      }
    }
  }
}