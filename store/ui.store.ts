import { create } from "zustand";

type UIStoreState = {
  sidebarOpen: boolean;
};

type UIStoreActions = {
  toggleSidebar: (
    uiState?:
      | UIStoreState["sidebarOpen"]
      | ((
          currentState: UIStoreState["sidebarOpen"],
        ) => UIStoreState["sidebarOpen"]),
  ) => void;
};

type UiStore = UIStoreState & UIStoreActions;

const useUIStore = create<UiStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export { useUIStore };
