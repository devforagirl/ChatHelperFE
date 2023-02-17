<template>
  <div class="DrawerIndexBigBox">
    <div>DrawerIndex.vue</div>
    <v-btn @click="latestFunc()">latest</v-btn>
    <v-btn @click="favoriteFunc()">favorite</v-btn>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
  },
  methods: {
    latestFunc() {
      console.log('latestFunc()')
      this.$router.push('/dashboard/drawer/latest')
    },
    favoriteFunc() {
      console.log('favoriteFunc()')
      this.$router.push('/dashboard/drawer/favorite')
    }
  }
}
</script>
