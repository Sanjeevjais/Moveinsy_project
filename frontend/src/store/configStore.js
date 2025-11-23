import { create } from "zustand";
import { fetchConfig } from "../api/configApi";

export const useConfigStore = create((set) => ({
  config: null,
  loading: true,

  loadConfig: async () => {
    const res = await fetchConfig();
    set({ config: res.data, loading: false });
  }
}));
