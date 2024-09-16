import { create } from 'zustand';

const usePerformanceStore = create((set) => ({
  performanceData: null,
  loading: false,
  setPerformanceData: (data) => set({ performanceData: data, loading: false }),
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default usePerformanceStore;
