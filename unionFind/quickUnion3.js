class UnionFind4 {
  constructor (capacity = 10) {
    const arr = new Array(capacity)
    // 以i为根节点的集合的深度
    const rank = new Array(capacity)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
      rank[i] = 1
    }

    // 获取并查集的元素个数
    this.getSize = () => {
      return arr.length
    }

    // 查找元素的根节点
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
    this.isConnected = (p, q) => {
      return find(p) === find(q)
    }

    // 合并两个元素所在的集合
    // 将深度低的集合合并到深度高的集合
    this.union = (p, q) => {
      const pRoot = find(p)
      const qRoot = find(q)

      if (pRoot === qRoot) {
        return
      }

      if (rank[pRoot] > rank[qRoot]) {
        arr[qRoot] = pRoot
      } else if (rank[pRoot] < rank[qRoot]) {
        arr[pRoot] = qRoot
      } else {
        arr[pRoot] = qRoot
        rank[qRoot] += 1
      }
    }
  }
}