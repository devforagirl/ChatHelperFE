import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#88669C',
        primary2: '#778899',
        secondary: '#673ab7',
        accent: '#ffc107',
        error: '#795548',
        warning: '#ff5722',
        info: '#00bcd4',
        success: '#4caf50'
      },
      dark: {
        primary: colors.blue.lighten3
      }
    }
  }
})

// toast的颜色也可以修改，在以下位置
// src/themes/default/_variables.scss
// https://github1s.com/ankurk91/vue-toast-notification/blob/HEAD/src/themes/default/_variables.scss
