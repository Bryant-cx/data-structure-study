/**
 *                               0       <-- parentIndex
 *                            /     \
 *        leftChildIndex --> 1       2   <-- rightChildIndex
 *                         /   \   /    \
 *                        3     4 5      6
 * 
 *  @param isHeapify 是否以heapify方式生成最大堆
 *  @param arr heapify方式生成最大堆的源数组
 */
class Heap {
  constructor (isHeapify = false, arr = []) {
    const data = new Arr(isHeapify, arr)

    // 堆中元素个数
    this.getSize = () => {
      return data.getSize()
    }

    /**
    * @param {*} index 子节点的索引
    * 从上面的注释可以看出，父节点的索引 parentIndex = (childIndex + 1) / 2 - 1
    */
    this.getParentIndex = (index) => {
      if (index === 0) {
        throw Error('MaxIndex has no parent index')
      }

      return parseInt((index + 1) / 2) - 1
    }

    // 取出堆中的最大元素，替换为一个新的元素
    // 直接替换掉最大值，然后执行下沉操作
    this.replace = (val) => {
      const res = data.get(this.getSize() - 1)

      data.set(0, val)
      this.siftDown(0)

      return res
    }

    // 堆是否为空
    this.isEmpty = () => {
      return data.isEmpty()
    }

    /**
     * @param {*} index 父节点的索引
     * 从上面的注释可以看出，左子节点的索引 leftChildIndex = 2 * parentIndex + 1
     */
    this.getLeftChildIndex = (index) => {
      return 2 * index + 1
    }

    /**
     * @param {*} index 父节点的索引
     * 从上面的注释可以看出，右子节点的索引 rightChildIndex = 2 * parentIndex + 2
     */
    this.getRightChildIndex = (index) => {
      return 2 * index + 2
    }

    /**
     * 入堆
     * @param {*} val 
     * 直接添加到数组末尾然后进行上浮
     */
    this.add = (val) => {
      data.addLast(val)
      if (this.getSize() > 1) {
        this.siftUp(this.getSize() - 1)
      }
    }

    /**
     * @param {*} index 需要上浮的节点索引
     * 与它的父节点进行对比，如果比父节点大则交换二者的值
     */
     this.siftUp = (index) => {
      while (index > 0 && data.get(index) > data.get(this.getParentIndex(index))) {
        data.swap(index, this.getParentIndex(index))
        index = this.getParentIndex(index)
      }
    }

    /**
     * 出堆
     * 返回最大值
     * 将数组最后一个元素与第一个元素交换位置，删去最后一个元素，之后将头元素进行下沉
     */
    this.extract = () => {
      if (this.getSize() === 0) {
        throw Error('Heap is empty')
      }
      const res = data.get(0)
      data.set(0, data.get(this.getSize() - 1))
      data.removeLast()

      this.siftDown(0)
      return res
    }

    /**
     * @param {*} index 目标索引
     * 将目标索引与左右子索引中的最大值进行交换，直到比左右子索引的值都大
     */
    this.siftDown = (index) => {
      let leftChildIndex = this.getLeftChildIndex(index)
      let size = this.getSize()

      while (leftChildIndex < size) {
        if (leftChildIndex + 1 < size && data.get(leftChildIndex) < data.get(leftChildIndex + 1)) {
          leftChildIndex++
        }
        if (data.get(index) < data.get(leftChildIndex)) {
          data.swap(index, leftChildIndex)
          index = leftChildIndex
          leftChildIndex = this.getLeftChildIndex(leftChildIndex)
        } else {
          return
        }
      }
    }

    // 以heapify方式生成最大堆，以第一个非叶子节点为起点直到根节点，分别执行下沉操作
    if (isHeapify) {
      for (let i = this.getParentIndex(this.getSize() - 1); i >= 0; i--) {
        this.siftDown(i)
      }
    }
  }
}
