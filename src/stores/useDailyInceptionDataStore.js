import create from 'zustand';

const useDailyInceptionDataStore = create((set) => ({
  daily: null, // Store Daily data
  inception: null, // Store Inception data
  setDaily: (data) => set(() => ({ daily: data })),
  setInception: (data) => set(() => ({ inception: data })),
}));
export default useDailyInceptionDataStore;
