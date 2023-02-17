<template>
  <div class="DrawerFavoriteBigBox">
    <div>DrawerFavorite.vue</div>
    <v-list>
      <v-list-item
        v-for="item in user_viewers"
        :key="item.viewer_channel_id"
        @click="ItemClick(item)"
      >
        <v-list-item-avatar>
          <v-img :src="item.viewer_image_url" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.viewer_current_name" />
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['user_viewers'])
  },
  methods: {
    ItemClick(viewer) {
      console.log('ItemClick(). id->', viewer.viewer_channel_id)
      this.$store.commit('mutation_set_curr_user_viewer', viewer)
      this.$store.dispatch('action_get_viewerChats', viewer.viewer_channel_id)
      this.$router.push(`/dashboard/drawer/favorite/${viewer.viewer_channel_id}`)
    }
  }
}
</script>
