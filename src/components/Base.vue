<template>
  <div class="baseBeverage" :style="{ backgroundColor: color }"></div>
</template>

<script setup lang="ts">
import { computed } from "vue"

// get the selected base drink from Beverage.vue
const props = defineProps({
  type: String
})

// choose a color based on what base drink was picked
const color = computed(() => {
  if (props.type === "Coffee") {
    return "#6f4e37"     // dark brown
  } else if (props.type === "Green Tea") {
    return "#b4d68a"     // light green
  } else if (props.type === "Black Tea") {
    return "#a0522d"     // reddish brown
  } else {
    return "#c6c6c6"     
  }
})
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 300;

  
  transition: background-color 0.3s ease;
}
</style>
