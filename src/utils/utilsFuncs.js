import Vue from 'vue'
import store from '../store/index'

// 字符串转color Hex值
export function stringToColor(str) {
  // console.log('color-str->', str)

  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var color = '#'
  for (var n = 0; n < 3; n++) {
    var value = (hash >> (n * 8)) & 0xFF
    color += ('00' + value.toString(16)).slice(-2)
  }

  // console.log('color->', color)
  return color
}

// 正则替换去除字符串中特殊字符
export function clearString(s) {
  // const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]")
  const pattern = new RegExp('[<>]')

  let rs = ''

  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '')
  }

  return rs
}

// 检查connection有效性
export function socketStatus() {
  if (store.state.socket !== null && store.state.socket.socket.connected) {
    return true
  }

  Vue.$toast.default('Not connected yet', { duration: 5000 })
  return false
}
