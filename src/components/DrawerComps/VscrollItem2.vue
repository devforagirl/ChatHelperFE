<!-- DrawerFavoriteItem的item -->
<template>
  <div class="Item2BigBox">
    <div
      class="Item2ContentBox"
      @click.stop="chatItemClick(source)"
    >
      <msgExComp :msgexarray="JSON.parse(source.messageEx)" />
    </div>
    <div class="Item2TimeOutterBox">
      <span
        class="Item2TimeInnerBox"
        @click="toggleTimeFormat"
      >
        {{ user_settings.flagTimeDisplayFormat ? RelativeCreatedAt :AbsoluteCreatedAt }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import msgExComp from '../msgExComp.vue'

export default {
  name: 'Item2',
  components: { 'msgExComp': msgExComp },
  props: {
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['user_settings', 'curr_user_viewer']),

    RelativeCreatedAt() {
      return this.$dayjs(parseInt(this.source.createdAt)).fromNow()
    },
    AbsoluteCreatedAt() {
      return this.$dayjs(parseInt(this.source.createdAt)).format('MMMM DD,YYYY HH:mm:ss')
    }
  },
  mounted() {
  },
  methods: {
    chatItemClick(chat) {
      const chatObj = {
        'author': {
          'isVerified': false,
          'isChatOwner': false,
          'isChatSponsor': false,
          'isChatModerator': false,
          'name': this.curr_user_viewer.viewer_current_name,
          'imageUrl': this.curr_user_viewer.viewer_image_url
        },
        'messageEx': JSON.parse(chat.messageEx)
      }

      this.$store.dispatch('action_set_DialChatData', chatObj)
      this.$store.commit('change_flagDrawer_visibility', false)
      this.$store.commit('change_flagDialog', true)
      this.$router.push('/dashboard/dialog/chat')
    },
    toggleTimeFormat() {
      this.$store.commit('change_flag_TimeDisplayFormat')
    }
  }
}
</script>

<style scoped>
.Item2BigBox {
  width: 100%;
  /* background-color: rgb(248, 212, 243); */
}

.Item2ContentBox {
  background-color: rgb(198, 245, 229);
  max-width: 80%;
  padding: 10px;
  margin: 0 10px;
  border-radius: 8px;
}

.Item2TimeOutterBox {
  /* background-color: rgb(198, 222, 245); */
  margin: 0 0 10px 0;
  padding: 0 5px;
  font-size: 60%;
  width: 100%;
  text-align: right;
}

.Item2TimeInnerBox {
  /* background-color: rgb(241, 147, 210); */
}
</style>
