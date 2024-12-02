import create from 'zustand';

const useDailyInceptionDataStore = create((set) => ({
  daily: null, // Store Daily data
  setDaily: (data) => set(() => ({ daily: data })),
}));
export default useDailyInceptionDataStore;
