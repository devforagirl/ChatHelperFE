<template>
  <div class="SystemBarBigBox">
    <v-system-bar
      fixed
      dark
      color="primary"
    >
      <v-icon :color="newChatsLength !==0 ? 'green' : 'grey'">mdi-message</v-icon>
      <div
        class="msgStat"
        @click="toggleFlagMsgStat"
      >
        <span v-if="flagMsgStat">{{ chats.length }} </span>
        <span v-else>+{{ newChatsLength }} </span>
      </div>
      <v-spacer />
      <div class="connectedUsers">
        connected users: {{ roomInfo.length }}
      </div>
      <v-chip
        v-if="socket?socket.socket.connected:false"
        color="green"
        filter
        label
        pill
        outlined
        x-small
      >conn</v-chip>
      <v-chip
        v-else
        color="black"
        filter
        label
        pill
        outlined
        x-small
        @click="btnClickDiscChip"
      >disc</v-chip>
      <v-spacer />
      <v-chip
        v-if="videoType==='live'"
        color="orange"
        filter
        label
        pill
        outlined
        x-small
      >live</v-chip>
      <v-chip
        v-if="videoType==='replay'"
        color="blue"
        filter
        label
        pill
        outlined
        x-small
      >rep</v-chip>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      flagMsgStat: false
    }
  },
  computed: {
    ...mapState(['chats', 'newChatsLength', 'flagServerOnline', 'videoType', 'socket', 'roomInfo', 'msgConnectError'])
  },
  methods: {
    toggleFlagMsgStat() {
      this.flagMsgStat = !this.flagMsgStat
    },
    btnClickDiscChip() {
      this.$toast.error('connect_error->' + this.msgConnectError, { duration: 5000 })
    }
  }
}
</script>

<style>
.progress-linear {
  margin-top: 24px;
  width: 100%;
}
</style>
