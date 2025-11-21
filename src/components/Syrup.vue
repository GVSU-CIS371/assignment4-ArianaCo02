<template>
  <div class="syrup" :style="{ backgroundColor: color }"></div>
</template>

<script setup lang="ts">
import { computed } from "vue"

// get the syrup choice from Beverage.vue
const props = defineProps({
  type: String
})

// pick a color based on the selected syrup
const color = computed(() => {
  if (props.type === "Vanilla") {
    return "#f3e5ab"      // light yellow
  } else if (props.type === "Caramel") {
    return "#d2a679"      // caramel brown
  } else if (props.type === "Hazelnut") {
    return "#bfa36f"      // tan
  } else {
    return "transparent"  // "No Syrup"
  }
})
</script>

<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;

  background-color: #c6c6c6;
  transition: background-color 0.3s;
}
</style>
