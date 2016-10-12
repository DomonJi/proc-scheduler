var QueueElement = function(element, priority) {
  this.element = element
  this.priority = priority
}
export default class PriorityQueue {
  constructor() {
    this.queue = []
  }
  enQueue(element, priority) {
    let queueElement = new QueueElement(element, priority)
    let added = false
    for (let i = 0; i < this.queue.length; i++) {
      if (queueElement.priority < this.queue[i].priority) {
        this.queue.splice(i, 0, queueElement)
        added = true
        break
      }
    }
    if (!added) {
      this.queue.push(queueElement)
    }
  }
  dequeue() {
    return this.queue.shift()
  }
  first() {
    return this.queue[0]
  }
}
