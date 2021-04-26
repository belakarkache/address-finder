import Vue from 'vue'

import './styles/quasar.sass'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import lang from 'quasar/lang/pt-br.js'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Quasar, Notify, Loading } from 'quasar'

Vue.use(Quasar, {
  plugins: {
    Notify,
    Loading,
  },
  config: {},
  lang: lang,
  iconSet: iconSet
})