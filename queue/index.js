/**
 * 循环队列
 * @param capacity 队列容量
 */

class LoopQueue {
  constructor (capacity = 10) {
    let size = 0; // 队列长度
    let front = 0; // 队列头
    let tail = 0; // 队列尾
    // 循环队列需要浪费掉一个空间，所以这里多设置一个空间
    let data = new Array(capacity + 1)

    // 队列是否为空
    this.isEmpty = () => {
      return front === tail
    }

    // 获取队列的长度
    this.getSize = () => {
      return size
    }

    // 获取队列容量
    this.getCapacity = () => {
      return data.length - 1
    }

    // 入队
    this.enQueue = (val) => {
      // 如果队列已满，需要先扩容
      if ((tail + 1) % data.length === front) {
        resize(data.length * 2)
      }

      data[tail] = val
      tail = (tail + 1) % data.length
      size++
    }

    // 出队
    this.deQueue = () => {
      if (this.isEmpty()) {
        new Error('Cannot dequeue from an empty queue')
      }

      data[front] = null
      front = (front + 1) % data.length
      size--

      // 如果size只占容量的四分之一，缩容到二分之一
      if (size <= data.length/4) {
        resize(parseInt(data.length/2))
      }
    }

    // 扩容或者缩容操作，私有方法
    let resize = (cap) => {
      const arr = new Array(cap + 1)

      for (let i = 0; i < size; i++) {
        arr[i] = data[(i + front) % data.length]
      }

      data = arr
      front = 0
      tail = size
    }

    this.toString = () => {
      let res = 'front: ['

      for (let i = 0; i < size; i++) {
        res += data[(i + front) % data.length]

        if ((i + front + 1) % data.length !== tail) {
          res += ', '
        }
      }

      res += '] tail; size: ' + size + '; capacity: ' + this.getCapacity()

      return res
    }

    // 获得队首元素
    this.getFront = () => {
      if (this.isEmpty) {
        new Error('The queue is empty')
      }

      return data[front]
    }
  }
}