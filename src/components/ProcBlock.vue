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
    }
  },
  data() {
    return {
      style: {
        background: `linear-gradient(0deg,green ${_.floor(this.used * 100 / this.needs)}%,yellowgreen 0)`,
        height: _.floor(this.needs / 1000) + 'rem'
      }
    }
  },
  mounted() {
    // console.log(`linear-gradient(0deg,green ${this.completedRatio}%,yellowgreen 0)`)
  }
}
</script>

<style lang="css">
.proc-block {
  display: inline-block;
  margin: 0.5rem;
  padding: 10px;
  transition: all 1s ease;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  top:5rem;
  opacity: 0;
}
</style>
