<template>
  <div class="VscrollBigBox">
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
      // lastestNonEmptyChatsLength: 0
    }
  },
  computed: {
    modChats() {
      const tempX = []
      const chatsArray = this.$store.state.chats
      const startIdx = chatsArray.findIndex(x => x !== undefined)
      console.log('startIdx->', startIdx)

      if (startIdx !== -1) {
        for (let i = startIdx; i < chatsArray.length; i++) {
          tempX.push(chatsArray[i])
        }
      }

      this.vscrollToBtm()

      return tempX
    }
  },

  methods: {
    addItemClass(index) {
      // 获取newChatsLength的 index 参考Get the designated item size by id (from data-key value).
      // https://github.com/tangbc/vue-virtual-scroll-list
      return (index >= this.modChats.length - this.$store.state.newChatsLength) ? 'newChatsClass' : ''
    },
    vscrollToBtm() {
      if (this.$store.state.user_settings === null || this.$refs.vsl1 === undefined) return

      this.$refs.vsl1.scrollToBottom()

      console.log('scrollToBottom +1')
    },
    scrollfunc() {
      console.log('scrollfunc()')
    },
    totopfunc() {
      console.log('totopfunc()')
    }
  }
}
</script>

<style>
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

.customization {
  border-color: rgb(255, 0, 0);
  width: 100%;
  height: 100vh;
}

.newChatsClass {
  margin: 0;
  background-color: rgba(121, 247, 138, 0.7);
}
</style>
