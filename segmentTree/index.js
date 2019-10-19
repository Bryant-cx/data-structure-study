class SegmentTree {
  constructor (arr = [], callback = () => {}) {
    const data = new Array(arr.length)
    const tree = new Array(arr.length * 4)

    for (let i = 0; i < arr.length; i++) {
      data[i] = arr[i]
    }

    // 获取数组长度
    this.getSize = () => {
      return data.length
    }

    // 获取index处元素
    this.get = (index) => {
      return data[index]
    }

    // 左侧子节点的索引
    function leftChildIndex (index) {
      return 2 * index + 1
    }

    // 右侧子节点的索引
    function rightChildIndex (index) {
      return 2 * index + 2
    }

    buildSegmentTree(0, 0, data.length - 1)

    // 构建以index为根节点区间为[l, r]的线段树
    // 先构建左右两颗子树，然后将操作结果赋值给根节点
    function buildSegmentTree (index, l, r) {
      if (l === r) {
        tree[index] = data[l]
        return
      }

      const mid = l + parseInt((r - l) / 2)
      const lChildIndex = leftChildIndex(index)
      const rChildIndex = rightChildIndex(index)
      buildSegmentTree(lChildIndex, l, mid)
      buildSegmentTree(rChildIndex, mid + 1, r)

      tree[index] = callback(tree[lChildIndex], tree[rChildIndex])
    }

    this.toString = () => {
      let res = '['

      for (let i = 0; i < tree.length; i++) {
        if (!tree[i]) {
          res += 'null'
        } else {
          res += tree[i]
        }

        if (i < tree.length - 1) {
          res += ', '
        }
      }

      res += ']'
      return res
    }

    // 查询区间[left, right]的结果
    this.query = (left, right) => {
      if (right < left || left < 0 || left > data.length - 1 || right < 0 || right > data.length - 1) {
        throw Error('Invalid index')
      }
      return queryFunc (0, 0, data.length - 1, left, right)
    }

    // 在【l, r】区间内查询[queryL, queryR]区间的结果
    function queryFunc (index, l, r, queryL, queryR) {
      if (l === queryL && r === queryR) {
        return tree[index]
      }

      const mid = l + parseInt((r - l) / 2)
      const lChildIndex = leftChildIndex(index)
      const rChildIndex = rightChildIndex(index)

      if (queryR <= mid) {
        return queryFunc(lChildIndex, l, mid, queryL, queryR)
      }

      if (queryL >= mid + 1) {
        return queryFunc(rChildIndex, mid + 1, r, queryL, queryR)
      }

      const queryLeft = queryFunc(lChildIndex, l, mid, queryL, mid)
      const queryRight = queryFunc(rChildIndex, mid + 1, r, mid + 1, queryR)
      return callback(queryLeft, queryRight)
    }
  }
}