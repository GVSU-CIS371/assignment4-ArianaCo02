<template>
  <div>
    <!-- Beverage Mug Display -->
    <Beverage
      :isIced="beverageStore.selectedTemperature === 'Cold'"
      :base="beverageStore.selectedBase.name"
      :syrup="beverageStore.selectedSyrup.name"
      :creamer="beverageStore.selectedCreamer.name"
    />

    <!-- Temperature Toggle -->
    <ul>
      <li>
        <template v-for="temp in beverageStore.temperatures" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.selectedTemperature"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>

    <!-- Name input -->
    <input
      type="text"
      placeholder="Beverage Name"
      v-model="beverageStore.beverageName"
    />

    <!-- Make Beverage button -->
    <button @click="beverageStore.makeBeverage">🍺 Make Beverage</button>

    <!-- Saved Beverage List -->
    <div id="beverage-container" style="margin-top: 20px">
      <h3>Saved Beverages:</h3>

      <div v-if="beverageStore.beverages.length === 0">
        <em>No beverages saved yet.</em>
      </div>

      <ul v-else>
        <li
          v-for="drink in beverageStore.beverages"
          :key="drink.name"
          style="margin: 4px 0;"
        >
          <button @click="beverageStore.showBeverage(drink)">
            {{ drink.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

// connect to the Pinia store
const beverageStore = useBeverageStore();
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}

ul {
  list-style: none;
}
</style>
