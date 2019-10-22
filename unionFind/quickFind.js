class UnionFind1 {
  constructor (capacity = 10) {
    const arr = new Array(capacity)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }

    // 获取并查集长度
    this.getSize = () => {
      return arr.length
    }

    // 获取元素所在的集合名
    function find (q) {
      if (q < 0 || q > arr.length - 1) {
        throw Error('Index is out of bound')
      }
      return arr[q]
    }

    // 两个元素（p, q）是否属于同一集合
    this.isConnected = (p, q) => {
      return find(p) === find(q)
    }

    // 合并两个元素所在的集合
    // 如果两个元素所在的集合相同则什么也不做，否则将两个集合中的元素赋上相同的集合值
    this.union = (p, q) => {
      const pVal = find(p)
      const qVal = find(q)

      if (pVal === qVal) {
        return
      }

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === pVal) {
          arr[i] = qVal
        }
      }
    }
  }
}