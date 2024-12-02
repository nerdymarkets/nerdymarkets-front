import create from 'zustand';

const useDailyInceptionDataStore = create((set) => ({
  daily: null,
  setDaily: (data) => set(() => ({ daily: data })),
}));
export default useDailyInceptionDataStore;
