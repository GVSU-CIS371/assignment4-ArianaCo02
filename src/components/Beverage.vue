<template>
  <div>
    <!-- Mug display -->
    <div class="mug">
      <slot />
    </div>

    <!-- Temperature selection -->
    <div class="options">
      <label v-for="temp in beverageStore.temperatures" :key="temp">
        <input
          type="radio"
          v-model="beverageStore.selectedTemperature"
          :value="temp"
        />
        {{ temp }}
      </label>
    </div>

    <!-- Base selection -->
    <div class="options">
      <label v-for="b in beverageStore.bases" :key="b.id">
        <input
          type="radio"
          v-model="beverageStore.selectedBase"
          :value="b"
        />
        {{ b.name }}
      </label>
    </div>

    <!-- Syrup selection -->
    <div class="options">
      <label v-for="s in beverageStore.syrups" :key="s.id">
        <input
          type="radio"
          v-model="beverageStore.selectedSyrup"
          :value="s"
        />
        {{ s.name }}
      </label>
    </div>

    <!-- Creamer selection -->
    <div class="options">
      <label v-for="c in beverageStore.creamers" :key="c.id">
        <input
          type="radio"
          v-model="beverageStore.selectedCreamer"
          :value="c"
        />
        {{ c.name }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBeverageStore } from "../stores/beverageStore";
const beverageStore = useBeverageStore();
</script>

<style scoped>
.mug {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.options {
  margin: 10px 0;
}

label {
  margin-right: 10px;
}
</style>
