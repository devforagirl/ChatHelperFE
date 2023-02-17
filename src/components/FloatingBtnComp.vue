<template>
  <div>
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
        :class="{opacity15: !fab}"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="purple"
          @click="floatingBtnLockScreen"
        >
          <v-icon>mdi-lock</v-icon>
          锁屏
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
          @click="floatingBtnDrawer"
        >
          <v-icon>mdi-delete</v-icon>
          侧边
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="green"
          @click="floatingBtnControl"
        >
          <v-icon>mdi-pencil</v-icon>
          控制
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          @click="floatingBtnAudio"
        >
          <v-icon>mdi-plus</v-icon>
          音效
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="orange"
          @click="floatingBtnLogout"
        >
          <v-icon>mdi-star</v-icon>
          退出
        </v-btn>
      </v-speed-dial>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    // drawer: null,
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition'
  }),

  computed: {
  },

  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    }
  },

  methods: {
    floatingBtnLogout() {
      this.$store.dispatch('action_exit')
    },
    floatingBtnControl() {
      this.$store.commit('change_flagDialog', true)
      this.$router.push('/dashboard/dialog/control')
    },
    floatingBtnDrawer() {
      this.$router.push('/dashboard/drawer')
      this.$store.commit('change_flagDrawer', true)
      this.$store.commit('change_flagDrawer_visibility', true)
    },
    floatingBtnAudio() {
      this.$store.commit('change_flagDialog', true)
      this.$router.push('/dashboard/dialog/audio')
    },
    floatingBtnLockScreen() {
    }
  }
}

</script>

<style>
.opacity15 {
  /* background-color: rgb(46, 250, 250); */
  opacity: 15%;
}
#create .v-speed-dial {
  position: fixed;
}
</style>
