<template>
  <div class="ConnectionTabBigBox">
    <!-- 控制区 -->
    <div class="ControlBtnBox">
      <div class="ControlBtnInnerBox">
        <div class="flex-row">
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="#20B2AA"
              @click="btnClickConnSrv"
            >
              Conne
            </v-btn>
          </div>
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="#778899"
              @click="btnClickDiscSrv"
            >
              Disco
            </v-btn>
          </div>
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="orange"
              @click="btnClickOpenUrl"
            > open</v-btn>
          </div>
        </div>

        <div class="flex-row">
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="yellow"
              @click="btnClickInspectChatObj"
            > Inspe</v-btn>
          </div>
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="green"
              @click="btnClickCreateChatObj"
            > Create</v-btn>
          </div>
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="cyan"
              @click="btnClickStart"
            >
              Start
            </v-btn>
          </div>
          <div class="btnItemBox">
            <v-btn
              depressed
              small
              color="pink"
              @click="btnClickTerminate"
            >
              Termi
            </v-btn>
          </div>
        </div>
        <v-divider />
      </div>
    </div>

    <v-divider />

    <!-- 输入框 -->
    <div class="FormBox">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="videoIdAddress"
                :append-outer-icon="videoIdAddress ? 'mdi-send' : 'mdi-video'"
                :rules="[rules.required, rules.min]"
                filled
                clear-icon="mdi-close-circle"
                clearable
                label="Video Address"
                type="text"
                @click:append-outer="sendVid"
                @click:clear="clearMessage"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import getVideoId from 'get-video-id'

export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Required.',
      min: 'Min 11 characters'
    }
  }),
  computed: {
    videoIdAddress: {
      get() {
        return this.$store.state.videoIdAddress
      },

      set(val) {
        if (!val || val.length < 11) return
        if (val.length === 11) this.$store.commit('set_videoIdAddress', val)
        if (getVideoId(val).service === 'youtube') this.$store.commit('set_videoIdAddress', getVideoId(val).id)
      }
    }
  },

  mounted() { },

  methods: {
    clearMessage() {
      this.$store.commit('set_videoIdAddress', '')
    },
    sendVid() {
      this.$store.dispatch('action_updateVideoId', this.videoIdAddress)
    },
    btnClickConnSrv() {
      this.$store.dispatch('initializeSocket')
    },
    btnClickDiscSrv() {
      this.$store.dispatch('disconnectSocket')
    },
    btnClickStart() {
      this.$store.dispatch('startProcess')
    },
    btnClickTerminate() {
      this.$store.dispatch('action_terminateProcess')
    },
    btnClickInspectChatObj() {
      this.$store.dispatch('action_inspectChatObj')
    },
    btnClickCreateChatObj() {
      this.$store.dispatch('action_createChatObject')
    },
    btnClickOpenUrl() {
      if (this.videoIdAddress.length !== 11) {
        this.$toast.error('Url incorrect: ' + JSON.stringify(this.videoIdAddress))
      } else {
        this.$toast.success('Url correct: ' + JSON.stringify(this.videoIdAddress))

        const anchor = document.createElement('a')
        anchor.href = 'https://www.youtube.com/live_chat?v=' + this.videoIdAddress
        anchor.target = '_blank'
        anchor.click()
      }
    }
  }
}
</script>

<style>
.connectiontabbigbox {
  height: 200px;
}

.FormBox {
  margin: 0 0 -10px 0;
  /* background-color: rgb(152, 243, 149); */
}

.ControlBtnBox {
  /* background-color: rgb(245, 216, 179); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ControlBtnInnerBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flex-row{
  /* background-color: rgb(224, 161, 243); */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btnItemBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 10px 0;
}

.controlSliderSpeed {
  margin: 20px 5px;
}
</style>
