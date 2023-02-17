<template>
  <div class="chatCompBigBox">
    <span>DialogChat.vue</span>
    <!-- chatComp233.vue -->
    <div class="dialHeaderBox">
      <v-card-title class="dialHeaderTitle">
        <!-- 头像 -->
        <v-avatar>
          <img
            :src="dialChatData.author.imageUrl"
            :alt="dialChatData.author.name"
          >
        </v-avatar>
        <!-- 名字&身份标识 -->
        <div class="dialHeaderMidBox">
          <!-- 名字 -->
          <div class="dialHeaderMidName">
            {{ dialChatData.author.name }}
          </div>
          <!-- 身份 -->
          <!-- https://mdi.bessarabov.com/ -->
          <div class="dialHeaderMidIconBox">
            <v-icon
              v-show="dialChatData.author.isChatOwner"
              dense
              class="dialHeaderMidIcon"
            >
              mdi-checkbox-marked-circle
            </v-icon>
            <v-icon
              v-show="dialChatData.author.isChatSponsor"
              dense
              color="purple"
              class="dialHeaderMidIcon"
            >
              mdi-telescope
            </v-icon>
            <v-icon
              v-show="dialChatData.author.isChatModerator"
              dense
              color="blue"
              class="dialHeaderMidIcon"
            >
              mdi-dog-side
            </v-icon>
            <v-icon
              v-show="dialChatData.author.isVerified"
              dense
              color="orange"
              class="dialHeaderMidIcon"
            >
              mdi-cat
            </v-icon>
          </div>
        </div>
        <!-- 三小点 -->
        <v-spacer />
        <v-menu
          bottom
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="() => {}"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
    </div>

    <div class="dialMainBox">
      <div class="dialTextBox">
        <a
          v-for="(item, index) in dialChatData.messageEx"
          :key="index"
          class="dialTextWrapper"
        >
          {{ item.url ? '' : item.toString() }}

          <i
            v-if="item.url"
            class="dialEmoji"
            :style="{backgroundImage:'url(' + item.url + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
          />
        </a>
      </div>
    </div>

    <div class="dialFooterBox">
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="clickBtnClose"
        >
          Close
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      dialActive: false,
      items: [
        {
          title: 'YT Channel'
        },
        {
          title: 'Chat History'
        },
        {
          title: 'Favorite'
        },
        {
          title: 'Remove'
        }
      ]
    }
  },
  computed: {
    ...mapState(['flagDialog', 'flagDrawerVisibility', 'dialChatData'])
  },
  methods: {
    startGameHandler() {
      // 1. 显示弹框
      this.resultDialogVisible = true
      // 2. 清空输入框内容
      this.expectImageName = ''
    },
    clickBtnClose() {
      this.$store.commit('change_flagDialog', false)

      if (!this.flagDrawerVisibility) {
        this.$store.commit('change_flagDrawer_visibility', true)
      }

      this.$router.go(-1)
    }
  }
}
</script>

<style>
.chatCompBigBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dialHeaderBox {
  padding: 10px 1px 4px 10px;
}

.dialHeaderTitle {
  padding: 0;
}

.dialHeaderMidBox {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 5px 0 0 10px;
  /* background-color: rgb(195, 247, 170); */
}

.dialHeaderMidName {
  font-size: 16px;
  line-height: 1;
  padding: 4px 0;
}

.dialHeaderMidIconBox {
  line-height: 0.7;
}

.dialHeaderMidIcon {
  /* background-color: rgb(245, 224, 155); */
  vertical-align: top !important;
}

.dialMainBox {
  /* background-color: pink; */
  padding: 20px 20px;
}

.dialTextBox {
  margin: 5px;
  /* background-color: rgb(216, 247, 240); */
  max-height: 300px;
  min-height: 30px;
  /* line-height: 100px; */
  /* text-align: center; */
  overflow-y: auto;
}

.dialTextWrapper {
  color: black !important;
  font-size: 20px;
}

.dialEmoji {
  display: inline-block;
  height: 20px;
  width: 20px;
  /* background-color: pink; */
  vertical-align: sub;
}

.dialFooterBox {
  /* background-color: rgb(151, 223, 245); */
}
</style>
