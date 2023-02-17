<template>
  <div class="DrawerFavoriteBigBox">
    <div>DrawerFavoriteItem.vue</div>
    <div
      v-show="!viewer_chat.length"
      class="text-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
    <div
      v-show="viewer_chat.length"
      class="vlist2Box"
    >
      <virtual-list
        ref="vsl2"
        class="list-dynamic scroll-touch"
        :keeps="20"
        :data-key="'_id'"
        :data-sources="viewer_chat"
        :data-component="itemComponent"
        :estimate-size="10"
        :item-class="'list-item-dynamic'"
        :bottom-threshold="2"
        @scroll="scrollfunc2"
        @totop="totopfunc2"
      />
    </div>
  </div>
</template>

<script>
import VirtualList2 from 'vue-virtual-scroll-list'
import Item2 from './VscrollItem2.vue'
import { mapState } from 'vuex'

export default {
  components: { 'virtual-list': VirtualList2 },
  data() {
    return {
      itemComponent: Item2
    }
  },
  computed: {
    ...mapState(['viewer_chat'])
  },
  methods: {
    scrollfunc2() {
      console.log('scrollfunc2()')
    },
    totopfunc2() {
      console.log('totopfunc2()')
    },
    ItemClick() {
      console.log('ItemClick()')
    }
  }
}
</script>
