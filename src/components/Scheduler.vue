<template lang="html">
  <div class="container">
    <div class="procs-container">
      <transition-group name="list-complete" tag="div">
        <div class="proc-block"
          v-for="(proc,index) in completed"
          :style="getCompletedStyle(index)"
          :key="proc.id"></div>
      </transition-group>
      <transition-group name="list-complete" tag="div">
        <div class="proc-block"
          v-for="(proc,index) in procQueue"
          :style="getStyleOfIndex(index)"
          :key="proc.id"></div>
      </transition-group>

    </div>
    <div class="arrow">
        <p>
          进程优先级由高到低
        </p>
      </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    procNum: {
      type: Number,
      default: 10
    },
    timeUnit: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      procQueue: [],
      current: 0,
      completed: [],
      hangup: true
    }
  },
  methods: {
    addProc() {
      this.procQueue.push({
        id: this.current,
        priority: _.random(0, 10),
        enterTime: new Date().getTime(),
        needs: _.random(100, 10000),
        used: 0,
        state: 0
      })
      this.current += 1
      this.sort()
      if (this.hangup === true) {
        this.run()
      }
    },
    run() {
      this.hangup = false
      let p = this.procQueue[0]
      this.proc(p).then((p) => {
        this.run()
      })
    },
    proc(p) {
      return new Promise((resolve, reject) => {
        if (p.state === 2) {
          reject(p)
          return
        }
        p.state = -1
        _.delay(() => {
          p.priority += 1
          p.used += this.timeUnit
          if (p.used >= p.needs) {
            p.state = 2
            this.sort()
            this.procQueue.pop()
            this.completed.push(p)
          } else {
            p.state = 0
            this.sort()
          }
          if (this.procQueue.length > 0) {
            resolve(p)
          } else {
            this.hangup = true
          }
        }, this.timeUnit)
      })
    },
    sort() {
      console.log('sorting')
      this.procQueue = _.sortBy(this.procQueue, ['state', 'priority'])
    },
    getStyleOfIndex(index) {
      let ratio = _.floor(this.procQueue[index].used * 100 / this.procQueue[index].needs)
      return {
        background: `linear-gradient(0deg,yellowgreen ${ratio}%,transparent 0)`,
        height: _.floor(this.procQueue[index].needs / 1000) + 'rem'
      }
    },
    getCompletedStyle(index) {
      return {
        background: 'grey',
        height: _.floor(this.completed[index].needs / 1000) + 'rem'
      }
    }
  },
  created() {
    _.map(_.range(this.procNum), () => {
      this.addProc()
    })
  },
  mounted() {
    this.run()
    setInterval(() => {
      this.addProc()
    }, _.random(2000, 6000))
  }
}
</script>

<style lang="css">
.container {
  width:auto;
  margin: 0 auto;
}
.procs-container {
  display: block;
}

.proc-block {
  display: inline-block;
  margin: 0.5rem;
  padding: 10px;
  border: 1px solid green;
  transition: all 1s;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
  transform: translateY(3rem);
}
.list-complete-leave-active {
  position: absolute;
}

.arrow {
  display: inline-block;
  height: .3rem;
  width: 20rem;
  background: linear-gradient(90deg,green 30%,yellowgreen 70%);
  margin: 2rem auto;
  position: relative;
}
.arrow::after{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: -1rem;
  transform:translateY(-0.35rem);
  border-left: 1rem solid yellowgreen;
  border-top: .5rem solid transparent;
  border-bottom: .5rem solid transparent;
  border-right: .5rem solid transparent;
}

.arrow p {
  position: absolute;
  top:.5rem;
  left: 0;
  right: 0;
  color: green;
}
</style>
