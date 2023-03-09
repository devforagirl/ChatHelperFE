import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

export default function createSocketConnection(store) {
  console.log('process.env.VUE_APP_BACKEND_URL U->', process.env.VUE_APP_BACKEND_URL)

  const socket = io(process.env.VUE_APP_BACKEND_URL)
  Vue.use(VueSocketIOExt, socket)

  socket.on('my_event', (data) => {
    store.commit('updateData', data)
  })

  socket.on('disconnect', (reason) => {
    console.warn('Socket disconnected:', reason)
  })

  socket.on('connect_error', (err) => {
    store.commit('set_connectError', err)
  })

  socket.on('bcUserEntered', (name) => {
    console.log('socket.js-bcUserEntered->', name)
    store.commit('bcUserEntered', name)
    // store.dispatch('bcUserEntered', name)
  })

  socket.on('bcUserLeft', (name) => {
    console.log('socket.js-bcUserLeft->', name)
    // store.commit('bcUserEntered', name)
    // store.dispatch('bcUserEntered', name)
  })

  socket.on('exceptionInfo', (err) => {
    console.log('socket.js-exceptionInfo-err->', err)
    store.commit('set_exceptionInfo', err)
  })

  socket.on('chatsData', (data) => {
    store.dispatch('action_set_chat', data)
  })

  socket.on('chat_message', (data) => {
    console.log('socket.js-chat_message-data->', data)
  })

  // ----------------------------------------------------------------

  function sendEvent() {
    return new Promise((resolve, reject) => {
      socket.emit('test3', { message: 'Hello, test3!' }, res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function userEnter(name) {
    return new Promise((resolve, reject) => {
      socket.emit('userEnter', name, res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function userLeave() {
    return new Promise((resolve, reject) => {
      socket.emit('userLeave', res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function inspectChatObject() {
    return new Promise((resolve, reject) => {
      socket.emit('inspectChatObject', res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function createChatObject() {
    return new Promise((resolve, reject) => {
      socket.emit('createChatObject', res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function terminateProcess() {
    return new Promise((resolve, reject) => {
      socket.emit('terminateProcess', res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function updateVid(id) {
    return new Promise((resolve, reject) => {
      socket.emit('updateVid', id, res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function updateChatSpeed(seconds) {
    return new Promise((resolve, reject) => {
      socket.emit('updateChatSpeed', seconds, res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function startProcess() {
    return new Promise((resolve, reject) => {
      socket.emit('startProcess', res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    }).catch(errorHandler)
  }

  function disconnect() {
    socket.disconnect()
  }

  function errorHandler(error) {
    console.error('socket.js-errorHandler-error->', error)
    // Handle the error here. You can show a notification or log the error, for example.
  }

  return {
    socket,
    sendEvent,
    userEnter,
    userLeave,
    inspectChatObject,
    createChatObject,
    startProcess,
    terminateProcess,
    updateVid,
    updateChatSpeed,
    disconnect
  }
}
