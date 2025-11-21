
<template>
  <div class="froth" :style="{ backgroundColor: color }">
    <!-- creates 5 foam bubbles -->
    <div v-for="n in 5" :key="n" class="foam"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

// get the creamer choice from Beverage.vue
const props = defineProps({
  type: String
})

// change the color of the froth depending on what the user picked
const color = computed(() => {
  if (props.type === "Milk") {
    return "#fffbe9"    // light cream color
  } else if (props.type === "Cream") {
    return "#fff4d6"    // slightly darker
  } else if (props.type === "Half & Half") {
    return "#f0e6d2"    // beige
  } else {
    return "#c6c6c6"    // default color
  }
})
</script>

<style scoped lang="scss">
.froth {
  position: relative;
  height: 20%;
  width: 100%;
  overflow: visible;
  transform: translateY(400%);
  background-color: #c6c6c6;
  animation: pour-tea 2s 2s forwards;
  transition: background-color 0.3s;
}

.foam {
  background: #e4e0d2;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  position: absolute;
}


.foam:nth-child(1) { top: 0; left: -3px; }
.foam:nth-child(2) { top: 0; left: 55px; }
.foam:nth-child(3) { top: 3px; left: 30px; width: 30px; height: 30px; border-radius: 40px; }
.foam:nth-child(4) { top: 5px; right: -2px; width: 30px; height: 30px; border-radius: 45px; }
.foam:nth-child(5) { top: 2px; right: 10px; }
</style>
