class Node {
  constructor (isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}

class Trie {
  constructor () {
    const root = new Node()
    let size = 0

    // 获取字典树长度
    this.getSize = () => {
      return size
    }

    // 向字典树中添加单词
    this.add = (word) => {
      let cur = root

      for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i)

        if (!cur.next.has(char)) {
          char.next.set(char, new Node)
        }

        cur = cur.next.get(char)
      }

      if (!cur.isWord) {
        cur.isWord = true
        size++
      }
    }

    // 字典树中是否包含某单词
    this.contains = (word) => {
      let cur = root

      for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i)

        if (!cur.next.has(char)) {
          return false
        }

        cur = cur.next.get(char)
      }

      return cur.isWord
    }

    // 字典树中是否包含某前缀的单词
    this.isPrefix = (prefix) => {
      let cur = root

      for (let i = 0; i < prefix.length; i++) {
        const char = prefix.charAt(i)

        if (!cur.next.has(char)) {
          return false
        }

        cur = cur.next.get(char)
      }

      return true
    }
  }
}