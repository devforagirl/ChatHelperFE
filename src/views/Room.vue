<template>
  <div class="RoomBigBox">
    <DrawerFrame />

    <DialogFrame />

    <FloatingBtnComp />

    <SystemBarComp />

    <VscrollComp />

    <InvisibleHelperComp />
  </div>
</template>

<script>
import DrawerFrame from '../components/DrawerComps/DrawerFrame.vue'
import DialogFrame from '../components/DialogComps/DialogFrame.vue'
import VscrollComp from '../components/Vscroll.vue'
import SystemBarComp from '../components/SystemBarComp.vue'
import FloatingBtnComp from '../components/FloatingBtnComp.vue'
import InvisibleHelperComp from '../components/InvisibleHelperComp.vue'

export default {
  components: {
    DrawerFrame,
    VscrollComp,
    DialogFrame,
    SystemBarComp,
    FloatingBtnComp,
    InvisibleHelperComp
  },
  data: () => ({
  }),
  mounted() {
    console.log('Room.vue mounted()')
    this.getSetting()
  },
  methods: {
    getSetting() {
      this.$store.dispatch('dashboard')
    }
  }
}
</script>

<style>
.RoomBigBox {
  height: 100%;
  border-color: rgb(0, 38, 255);
}
</style>
