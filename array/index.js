/**
 * @param capacity 新建数组的容量
 */

class myArray {
  constructor (capacity = 10) {
    let size = 0
    let data = new Array(capacity)

    // 获取数组长度
    this.getSize = () => {
      return size
    }

    // 获取数组容量
    this.getCapacity = () => {
      return data.length
    }

    // 数组是否为空
    this.isEmpty = () => {
      return size === 0
    }

    /**
     * 向数组的特定索引插入元素
     * @param {*} index 插入位置的索引
     * @param {*} val 插入的值
     */
    this.add = (index, val) => {
      if (index > size || index < 0) {
        new Error('参数有误，索引必须大于0且小于size')
        return
      }

      // 如果数组已满则进行扩容
      if (size === data.length) {
        resize(data.length * 2)
      }

      for (let i = size - 1; i >= index; i--) {
        data[i + 1] = data[i]
      }

      data[index] = val
      size++
    }

    // 添加尾元素
    this.addLast = (val) => {
      this.add(size, val)
    }

    // 添加首元素
    this.addFirst = (val) => {
      this.add(0, val)
    }

    // 对数组进行扩容或者缩容
    let resize = (cap) => {
      const arr = new Array(cap)

      for (let i = 0; i < size; i++) {
        arr[i] = data[i]
      }

      data = arr
    }

    // 打印输出
    this.toString = () => {
      console.log('size为' + size + '; capacity为' + capacity)
      let res = '['

      for (let i = 0; i < size; i++) {
        res += data[i]
        if (i < size - 1) {
          res += ', '
        }
      }
      res += ']'

      return res
    }

    // 获取索引为index处的值
    this.get = (index) => {
      if (index < 0 || index > size) {
        new Error('索引错误，index必须大于0且小于size')
      }
  
      return data[index]
    }

    // 修改索引为index处的值
    this.set = (index, val) => {
      if (index < 0 || index > size) {
        new Error('索引错误，index必须大于0且小于size')
      }
  
      data[index] = val
    }

    // 数组中是否包含某元素
    this.contains = (val) => {
      for (let i = 0; i < size; i ++) {
        if (data[i] === val) {
          return true
        }
      }
  
      return false
    }

    // 查找某元素的索引
    this.find = (val) => {
      for (let i = 0; i < size; i ++) {
        if (data[i] === val) {
          return i
        }
      }
  
      return -1
    }

    // 删除索引为index的元素
    this.remove = (index) => {
      if (index < 0 || index >= size) {
        new Error('索引错误，index必须大于0且小于size')
      }

      // 当数组长度只有容量的四分之一时，缩容一半
      if (size === parseInt(data.length/4) && data.length >= 2) {
        resize(parseInt(data.length/2))
      }
  
      for (let i = index + 1; i < size; i++) {
        data[i] = data[i - 1]
      }
  
      size--
    }

    // 删除首元素
    this.removeFirst = () => {
      if (this.isEmpty()) {
        new Error('数组为空，不能执行删除操作')
      }
      this.remove(0)
    }

    // 删除末尾元素
    this.removeLast = () => {
      if (this.isEmpty()) {
        new Error('数组为空，不能执行删除操作')
      }
      this.remove(size - 1)
    }

    // 删除某个元素
    this.removeElement = (val) => {
      const index = this.find(val)

      if (index > -1) {
        this.remove(index)
      }
    }
  }
}