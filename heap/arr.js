class Arr {
  constructor (isHeapify = false, arr = [], capacity = 10) {
    let cap = capacity > arr.length ? capacity : arr.length
    let data = new Array(cap)
    let size = 0

    if (isHeapify) {
      for (let i = 0; i < arr.length; i++) {
        data[i] = arr[i]
      }
      size = arr.length
    }

    // 获取数组长度
    this.getSize = () => {
      return size
    }

    // 获取元素索引index的值
    this.get = (index) => {
      return data[index]
    }

    // 数组是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 向数组中插入元素
    this.add = (index, val) => {
      if (index < 0 || index > size) {
        throw Error('Invalid index')
      }

      if (size === capacity) {
        cap = cap * 2
        adjustCapacity(cap)
      }

      for (let i = size; i > index; i--) {
        data[i] = data[i - 1]
      }
      data[index] = val
      size++
    }

    // 向数组头添加元素
    this.addFirst = (val) => {
      this.add(0, val)
    }

    // 向数组末尾添加元素
    this.addLast = (val) => {
      this.add(size, val)
    }

    // 删除数组元素
    this.remove = (index) => {
      if (index < 0 || index > size - 1) {
        throw Error('Invalid index')
      }

      for (let i = index; i < size; i++) {
        data[i] = data[i + 1] 
        size--
      }

      // 当数组长度只占容量的1/4时，缩容一半
      if (size === parseInt(cap/4) && parseInt(cap/2) > 9) {
        cap = parseInt(cap/2)
        adjustCapacity(cap)
      }
    }

    // 删去最后一个元素
    this.removeLast = () => {
      this.remove(size - 1)
    }

    // 设置数组元素的值
    this.set = (index, val) => {
      data[index] = val
    }

    // 交换两个元素的值
    this.swap = (i, j) => {
      if (i < 0 || i > size - 1 || j < 0 || j > size - 1) {
        throw Error('Invalid index')
      }

      let temp = data[i]
      data[i] = data[j]
      data[j] = temp
    }

    // 调整数组容量 
    function adjustCapacity (newCap) {
      const newData = new Array(newCap)

      for (let i = 0; i < size; i++) {
        newData[i] = data[i]
      }

      data = newData
    }
  }
}
