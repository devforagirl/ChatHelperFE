<template>
  <div class="VscrollBigBox scrollable-element">
    <virtual-list
      ref="vsl1"
      class="list-dynamic scroll-touch customization"
      :keeps="20"
      :data-key="'id'"
      :data-sources="modChats"
      :data-component="itemComponent"
      :estimate-size="10"
      :item-class="'list-item-dynamic'"
      :bottom-threshold="2"
      :item-class-add="addItemClass"
      @scroll="scrollfunc"
      @totop="totopfunc"
    />
  </div>
</template>
<script>
import VirtualList from 'vue-virtual-scroll-list'
import Item from './VscrollItem.vue'

export default {
  name: 'Vscroll',
  components: { 'virtual-list': VirtualList },
  data() {
    return {
      itemComponent: Item
    }
  },
  computed: {
    modChats() {
      const chatsArray = this.$store.state.chats
      const startIdx = chatsArray.findIndex(x => x !== undefined)
      this.vscrollToBtm()
      return (startIdx !== -1) ? chatsArray.slice(startIdx) : []
    }
  },

  methods: {
    // 获取newChatsLength的index.参考Get the designated item size by id (from data-key value).
    addItemClass(index) {
      const newChatsLength = this.$store.state.newChatsLength
      const chatsLength = this.$store.state.chats.length

      return (index >= chatsLength - newChatsLength) ? 'newChatsClass' : ''
    },
    vscrollToBtm() {
      const refs = this.$refs
      if (this.$store.state.user_settings && refs.vsl1) {
        refs.vsl1.scrollToBottom()
      }
    },
    scrollfunc() {
      // console.log('scrollfunc()')
    },
    totopfunc() {
      // console.log('totopfunc()')
    }
  }
}
</script>
<style>
.scrollable-element {
  scroll-behavior: smooth;
}

.list-dynamic {
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
}

.list-item-dynamic {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.newChatsClass {
  margin: 0;
  background-color: rgba(121, 247, 138, 0.7);
}

.customization {
  border-color: rgb(255, 0, 0);
  width: 100%;
  height: 100vh;
}

</style>
