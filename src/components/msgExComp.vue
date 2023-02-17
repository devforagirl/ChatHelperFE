<template>
  <div class="MsgCompBigBox">
    <span
      v-for="(item, index) in msgexarray"
      :key="index"
    >
      {{ item.url ? '' : item.toString() }}

      <i
        v-if="item.url"
        class="msgCompPic"
        :style="{backgroundImage:'url(' + item.url + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    msgexarray: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    chatItemClick() {
      console.log('chatItemClick()')
    }
  }
}
</script>

<style>
.msgCompPic {
  display: inline-block;
  height: 20px;
  width: 20px;
  /* background-color: pink; */
  vertical-align: sub;
}
</style>
