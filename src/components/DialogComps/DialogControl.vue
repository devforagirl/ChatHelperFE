<template>
  <div class="networkCompBigBox">
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark
        show-arrows
        center-active
      >
        <v-tabs-slider color="teal lighten-3" />

        <v-tab
          v-for="item in items"
          :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.tab"
        >
          <v-card flat>
            <div
              v-show="item.tab=='Connection'"
              class="tabInCard"
            >
              <ConnectionTabComp />
            </div>
            <div
              v-show="item.tab=='Chats'"
              class="tabInCard"
            >
              <ChatsTabComp />
            </div>
            <div
              v-show="item.tab=='Color'"
              class="tabInCard"
            >
              <ColorTabComp />
            </div>
            <div
              v-show="item.tab=='Error'"
              class="tabInCard"
            >
              <ErrorTabComp />
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ConnectionTabComp from '../DialogComps/TabComps/ConnectionTab.vue'
import ChatsTabComp from '../DialogComps/TabComps/ChatsTab.vue'
import ColorTabComp from '../DialogComps/TabComps/ColorTab.vue'
import ErrorTabComp from './TabComps/ErrorTab.vue'

export default {
  components: {
    ConnectionTabComp,
    ChatsTabComp,
    ColorTabComp,
    ErrorTabComp
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Connection', content: 'Tab 1 Content' },
        { tab: 'Chats', content: 'Tab 2 Content' },
        { tab: 'Color', content: 'Tab 3 Content' },
        { tab: 'Error', content: 'Tab 4 Content' }
        // { tab: 'Five', content: 'Tab 5 Content' },
        // { tab: 'Six', content: 'Tab 6 Content' }
      ]
    }
  }
}
</script>

<style>
.networkCompBigBox {
  width: 100%;
}

.tabInCard {
  background-color: rgb(210, 220, 247);
  height: 200px;
  padding: 10px;
  overflow-y: auto;
}
</style>
