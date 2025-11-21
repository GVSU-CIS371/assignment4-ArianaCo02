import { defineStore } from "pinia";
import db from "../firebase"; // make sure firebase.ts exports initialized Firestore
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

// Types
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
    async init() {
      // Default data
      const defaultBases: BeverageItem[] = [
        { id: "b1", name: "Black Tea", color: "#8B4513" },
        { id: "b2", name: "Green Tea", color: "#C8E6C9" },
        { id: "b3", name: "Coffee", color: "#6F4E37" },
      ];
      const defaultCreamers: BeverageItem[] = [
        { id: "c1", name: "No Cream", color: "transparent" },
        { id: "c2", name: "Milk", color: "AliceBlue" },
        { id: "c3", name: "Cream", color: "#F5F5DC" },
        { id: "c4", name: "Half & Half", color: "#FFFACD" },
      ];
      const defaultSyrups: BeverageItem[] = [
        { id: "s1", name: "No Syrup", color: "transparent" },
        { id: "s2", name: "Vanilla", color: "#FFEFD5" },
        { id: "s3", name: "Caramel", color: "#DAA520" },
        { id: "s4", name: "Hazelnut", color: "#6B4423" },
      ];

     
      async function ensureCollection(name: string, items: BeverageItem[]) {
        const snap = await getDocs(collection(db, name));
        if (snap.empty) {
          for (const item of items) {
            await setDoc(doc(db, name, item.id), item);
          }
        }
        const updatedSnap = await getDocs(collection(db, name));
        return updatedSnap.docs.map(doc => doc.data() as BeverageItem);
      }

      // Initialize collections
      this.bases = await ensureCollection("bases", defaultBases);
      this.creamers = await ensureCollection("creamers", defaultCreamers);
      this.syrups = await ensureCollection("syrups", defaultSyrups);

      // Set default selections
      this.currentBase = this.bases[0] || null;
      this.currentCreamer = this.creamers[0] || null;
      this.currentSyrup = this.syrups[0] || null;

      // Load beverages
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
