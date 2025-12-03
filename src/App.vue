<template>
  <div>
    <h1>Custom Drink Maker</h1>


    <div>
      <label>Base:</label>
      <select v-model="store.currentBase">
        <option v-for="b in store.bases" :key="b.id" :value="b">{{ b.name }}</option>
      </select>

      <label>Creamer:</label>
      <select v-model="store.currentCreamer">
        <option v-for="c in store.creamers" :key="c.id" :value="c">{{ c.name }}</option>
      </select>

      <label>Syrup:</label>
      <select v-model="store.currentSyrup">
        <option v-for="s in store.syrups" :key="s.id" :value="s">{{ s.name }}</option>
      </select>
    </div>

    <!-- Make Beverage -->
    <button @click="store.makeBeverage">Make Beverage</button>

    <!-- Saved Beverages -->
    <h2>Saved Beverages</h2>
    <div id="beverage-container">
      <div v-for="bev in store.beverages" :key="bev.id">
        <input
          type="radio"
          :id="bev.id"
          name="beverage"
          :value="bev.id"
          v-model="store.selectedBeverageId"
          @change="store.showBeverage(bev.id)"
        />
        <label :for="bev.id">{{ bev.base.name }} + {{ bev.creamer.name }} + {{ bev.syrup.name }}</label>
      </div>
    </div>

    
    <h2>Your Mug</h2>
    <div
      id="mug"
      :style="{
        width: '200px',
        height: '200px',
        border: '2px solid black',
        borderRadius: '10px',
        backgroundColor: store.currentBase?.color || 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }"
    >
      <p>{{ store.currentBase?.name }}</p>
      <p>{{ store.currentCreamer?.name }}</p>
      <p>{{ store.currentSyrup?.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBeverageStore } from "./stores/beverageStore";

const store = useBeverageStore();

onMounted(() => {
  store.init();  
});
</script>


<style scoped>
#beverage-container {
  margin: 1rem 0;
}
#beverage-container div {
  margin-bottom: 0.5rem;
}
</style>
