import { create } from 'zustand';

const useEquityDataStore = create((set) => ({
  equityData: [],
  loading: false,
  setEquityData: (data) => set({ equityData: data, loading: false }),
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useEquityDataStore;
