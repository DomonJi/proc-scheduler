class PriorityQueue extends Array {
  enqueue(element) {
    if (element.hasOwnProperty('priority')) {
      let added = false
      for (let i = 0; i < this.length; i++) {
        if (element.priority < this[i].priority) {
          this.splice(i, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        this.push(element)
      }
    } else {
      throw new Error('PriorityQueue element must have property of "priority"')
    }
  }
  dequeue() {
    return this.shift()
  }
  first() {
    return this[0]
  }
}
