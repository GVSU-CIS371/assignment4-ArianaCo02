import { defineStore } from "pinia";
import db from "../firebase"; // make sure firebase.ts exports initialized Firestore
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

// Import default data from JSON
import basesData from "../data/bases.json";
import creamersData from "../data/creamers.json";
import syrupsData from "../data/syrups.json";

interface BeverageItem {
  id: string;
  name: string;
  color: string;
}

interface Beverage {
  id?: string;
  base: BeverageItem;
  creamer: BeverageItem;
  syrup: BeverageItem;
  createdAt: Date;
}

export const useBeverageStore = defineStore("beverageStore", {
  state: () => ({
    bases: [] as BeverageItem[],
    creamers: [] as BeverageItem[],
    syrups: [] as BeverageItem[],
    currentBase: null as BeverageItem | null,
    currentCreamer: null as BeverageItem | null,
    currentSyrup: null as BeverageItem | null,
    beverages: [] as Beverage[],
    selectedBeverageId: "" as string,
  }),
  actions: {
    /** Load Firestore data and populate defaults if empty */
    async init() {
      // Helper function: populate collection if empty
      const ensureCollection = async (name: string, defaults: BeverageItem[]) => {
        const snap = await getDocs(collection(db, name));
        if (snap.empty) {
          for (const item of defaults) {
            await setDoc(doc(db, name, item.id), item);
          }
        }
        const updatedSnap = await getDocs(collection(db, name));
        return updatedSnap.docs.map(doc => doc.data() as BeverageItem);
      };

      // Initialize Firestore collections with JSON data
      this.bases = await ensureCollection("bases", basesData);
      this.creamers = await ensureCollection("creamers", creamersData);
      this.syrups = await ensureCollection("syrups", syrupsData);

      // Set default selections
      this.currentBase = this.bases[0] || null;
      this.currentCreamer = this.creamers[0] || null;
      this.currentSyrup = this.syrups[0] || null;

      // Load saved beverages
      const bevSnap = await getDocs(collection(db, "beverages"));
      this.beverages = bevSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Beverage));
    },

   
    async makeBeverage() {
      if (!this.currentBase || !this.currentCreamer || !this.currentSyrup) return;

      const beverage: Beverage = {
        base: this.currentBase,
        creamer: this.currentCreamer,
        syrup: this.currentSyrup,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "beverages"), beverage);
      this.beverages.push({ id: docRef.id, ...beverage });
    },

    /** Display selected beverage */
    showBeverage(beverageId: string) {
      this.selectedBeverageId = beverageId;
      const beverage = this.beverages.find(b => b.id === beverageId);
      if (beverage) {
        this.currentBase = beverage.base;
        this.currentCreamer = beverage.creamer;
        this.currentSyrup = beverage.syrup;
      }
    },
  },
});
