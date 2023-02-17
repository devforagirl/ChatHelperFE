<!-- 主弹幕视图的item -->
<template>
  <div
    v-if="source!==undefined"
    class="VscrollItemBigBox"
  >
    <div
      class="avatarBox"
      @click.stop="avatarClick()"
    >
      <i
        v-if="user_settings.flagAvatar"
        class="avatarPic"
        :style="{backgroundImage:'url(' + source.author.imageUrl + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
      />
      <!-- background-color: #74992e; -->
      <span
        v-if="!user_settings.flagAvatar"
        class="avatarPic flex white-with-blue-shadow"
        :style="{background:source.author.channelIdColorHex}"
      >
        {{ source.author.name.substring(0,2) }}
      </span>
    </div>

    <div class="textBox">
      <div class="textNameBox">{{ source.author.name }}</div>
      <div
        class="textContentBox"
        @click.stop="contentClick()"
      >
        <msgExComp :msgexarray="source.messageEx" />
        <!-- {{ index }} - {{ 'newChatsLength->'+newChatsLength }} -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import msgExComp from './msgExComp.vue'

export default {
  name: 'Item',
  components: { 'msgExComp': msgExComp },
  props: {
    index: { // index of current item
      type: Number,
      default() {
        return {}
      }
    },
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
    ...mapState(['user_settings', 'newChatsLength']),

    avatarColor() {
      console.log('source.author.name->', this.source.author.name)
      return this.source.author.name
    }
  },
  mounted() {
    // stringToColor最好在每天留言收到时处理，这里直接显示，就省去了每次渲染时，重复计算
    // const result = this.stringToColor(this.source.author.channelId)
  },
  methods: {
    contentClick() {
      console.log('contentClick()')
      // 传到vuex
      this.$store.dispatch('action_set_DialChatData', this.$props.source)
      this.$store.commit('change_flagDialog', true)
      this.$router.push('/dashboard/dialog/chat')
    },
    avatarClick() {
      console.log('@@@avatarClick()')
    }
  }
}
</script>

<style scoped>
.VscrollItemBigBox {
  display: flex;
  flex-direction: row;
}

.textBox {
  background-color: rgba(121, 247, 138, 0.2);
  margin: 0 20px 0 0;
  padding: 1px 2px 1px 4px;
  border-radius: 2px;
}

/* .newChats {
  background-color: rgba(252, 101, 0, 0.6);
} */

/* .textContentBox {
} */

.avatarPic {
  display: inline-block;
  height: 40px;
  width: 40px;
  margin: 0 5px;
  vertical-align: sub;
}

.textNameBox {
  font-weight: 800;
  font-size: 90%;
  opacity: 35%;
}

.white-with-blue-shadow {
  text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
  color: white;
  font: Georgia, 'Bitstream Charter', 'URW Bookman L', 'Century Schoolbook L',
    serif;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
