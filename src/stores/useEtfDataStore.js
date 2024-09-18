import { create } from 'zustand';

const useEtfDataStore = create((set) => ({
  EtfData: [],
  loading: false,
  setEtfData: (data) => set({ EtfData: data, loading: false }),
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useEtfDataStore;
