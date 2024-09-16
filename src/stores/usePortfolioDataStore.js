import { create } from 'zustand';

const usePortfolioDataStore = create((set) => ({
  portfolioData: [],
  loading: false,
  error: null,
  latestFolderDate: null,
  setPortfolioData: (data) => set({ portfolioData: data, loading: false }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (error) => set({ error }),
  setLatestFolderDate: (date) => set({ latestFolderDate: date }),
}));

export default usePortfolioDataStore;
