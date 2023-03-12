<template>
  <div class="audioCompBigBox">
    <v-card>
      <div class="audioCompInnerBox">
        <div class="itemsBox">
          <div
            v-for="(item, index) in user_audios"
            :key="index"
            class="itemBox"
          >
            <v-btn
              x-small
              depressed
              color="primary"
              class="itemBtn"
              @click="soundItemBtnClick(item)"
            >
              <v-icon
                x-small
                dense
                color="yellow"
              >
                mdi-play
              </v-icon>
            </v-btn>
            <span class="itemText">{{ item.audio_id }}</span>
          </div>

        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
// TODO:
// 进入dashboard时，audios传入全部的audio，但均不含data
// 上一步请求完成后，再根据某user的需求，以audio_id请求部分的audio_data存在LS.
// *user的需求包括，audio_id和对应的audio_note
// 在audio dialogue分为左侧的display tab 和 modify tab, 可横向无缝切换。
// 用户在display tab点击'播放按钮id数字'时，axios远程请求，存入ls，复制id进入剪贴板，试听后， 在audio tab 设定某个音效时，粘贴出来。
// 每行末尾，可以修改备注。切换到display里修改。
// 在display tab里，增加"add"按钮，切换到modify tab里创建。

import { mapState } from 'vuex'

export default {

  components: {
  },

  data() {
    return {
      audio: Object,
      audioBlob: Object,
      audioPromise: Promise
    }
  },
  computed: {
    ...mapState(['user_audios'])
  },
  mounted() {
    // 音效用
    this.audio1 = new Audio()
    // 语音用
    this.audio2 = new Audio()
  },
  methods: {
    soundItemBtnClick(item) {
      const xyz = localStorage.getItem(item.audio_id)

      if (xyz) {
        try {
          const currSound = JSON.parse(xyz)
          this.playAudio(currSound)
        } catch (e) {
          console.log('e->', e)
        }
      } else {
        this.$toast.error('localStorage.getItem(item.id) doesnt exist.')
      }
    },
    // 纯js播放音频
    playAudio(sound) {
      const audioBlob = this.dataURLtoBlob(sound)
      console.log('audioBlob->', audioBlob)
      const blobUrl = window.URL.createObjectURL(audioBlob)

      if (sound.category === 'effect') {
        this.audio1.src = blobUrl
        this.audioPromise = this.audio1.play()
      } else {
        this.audio2.src = blobUrl
        this.audioPromise = this.audio2.play()
      }

      if (this.audioPromise) {
        this.audioPromise.then(() => {
        }).catch((e) => {
          console.error('haha', e)
          this.$toast.error('This sound failed!')
          this.$store.commit('update_errorLogs', { title: 'playAudio()', info: e })
        })
      }
    },
    // 把dataUrl转成blob
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    }
  }
}
</script>

<style>
.audioCompBigBox {
  height: 300px;
}

.audioCompInnerBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.itemsBox {
  height: 300px;
  overflow-y: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgb(245, 229, 141);
}

.itemBox {
  margin: 10px;
  background-color: rgb(174, 245, 229);
}

.itemBtn {
  margin: 0 4px;
  width: 10%;
}

.itemText {
  font-size: 14px;
}
</style>
