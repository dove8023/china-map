import App from "./App.vue";
import Vue from "vue";
import ECharts from "vue-echarts/components/ECharts.vue";

import "./assets/css/hello.css";

// 注册组件后即可使用
Vue.component("v-chart", ECharts);


let app = new Vue({
    render(h) {
        return h(App);
    }
})

app.$mount("#app")

