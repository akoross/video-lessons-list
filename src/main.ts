import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'


import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {createPinia} from 'pinia'

import App from './App.vue'
import './style.css'

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(VuePlyr, {
  plyr: {}
})
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
app.component(key, component)
  }


app.mount('#app')
