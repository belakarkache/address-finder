import Vue from 'vue'
import App from './App.vue'
import './quasar'
import './styles/app.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
