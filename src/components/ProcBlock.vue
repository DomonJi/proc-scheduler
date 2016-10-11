<template lang="html">
    <div class="proc-block" :style="style"></div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    id: {
      type: Number
    },
    priority: {
      type: Number
    },
    state: {
      type: Number
    },
    needs: {
      type: Number
    },
    used: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  mounted() {
    // console.log(`linear-gradient(0deg,green ${this.completedRatio}%,yellowgreen 0)`)
  },
  computed: {
    style() {
      return {
        background: `linear-gradient(0deg,green ${_.floor(this.used * 100 / this.needs)}%,transparent 0)`,
        height: _.floor(this.needs / 1000) + 'rem'
          // transform: `translateX(${this.index * 2}rem)`
      }
    }
  }
}
</script>

<style lang="css">
.proc-block {
  display: inline-block;
  margin: 0.5rem;
  padding: 10px;
  /*transition: all 1s ease;*/
  border: 1px solid green;
  /*position: absolute;*/
}
</style>
