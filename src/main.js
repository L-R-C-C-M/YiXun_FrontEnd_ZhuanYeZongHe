import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import VueCropper from 'vue-cropper'
//import axios from 'axios'
//import './mock/mock'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
//createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
const app = createApp(App)
app.use(ElementPlus, { locale });
//app.config.globalProperties.$axios = axios
//.use(ElementPlus)
app.use(store).use(router).use(VueCropper).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//引入高德地图API
// import VueAMap from 'vue-amap'
// //让Vue使用高德地图API
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//     key: '3656be7baf8903efaaf42b1ab18af172',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch',
//         'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',
//         'AMap.Geocoder', 'AMap.Geolocation'],
//     // 默认高德 sdk 版本为 1.4.4
//     v: '1.4.4',
//     uiVersion: '1.0.11'
// });
