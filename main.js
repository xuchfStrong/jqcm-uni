import Vue from 'vue'
import App from './App'
import global from '@/utils/global'
import { toast } from '@/utils/index'
import VueClipboard from 'vue-clipboard2'
import store from './store'
import i18n from './lang/i18n'

Vue.prototype.$global = global
Vue.prototype.$toast = toast
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.use(VueClipboard)

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
