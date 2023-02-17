<template>
  <div class="chatstabbigbox">
    <!-- 控制区 -->
    <div class="ControlBtnBox">
      <div class="ControlBtnInnerBox">
        <div class="chatsSpeedBoxOutter chatsCommon">
          <div class="textTitleBox">
            Chats Speed: {{ sliderNum }}
          </div>
          <div class="chatsSpeedBox testClass">
            <div class="controlSliderSpeed">
              <v-slider
                v-model="sliderNum"
                class="align-center"
                step="0.5"
                :max="max"
                :min="min"
                height="0"
                hide-details
                @end="sliderEnd"
              />
            </div>
          </div>
        </div>

        <div class="chatsScrollBoxOutter chatsCommon">
          <div class="textTitleBox">
            Chats Scrolling
          </div>
          <div class="chatsScrollBox ">
            <div class="touchRestrictedArea">
              <v-switch
                v-model="flagScrollToBottom"
                flat
                dense
                :label="flagScrollToBottom?'Yes':'No'"
              />
            </div>
          </div>
        </div>

        <div class="chatsStoredBoxOutter chatsCommon">
          <div class="textTitleBox">
            Number of saved chats
          </div>
          <div class="chatsStoredBox ">
            <div class="touchRestrictedArea">
              <v-radio-group
                v-model="radioValue"
                class="optionsGroupBox"
              >
                <v-radio
                  label="5"
                  color="white"
                  value="5"
                />
                <v-radio
                  label="20"
                  color="white"
                  value="20"
                />
                <v-radio
                  label="50"
                  color="white"
                  value="50"
                />
                <v-radio
                  label="100"
                  color="white"
                  value="100"
                />
                <v-radio
                  label="300"
                  color="white"
                  value="300"
                />
              </v-radio-group>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  data: () => ({
    min: 0.5,
    max: 15,
    sliderNum: 3
  }),
  computed: {
    // ...mapState(['xyzabc']),

    radioValue: {
      get() {
        return this.$store.state.user_settings.numStoredChats
      },

      set(newVal) {
        this.$store.commit('set_numStoredChats', newVal)
      }
    },
    flagScrollToBottom: {
      get() {
        return this.$store.state.user_settings.flagScrollToBottom
      },

      set() {
        this.$store.commit('change_flag_ScrollToBottom')
      }
    }
  },
  mounted() {
    this.sliderNum = this.$store.state.user_settings.chatsSpeed
  },

  methods: {
    async sliderEnd() {
      this.$store.dispatch('action_updatechatsSpeed', this.sliderNum)
    }
  }
}
</script>

<style>
.chatstabbigbox {
  height: 200px;
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

.chatsCommon {
  background-color: rgb(183, 236, 243);
  margin-bottom: 20px;
}

.textTitleBox {
  background-color: rgb(68, 209, 228);
}

.chatsStoredBox {
  padding: 4px 0px;
  border-radius: 6px;
}

.chatsStoredBox .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}

.chatsStoredBox .v-input__slot {
  margin-bottom: 0;
}

.chatsStoredBox .v-messages {
  display: none;
}

.chatsSpeedBox {
  /* padding: 0px 2px; */
  border-radius: 6px;
}

.testClass {
  margin-bottom: 2px;
}

.chatsScrollBox {
  /* padding: 0px 2px; */
  border-radius: 6px;
}

.touchRestrictedArea {
  /* background-color: pink; */
  width: 20%;
}
</style>
