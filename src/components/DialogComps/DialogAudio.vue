<template>
  <div class="audioCompBigBox">
    <v-card>
      <div class="audioCompInnerBox">
        <div class="categoriesBox">
          <div
            v-for="item in userSoundUniqueCategories"
            :key="item"
            class="categoriesitem"
            @click="categoryBtnClick(item)"
          >{{ item.substring(0,5) }}</div>
        </div>

        <div class="itemsBox">
          <div
            v-for="item in selectedSoundItems"
            :key="item.id"
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
            <span class="itemText">{{ item.name }}</span>
          </div>

        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  components: {
  },

  data() {
    return {
      audio: Object,
      audioBlob: Object,
      audioPromise: Promise,
      tab: null,
      selectedSoundItems: []
    }
  },
  computed: {
    ...mapState(['userSounds']),
    userSoundUniqueCategories: {
      get() {
        const categories = this.$store.state.userSounds.map((x) => {
          return x.category
        })

        return this.unique(categories)
      }
    }
  },
  mounted() {
    this.categoryBtnClick('general')
    // 音效用
    this.audio1 = new Audio()
    // 语音用
    this.audio2 = new Audio()
  },
  methods: {
    // 利用 ES6 Set 去重（ES6 中最常用）
    unique(arr) {
      return Array.from(new Set(arr))
    },
    categoryBtnClick(ctg) {
      this.selectedSoundItems = this.userSounds.filter((item) => {
        return item.category === ctg
      })
    },
    soundItemBtnClick(item) {
      const xyz = localStorage.getItem(item.id)
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
      const audioBlob = this.dataURLtoBlob(sound.base64data)

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
.alertBox {
  /* 警告提示框的定位问题 搜索'v-alert使用' */
}
.audioCompBigBox {
  height: 300px;
}

.audioCompInnerBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.categoriesBox {
  height: 300px;
  overflow-y: auto;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  /* padding: 0 0 0 8px; */
  /* background-color: rgb(203, 160, 243); */
}

.categoriesitem {
  padding: 10px 0 0 8px;
  margin-bottom: 2px;
  /* border: 2px red solid; */
  background-color: rgb(230, 243, 196);
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

.categoryTabsColumn {
  max-width: 30%;
}

.detailTabsColumn {
  width: 70%;
}

.networkCompBigBox {
  width: 100%;
}

.tabInCard {
  /* 选定的tab小色块 */
  background-color: rgb(240, 206, 14);
  height: 200px;
  padding: 10px;
  overflow-y: auto;
}
</style>
