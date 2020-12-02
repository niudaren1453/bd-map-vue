import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vueJsonp from 'vue-jsonp'
import BaiduMap from 'vue-baidu-map'
Vue.config.productionTip = false

Vue.use(BaiduMap, {
    /* 申请的百度密钥，可以在百度地图官网申请 */
    ak: ''
})

// Vue.use(vueJsonp)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
