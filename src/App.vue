<template>
  <div>
    <p class="tip">单击下钻，双击返回</p>
    <Map :style="mapStyle" />
  </div>
</template>

<script>
import Map from "./view/chinaMap/index.vue";

export default {
  components: {
    Map,
  },
  data() {
    return {
      mapStyle: {
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      },
    };
  },
};
</script>

<style>
h1,
.test {
  color: yellow;
  font-size: 30px;
}

body {
  background-color: #242a38;
}

p {
  font-size: 20px;
  color: yellow;
}
</style>