<template>
    <section class="map-main">
        <v-chart
            autoresize
            style="width: 100%; height: 100%"
            :options="map"
            @click="singleClick"
            @dblclick="dbclick"
        ></v-chart>
    </section>
</template>

<script>
import "echarts/map/js/china.js";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import { DrillDown, DrillUp } from "./map";
import { sleep } from "../../../utils/index";

let singleClickCheck = [];
export default {
    components: {},

    props: {
        bg: String,
    },

    data() {
        return {
            map: {},
        };
    },
    async created() {
        const res = await DrillDown("china");

        // console.log("created: ", res);
        this.map = res;
    },

    methods: {
        async singleClick(param) {
            singleClickCheck.push(Date.now());
            await sleep(300);
            if (singleClickCheck.length === 1) {
                // 正常点击
                singleClickCheck = [];
            } else {
                // 连击发生
                singleClickCheck = [];
                return;
            }

            let map = await DrillDown(param.name);
            if (map) {
                this.map = map;
            }
        },
        dbclick(param) {
            let map = DrillUp();
            if (map) {
                this.map = map;
            }
        },
    },
};
</script>

<style>
.map-main {
    height: 100%;
    background-color: #1d1f26;
}
</style>
