import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import myUtils from '../utils/index'
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'
import createSocketConnection from '../socket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: null,
    roomInfo: [],
    chatObjStatus: {
      'req_name': 'exam_chatObj',
      'chatObj_exists': false,
      'chatObj_id': null,
      'flag_is_alive': null
    },
    chats: [],
    newChatsLength: 0,
    sumChatsLength: 0,
    msgConnectError: null,
    dialChatData: {},
    latestChatData: [],
    videoIdAddress: '_QbRXRnHMVY',
    // _QbRXRnHMVY    Ctv
    // cKlEE_EYuNM    Twice
    // jfKfPfyJRdk    LOFI
    // 86YLFOog4GM    International Space Station
    // dgJZytFURpQ    Esports vs LGD
    // F6NpHh0ItgU    pytchat.exceptions.NoContents: Chat data stream is empty.
    arrException: [],
    flagScrollToBottom: true,
    flagDialog: false,
    flagDrawer: false,
    flagDrawerVisibility: false,
    flagAniText: false, // systembar的transition
    flagBGText: true, // systembar的垫底文本
    userName: '',
    errorLogs: [],
    user_info: null,
    user_settings: null,
    // TODO: GPT 生成CRUD
    // LOCAL:
    // numStoredChats
    // flagAvatar
    // flagScrollToBottom
    // flagTimeDisplayFormat
    // REMOTE:
    // chatsSpeed
    user_audios: null,
    user_viewers: null,
    curr_user_viewer: null,
    viewer_chat: [],
    isNewUser: true
  },
  mutations: {
    setSocket(state, socket) {
      state.socket = socket
    },
    set_roomInfo(state, arr) {
      state.roomInfo = arr
    },
    // 广播的userEnter事件, 直接加，set_roomInfo可覆盖
    bcUserEntered(state, name) {
      console.log('广播的userEnter事件', name)
      state.roomInfo.push(name)
    },
    set_chatObjStatus(state, status) {
      state.chatObjStatus = status
    },
    updateData(state, data) {
      state.data = data
    },
    change_flag_ScrollToBottom(state) {
      state.user_settings.flagScrollToBottom = !state.user_settings.flagScrollToBottom
      this.dispatch('saveToDb_userSettings')
    },
    change_flag_Avatar(state) {
      state.user_settings.flagAvatar = !state.user_settings.flagAvatar
      this.dispatch('saveToDb_userSettings')
    },
    change_flag_TimeDisplayFormat(state) {
      state.user_settings.flagTimeDisplayFormat = !state.user_settings.flagTimeDisplayFormat
      this.dispatch('saveToDb_userSettings')
    },
    change_flagDialog(state, flag) {
      state.flagDialog = flag
      console.log('vuex-flagDialog->', flag)
    },
    change_flagDrawer(state, flag) {
      state.flagDrawer = flag
      console.log('vuex-flagDrawer->', flag)
    },
    change_flagDrawer_visibility(state, flag) {
      state.flagDrawerVisibility = flag
      console.log('vuex-flagDrawerVisibility->', flag)
    },
    set_flagAniText(state, flag) {
      state.flagAniText = flag
    },
    set_flagBGText(state, flag) {
      state.flagBGText = flag
    },
    set_chatsSpeed(state, seconds) {
      state.user_settings.chatsSpeed = seconds
      this.dispatch('saveToDb_userSettings')
    },
    set_numStoredChats(state, num) {
      state.user_settings.numStoredChats = num
      this.dispatch('saveToDb_userSettings')

      state.chats = []
    },

    set_DialChatData(state, data) {
      console.log('vuex-dialChatData->', data)
      state.dialChatData = data
    },

    unshift_LatestChatData(state, data) {
      state.latestChatData.unshift(data)
      console.log('vuex-latestChatData->', state.latestChatData)
    },
    slice_LatestChatData(state, index) {
      state.latestChatData.splice(index, 1)
      console.log('vuex-latestChatData->', state.latestChatData)
    },

    set_videoIdAddress(state, string) {
      state.videoIdAddress = string
    },
    update_errorLogs(state, obj) {
      state.errorLogs.push(obj)
      // 直接发送到后台保存
    },
    set_newChatsLength(state, newChatsNum) {
      state.newChatsLength = newChatsNum

      // chatGPT: Check if we need to remove any chats from the array
      const chatsNum = state.chats.length
      const maxNum = state.user_settings.numStoredChats

      if (chatsNum - maxNum > 0 && newChatsNum !== 0) {
        const chatsToRemove = newChatsNum > chatsNum - maxNum ? chatsNum - maxNum : newChatsNum

        state.chats.splice(0, chatsToRemove)
      }
    },
    set_sumChatsLength(state, newChatsNum) {
      state.sumChatsLength += newChatsNum
    },
    set_chats(state, chatEle) {
      // 1.生成留言者专属color Hex值
      const hex = myUtils.utils.stringToColor(chatEle.author.channelId)
      chatEle.author.channelIdColorHex = hex

      // 2.添加留言数据
      state.chats.push(chatEle)
    },
    mutation_set_curr_user_viewer(state, currViewer) {
      state.curr_user_viewer = currViewer
    },
    set_connectError(state, err) {
      console.log('vuex-set_connectError-err->', err.message)
      state.msgConnectError = err.message
    },
    set_exceptionInfo(state, eObj) {
      // eObj 形如:
      // {type: "<class 'pytchat.exceptions.ChatDataFinished'>",
      //  content: "Finished chat data"}
      // 或
      // {type: "<class 'AttributeError'>",
      //  content: "'dict' object has no attribute '_is_alive'"}

      eObj.type = myUtils.utils.clearString(eObj.type)

      const modExceptionObj = {
        'from': 'BE Exception',
        'type': eObj.type ? eObj.type : 'None',
        'content': eObj.content ? eObj.content : 'None',
        'timestamp': Vue.prototype.$dayjs().format('YYMMDD HH:mm:ss ZZ')
      }

      state.arrException.push(modExceptionObj)

      const html1 =
        '<b>BE Exception</b><br>' +
        modExceptionObj.type + '<br>' +
        modExceptionObj.content

      Vue.$toast.error(html1, { duration: 0 })
    },
    SET_VIEWER_CHAT_DATA(state, viewerChatData) {
      state.viewer_chat = viewerChatData
    },
    mutation_set_userInfoData(state, userInfoData) {
      state.user_info = userInfoData

      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfoData.token}`

      localStorage.setItem('user_info', JSON.stringify(userInfoData))

      console.log('mutation_set_userInfoData->', userInfoData)
    },
    set_userAppData(state, userSettingData) {
      // 1.Settings
      // 只存vuex
      state.user_settings = JSON.parse(userSettingData.usersetting.user_settings)

      // 2.Audios
      const data1 = userSettingData.audios

      data1.map((x) => {
        // 2-1 LS 存audio_id和audio_data
        localStorage.setItem(x.audio_id, JSON.stringify(x.audio_data))
        // 2-2 vuex 存全部,除了audio_data
        // 注意，这时候是userSettingData的audio_data也被删除了
        return delete x.audio_data
      })

      state.user_audios = data1

      // 3.Viewers
      // 只存vuex
      state.user_viewers = userSettingData.viewers

      console.log('state.user_settings->', state.user_settings)
      console.log('state.user_audios->', state.user_audios)
      console.log('state.user_viewers->', state.user_viewers)
    },
    mutation_exit() {
      localStorage.removeItem('user_info')
      localStorage.removeItem('user_settings')
      location.reload() // 刷新当前页面, 重置VUEX初始值
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser
    },
    set_createSocket(state) {
      state.socket3 = io('/')
      Vue.use(VueSocketIOExt, state.socket3)
    }
  },
  actions: {
    // connect
    initializeSocket({ dispatch, commit, state }) {
      const socket = createSocketConnection({ dispatch, commit, state })

      commit('setSocket', socket)

      dispatch('action_userEnter')

      console.log('VUEX-initializeSocket')
    },

    // disconnect
    disconnectSocket(context) {
      // 检查connection状态
      if (!myUtils.utils.socketStatus()) return

      context.dispatch('action_userLeave')

      context.state.socket.disconnect()

      console.log('VUEX-disconnectSocket')
    },

    // inspectChatObject
    async action_inspectChatObj(context) {
      if (!myUtils.utils.socketStatus()) return

      const res1 = await context.state.socket.inspectChatObject()

      context.commit('set_chatObjStatus', res1)

      context.dispatch('handleFB', res1)
    },

    // createChatObject
    async action_createChatObject(context) {
      if (!myUtils.utils.socketStatus()) return

      const res1 = await context.state.socket.createChatObject()

      if (res1) {
        Vue.$toast.success('createChatObject succeded')
      } else {
        Vue.$toast.error('createChatObject failed')
        context.dispatch('action_inspectChatObj')
      }
    },

    // terminateProcess
    async action_terminateProcess(context) {
      if (!myUtils.utils.socketStatus()) return

      const res1 = await context.state.socket.terminateProcess()

      if (res1) {
        Vue.$toast.success('terminateProcess succeded')
      } else {
        Vue.$toast.error('terminateProcess failed')
        context.dispatch('action_inspectChatObj')
      }
    },

    // startProcess
    async startProcess(context) {
      if (!myUtils.utils.socketStatus()) return

      const res1 = await context.state.socket.startProcess()

      if (res1) {
        Vue.$toast.success('startProcess succeded')
      } else {
        Vue.$toast.error('startProcess failed')
        context.dispatch('action_inspectChatObj')
      }
    },

    // updateChatSpeed
    async action_updatechatsSpeed(context, seconds) {
      context.commit('set_chatsSpeed', seconds)

      if (!myUtils.utils.socketStatus()) return

      const res1 = await context.state.socket.updateChatSpeed(seconds)
      if (res1) {
        Vue.$toast.success('updateChatSpeed succeded')
      } else {
        Vue.$toast.error('updateChatSpeed failed')
        context.dispatch('action_inspectChatObj')
      }
    },

    // updateVid
    async action_updateVideoId(context, id) {
      if (!myUtils.utils.socketStatus()) return

      const res1 = await context.state.socket.updateVid(id)

      if (res1) {
        Vue.$toast.success('updateVid succeded')
      } else {
        Vue.$toast.error('updateVid failed')
        context.dispatch('action_inspectChatObj')
      }
    },

    async action_userEnter(context) {
      // 获取用户名
      const nickname = context.state.user_info.email

      // 1， 获取房间信息roominfo； 2， 广播给其他人该用户进入了
      const res1 = await context.state.socket.userEnter(nickname)

      const temp1 = Object.keys(res1.room_info.user2socket)

      context.commit('set_roomInfo', temp1)

      console.log('action_userEnter() end - temp1->', temp1)
    },

    // 用户离开事件
    async action_userLeave(context) {
      // 广播给其他人该用户退出了
      const name = await context.state.socket.userLeave()

      // 清除房间信息roominfo
      context.commit('set_roomInfo', [])

      console.log('action_userLeave() end - name->', name)
    },

    action_exit(context) {
      // 1 terminate chatObj
      context.dispatch('action_terminateProcess')

      // 2 disconnect with server
      context.dispatch('disconnectSocket')

      // 3  navigate to LOGIN page
      router.push('/')

      // 4 delete localStorage data
      context.commit('mutation_exit')
    },

    // Actions Receiving Events

    // // 监听user_enter, 通知：有新人进房间了
    // // nickname，就是进入房间玩家的名字 (小王)
    // store.commit('addToNicknames', nickname)
    socket_userEnter({ dispatch, commit }, beVal) {
      console.log('VUEX socket_userEnter()-val->', beVal)
    },

    // // 将离开的人，从vuex nicknames中移除该项
    // store.commit('delFromNicknames', nickname)
    socket_userLeave({ dispatch, commit }, beVal) {
      console.log('VUEX socket_userLeave()-val->', beVal)
    },

    socket_customEmit({ dispatch, commit }, beVal) {
      console.log('VUEX socket_customEmit()-val->', beVal)
    },

    // 登录页面 action_login
    action_login({ commit }, credentials) {
      console.log('action_login()-credentials->', credentials)
      return axios
        .post(process.env.VUE_APP_API_URL + 'api/login', credentials)
        .then(({ data }) => {
          console.log('action_login()-data->', data)
          commit('mutation_set_userInfoData', data)
        })
    },
    // 注册页面 action_register
    action_register({ commit }, credentials) {
      console.log('action_register()-credentials->', credentials)
      return axios
        .post(process.env.VUE_APP_API_URL + 'api/register', credentials)
        .then(({ data }) => {
          console.log('action_register()->data->', data)
          commit('mutation_set_userInfoData', data)
        })
    },
    isNewUser({ commit }, isNewUser) {
      commit('IS_NEW_USER', isNewUser)
    },
    dashboard({ commit }, credentials) {
      return axios
        .get(process.env.VUE_APP_API_URL + 'api/dashboard', credentials)
        .then(({ data }) => {
          console.log('dashboard()->data->', data)
          commit('set_userAppData', data)
        })
    },
    action_set_chat(context, chat) {
      const chatsArray = JSON.parse(chat)
      const chatsLength = chatsArray.length
      console.log('chatsLength->', chatsLength)

      if (chatsLength !== 0) {
        chatsArray.forEach(element => {
          // 1 尽快设置到chats用于显示
          context.commit('set_chats', element)

          // 2 检查是否在关注viewer里，是，则保存留言(异步)
        })
      }

      // 3 存贮最新留言数长度
      context.commit('set_newChatsLength', chatsLength)

      // 4 增加留言数长度
      context.commit('set_sumChatsLength', chatsLength)

      // 5 activate systembar animation
      context.commit('set_flagAniText', true)
      context.commit('set_flagBGText', false)
    },
    action_get_viewerChats(context, viewerId) {
      context.commit('SET_VIEWER_CHAT_DATA', [])

      axios.get(process.env.VUE_APP_API_URL + 'api/u2bviewer', {
        params: {
          'viewer_channel_id': viewerId
        }
      })
        .then((response) => {
          console.log('action_get_viewerChats() 成功. response->', response)

          if (response.data.chatsCount !== 0) {
            context.commit('SET_VIEWER_CHAT_DATA', response.data.userChatsData)
          } else {
            const userEmptyChatsData = [{
              updatedAt: 1672379171,
              createdAt: 1672379171,
              viewer_channel_id: 'UCgMiVaSvG5ysiypOfmqjnx1',
              viewer_current_name: 'No data',
              messageEx: '["No message"]',
              recipient_email: 'No@no.no',
              __v: 0,
              _id: '63ae7b2b67d76910f1111111'
            }]

            context.commit('SET_VIEWER_CHAT_DATA', userEmptyChatsData)
          }

          // console.log('context->', context)
          // this.$router.push(`/dashboard/drawer/favorite/${id}`)
          // context.$router.push(`/dashboard/drawer/favorite/oneViewer`)
        })
        .catch((error) => {
          console.log('error->', error)
        })
    },
    saveToDb_userSettings(context) {
      axios.post(process.env.VUE_APP_API_URL + 'api/settings', context.state.user_settings)
        .then((response) => {
          if (response.status === 200) {
            console.log('Settings update succeeded->', response)
            Vue.$toast.default('Settings SAVED')
          }
        })
        .catch((error) => {
          console.log('Settings update failed->', error)
          Vue.$toast.default('Settings FAILED TO SAVE')
        })
    },
    action_set_DialChatData(context, chatData) {
      if (chatData.index >= 0) {
        // 显示在对话框中
        context.commit('set_DialChatData', chatData.chat)
        // 增加到Latest栏目中的最前面
        context.commit('unshift_LatestChatData', chatData.chat)
        // 删除其原来在Latest栏目中的位置
        context.commit('slice_LatestChatData', chatData.index + 1)
      } else {
        // 显示在对话框中
        context.commit('set_DialChatData', chatData)
        // 增加到Latest栏目中的最前面
        context.commit('unshift_LatestChatData', chatData)
      }
    },
    // 确认昵称是否占用
    checkUserExist(context, nickname) {
      // 拿到异步操作的结果，需要promise封装了
      return new Promise((resolve, reject) => {
        this._vm.$socket.client.emit('check_user_exist', nickname, isExist => {
          resolve(isExist)
        })
      })
    },

    // 告诉服务器，开始游戏啦，申请主持人
    sendStartGame(context, answer) {
      // 发消息， 通知到服务器
      this._vm.$socket.client.emit('start_game', answer)
    },

    // 终止游戏 - 发消息
    sendStopGame(context) {
      this._vm.$socket.client.emit('stop_game')
    },

    sendDrawNewLine(context, line) {
      this._vm.$socket.client.emit('new_line', line)
    },
    sendUpdateNewLine(context, line) {
      this._vm.$socket.client.emit('update_line', line)
    },
    sendAnswerGame(context, inputImageName) {
      this._vm.$socket.client.emit('answer_game', inputImageName)
    },

    handleFB(context, beRes) {
      switch (beRes.req_name) {
        case 'startProcess': {
          // 暂无任何返回值

          // const html1 =
          //   '<b>' + beRes.req_name + '</b><br>' +
          //   '<div>chatsSpeed: ' + beRes.chatsSpeed + '</div>' +
          //   '<div>currentVid: ' + beRes.currentVid + '</div>' +
          //   '<div>vid_is_replay: ' + beRes.vid_is_replay + '</div>' +
          //   '<div>ID: ' + beRes.chatObj_id + '</div>'

          // Vue.$toast.info(html1, { duration: 5000 })

          break
        }

        case 'terminateProcess': {
          const class_alive = beRes.flag_is_alive ? '' : ' style="background:purple;"'

          const html1 =
            '<b>' + beRes.req_name + '</b><br>' +
            '<div' + class_alive + '>Flag_is_alive: ' + beRes.flag_is_alive + '</div>' +
            '<div>ID: ' + beRes.chatObj_id + '</div>'

          Vue.$toast.info(html1, { duration: 5000 })
          break
        }

        case 'updateVid': {
          const class_currentVid = ' style="background:purple;"'

          const html1 =
            '<b>' + beRes.req_name + '</b><br>' +
            '<div>currentVid: ' + beRes.currentVid + '</div>' +
            '<div' + class_currentVid + '>note: ' + beRes.note + '</div>'

          Vue.$toast.info(html1, { duration: 5000 })

          break
        }

        case 'updateChatSpeed': {
          const html1 =
            '<b>' + beRes.req_name + '</b><br>' +
            '<div>chatSpeed: ' + beRes.chatSpeed + '</div>'

          Vue.$toast.info(html1, { duration: 5000 })

          break
        }

        case 'createChatObject': {
          const html1 =
            '<b>' + beRes.req_name + '</b><br>' +
            '<div>ID: ' + beRes.chatObj_id + '</div>'

          Vue.$toast.info(html1, { duration: 5000 })

          break
        }

        case 'getExceptionInfo': {
          beRes.type = myUtils.utils.clearString(beRes.type)

          const modExceptionObj = {
            'from': 'getExceptionInfo',
            'type': beRes.type ? beRes.type : 'None',
            'content': beRes.content ? beRes.content : 'None',
            'timestamp': Vue.prototype.$dayjs().format('YYMMDD HH:mm:ss ZZ')
          }

          context.state.arrException.push(modExceptionObj)

          const html1 =
            '<b>getExceptionInfo</b><br>' +
            modExceptionObj.type + '<br>' +
            modExceptionObj.content

          Vue.$toast.error(html1, { duration: 0 })
          break
        }

        case 'leave': {
          const html1 =
            '<b>' + beRes.req_name + ' 122 </b><br>'

          Vue.$toast.info(html1, { duration: 5000 })
          break
        }

        case 'inspectChatObject': {
          // Toast部分，注意style前必须有个空格
          const class_exists = beRes.chatObj_exists ? '' : ' style="background:purple;"'
          const class_alive = beRes.flag_is_alive ? '' : ' style="background:purple;"'

          const html1 =
            '<b>' + beRes.req_name + '</b><br>' +
            '<div' + class_exists + '>Exists: ' + beRes.chatObj_exists + '</div>' +
            '<div' + class_alive + '>Flag_is_alive: ' + beRes.flag_is_alive + '</div>' +
            '<div>ID: ' + beRes.chatObj_id + '</div>'

          Vue.$toast.info(html1, { duration: 5000 })

          break
        }

        case 'cmd2': {
          if (beRes.res_code === 1) {
            console.log('cmd2成功')
          } else {
            console.log('cmd2失败')
          }
          break
        }

        default:
          break
      }
    }

    // 监听room_info收消息
    // socket.on('room_info', ({ nicknames, holder, lines }) => {
    //   // console.log(nicknames, holder, lines)
    //   store.commit('updateNicknames', nicknames)
    //   store.commit('updateHolder', holder)
    //   store.commit('updateLines', lines)
    // })

    // // 处理游戏成功开始
    // socket.on('game_started', holder => {
    //   store.commit('updateHolder', holder)
    //   Notification.success(`${holder} 作为主持人，已经成功开始了游戏，大家可以开始猜答案啦！`)
    // })

    // // 你去抢麦，没抢过，告诉你谁抢到了，谁组织了这个游戏
    // // 处理游戏已经开始， 但是不能重复开始的
    // socket.on('already_started', holder => {
    //   store.commit('updateHolder', holder)
    //   Notification.alert(`当前游戏已经进行中辣，主持人是 ${holder}`)
    // })

    // // 监听游戏的终止, 重置信息
    // socket.on('game_stoped', () => {
    //   // 1. 清除相关的数据 nickname nicknames holder lines
    //   store.commit('updateHolder', '')
    //   store.commit('updateLines', [])

    //   // 2. 弹出提示消息
    //   Notification.warning('主持人终止了当前的游戏')
    // })

    // // 监听线的开始绘制
    // socket.on('starting_line', line => {
    //   store.commit('drawNewLine', line)
    // })
    // // 监视线的持续绘制
    // socket.on('updating_line', line => {
    //   store.commit('updateNewLine', line)
    // })

    // // 监听猜答案的结果
    // socket.on('game_answered', ({ alreadyDone, success, nickname, answer }) => {
    //   // 处理已经答对的情况
    //   if (alreadyDone) {
    //     // MessageBox.alert('当前答案已经被人猜中啦，您不能再猜了')
    //     return
    //   }

    //   // 处理没答对
    //   if (!success) {
    //     Notification.error(`玩家 ${nickname} 猜的答案不对！ ${answer}`)
    //     return
    //   }

    //   // 现在没有其他人答对，就他答对了
    //   // MessageBox.alert(`玩家 ${nickname} 猜中了正确的答案: ${answer}`)
    // })
  },
  modules: {
  }
})
