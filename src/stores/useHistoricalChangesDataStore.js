import { create } from 'zustand';

const useHistoricalChangesDataStore = create((set) => ({
  HistoricalChanges: [],
  loading: false,
  setHistoricalChanges: (data) =>
    set({ HistoricalChanges: data, loading: false }),
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useHistoricalChangesDataStore;
