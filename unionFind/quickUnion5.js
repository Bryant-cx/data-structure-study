class UnionFind6 {
  constructor (capacity = 10) {
    const arr = new Array(capacity)
    const rank = new Array(capacity)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
      rank[i] = i
    }

    // 获取并查集元素个数
    this.getSize = () => {
      return arr.length
    }

    // 查找元素的根节点，让子节点指向父节点的根节点以压缩路径
    function find(p) {
      if (p < 0 || p > arr.length - 1) {
        throw Error('Index out of bound')
      }

      if (p !== arr[p]) {
        arr[p] = find(arr[p])
      }
      return arr[p]
    }

    // 两个元素是否属于同一集合
    this.isConnected = (p, q) => {
      return find(p) === find(q)
    }

    // 合并两个元素所在的集合
    this.union = (p, q) => {
      const pRoot = find(p)
      const qRoot = find(q)

      if (rank[pRoot] < rank[qRoot]) {
        arr[pRoot] = qRoot
      } else if (rank[qRoot] < rank[pRoot]) {
        arr[qRoot] = pRoot
      } else {
        arr[qRoot] = pRoot
        rank[pRoot] += 1
      }
    }
  }
}