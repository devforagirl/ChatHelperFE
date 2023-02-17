<template>
  <div class="DrawerLatestBigBox">
    <div>DrawerLatest.vue</div>

    <v-list
      v-for="(item, i) in latestChatData"
      :key="i"
      three-line
    >
      <template>
        <v-list-item class="latestChatBox">
          <v-list-item-avatar>
            <v-img :src="item.author.imageUrl" />
          </v-list-item-avatar>

          <v-list-item-content
            class="latestContentBox"
            @click="ItemClick(item,i)"
          >
            <v-list-item-title v-text="item.author.name" />

            <v-list-item-subtitle
              color="primary"
              class="latestSubtitleBox"
            >
              <msgExComp :msgexarray="item.messageEx" />
              <!-- 这个颜色怎么搞？ -->
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import msgExComp from '../msgExComp.vue'

export default {
  components: { 'msgExComp': msgExComp },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['latestChatData'])
  },
  methods: {
    ItemClick(chat, index) {
      this.$store.dispatch('action_set_DialChatData', { chat: chat, index: index })
      this.$store.commit('change_flagDrawer_visibility', false)
      this.$store.commit('change_flagDialog', true)
      this.$router.push('/dashboard/dialog/chat')
    }
  }
}
</script>

<style>
.latestChatBox {
  /* background-color: rgb(252, 143, 143); */
}

.latestContentBox {
  /* background-color: rgb(252, 143, 143); */
}

.latestSubtitleBox {
  /* background-color: rgb(189, 245, 212); */
}

.latestSubtitleBox .MsgCompBigBox {
  /* background-color: rgb(189, 245, 212); */
}
</style>
