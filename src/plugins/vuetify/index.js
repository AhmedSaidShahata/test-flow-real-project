import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'


const myCustomLightTheme = {
  dark: false,
  colors: {
     background: '#FFFFFF',
    primary: '#9368F9',
    secondary: '#E6626D',
    tertiary: '#6804BA',
    'primary-25': '#F7F3FF',
    'primary-50': '#EEE6FE',

  }
}

// seperated new file
const vuetify = createVuetify({
  rtl: {
    customLocale: false,
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  },
  components:{
    ...components,
    ...labs,
  },

})


export default vuetify