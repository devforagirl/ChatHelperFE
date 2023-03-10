<template>
  <div class="flex-row">
    <v-icon @click="changeMode">mdi-message</v-icon>
    <transition name="calendar" @after-enter="afterEnter" @after-leave="afterLeave">
      <div v-show="flagAniText&&!sumMode" class="content">{{ textNumber }}</div>
    </transition>
    <div v-show="flagBGText&&!sumMode" class="content">{{ textNumber }}</div>
    <div v-show="sumMode" class="content">{{ textNumber }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      sumMode: false
    }
  },
  computed: {
    ...mapState(['sumChatsLength', 'newChatsLength', 'flagAniText', 'flagBGText']),

    textNumber() {
      if (this.sumMode) {
        return this.sumChatsLength
      } else {
        return '+' + this.newChatsLength
      }
    }
  },
  methods: {
    changeMode() {
      this.sumMode = !this.sumMode
    },
    afterEnter() {
      this.$store.commit('set_flagAniText', false)
    },
    afterLeave() {
      this.$store.commit('set_flagBGText', true)
    }
  }
}
</script>

<style>
.calendar-enter-active {
  animation-duration: 0.2s;
  animation-name: calendar-enter;
  animation-fill-mode: forwards;
}
.calendar-leave-active {
  animation-duration: 0.2s;
  animation-name: calendar-leave;
  animation-fill-mode: forwards;
}
@keyframes calendar-enter {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-24px);
    opacity: 1;
  }
}
@keyframes calendar-leave {
  from {
    transform: translateY(24px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.content {
  font-size: 24px;
  font-weight: bold;
  /* padding: 20px 0; */
  text-align: center;
  line-height: 24px;
}
.button {
  margin: 20px 0;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
