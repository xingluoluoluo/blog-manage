import { createApp } from 'vue'

import App from './App.vue'
import '@yike-design/ui/es/index.less'
// 引入全局方法
import { YkMessage, YkNotification } from '@yike-design/ui'
// 引入图标
import Icon from '@yike-design/ui/es/components/svg-icon'
// 引入路由
import router from './router'
import './style.less'

// 状态管理
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$notification = YkNotification
app.config.globalProperties.$message = YkMessage
app.use(router).use(Icon).use(pinia).mount('#app')
