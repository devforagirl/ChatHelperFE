<template>
  <div class="InvisibleHelperCompBigBox">
    <v-btn @click="clickBtnTest1">test3</v-btn>
    <v-btn @click="clickBtnTest2">delete</v-btn>
    <v-btn @click="clickBtnTest3">exam</v-btn>
    <v-btn @click="clickBtnTest4">getErr</v-btn>
    <br>
    <span>InvisibleHelperComp</span>
    <br>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data: () => ({
  }),
  computed: {
    ...mapState(['user_info', 'socket'])
  },
  created() {
  },
  mounted() {
  },
  methods: {
    clickBtnTest1() {
      console.log('clickBtnTest1')
    },
    clickBtnTest2() {
      console.log('clickBtnTest2')
    },
    clickBtnTest3() {
      console.log('clickBtnTest3')
    },
    clickBtnTest4() {
      console.log('clickBtnTest4')
    }
  }
}
</script>

<style>
.InvisibleHelperCompBigBox {
  /* display: none; */
  background-color: pink;
  padding: 10px 0;
}
</style>
