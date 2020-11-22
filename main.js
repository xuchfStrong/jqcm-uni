import Vue from 'vue'
import App from './App'
import global from '@/utils/global'
import { toast } from '@/utils/index'
import VueClipboard from 'vue-clipboard2'

Vue.prototype.$global = global
Vue.prototype.$toast = toast
Vue.config.productionTip = false
Vue.use(VueClipboard)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
