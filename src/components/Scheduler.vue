<template lang="html">
  <div class="container">
    <div class="procs-container">
      <proc-block v-for="proc in procQueue"
        :priority="proc.priority"
        :needs="proc.needs"
        :used="proc.used"
        :id="proc.id"
        :key="proc.id"
        :state="proc.state"

      ></proc-block>
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
      default: 1000
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
        needs: _.random(10, 10000),
        used: 0,
        state: 0
      })
      this.current += 1
      this.procQueue = _.sortBy(this.procQueue, ['state', 'priority'])
    },
    run() {
      let p = this.procQueue.shift()
      this.proc(p).then((p) => {
        this.procQueue.push(p)
        this.run()
      }, (p) => {
        if (this.procQueue[0].state !== 2) {
          this.run()
        }
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
          p.priority -= 1
          p.used += this.timeUnit
          p.state = p.used >= p.needs ? 2 : 0
          resolve(p)
        }, this.timeUnit)
      })
    }
  },
  created() {
    _.map(_.range(this.procNum), () => {
      this.addProc()
    })
  },
  mounted() {
    this.run()
  }
}
</script>

<style lang="css">
.container {
  width:auto;
  margin: 0 auto;
}
.procs-container {
  display: block;;
  justify-content: space-around;
  align-items: flex-end;
}
</style>
