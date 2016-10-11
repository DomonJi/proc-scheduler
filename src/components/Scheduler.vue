<template lang="html">
  <div class="container">
    <div class="procs-container">
      <transition-group name="list-complete" tag="div">
        <div class="proc-block" v-for="(proc,index) in procQueue" :style="getStyleOfIndex(index)" :key="proc.id"></div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import ProcBlock from './ProcBlock'
// var procStates = {}
// procStates.wait = 0
// procStates.run = 1
// procStates.finished = 2
export default {
  components: {
    ProcBlock
  },
  props: {
    procNum: {
      type: Number,
      default: 10
    },
    timeUnit: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      procQueue: [],
      current: 0,
      completed: []
    }
  },
  methods: {
    addProc() {
      this.procQueue.push({
        id: this.current,
        priority: _.random(0, 10),
        enterTime: new Date().getTime(),
        needs: _.random(100, 5000),
        used: 0,
        state: 0
      })
      this.current += 1
      this.sort()
    },
    run() {
      let p = this.procQueue[0]
      this.proc(p).then((p) => {
        this.run()
      }, (p) => {
        if (this.procQueue[0].state !== 2) {
          this.run()
        }
      })
    },
    proc(p) {
      this.sort()
      return new Promise((resolve, reject) => {
        if (p.state === 2) {
          reject(p)
          return
        }
        p.state = -1
        _.delay(() => {
          p.priority += 1
          p.used += this.timeUnit
          p.state = p.used >= p.needs ? 2 : 0
          resolve(p)
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
    }, _.random(2000, 5000))
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
  transform: translateY(2rem);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
