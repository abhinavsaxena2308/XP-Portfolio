import { create } from 'zustand';

const defaultIconPositions = {
  projects: { x: 40, y: 40 },
  certificates: { x: 40, y: 140 },
  resume: { x: 40, y: 240 },
  about: { x: 40, y: 340 },
  contact: { x: 40, y: 440 },
};

export const useDesktopStore = create((set) => ({
  selectedIcon: null,
  startMenuOpen: false,
  iconPositions: defaultIconPositions,

  selectIcon: (iconId) => set({ selectedIcon: iconId }),
  deselectIcon: () => set({ selectedIcon: null }),

  setIconPosition: (iconId, position) => set((state) => ({
    iconPositions: {
      ...state.iconPositions,
      [iconId]: position,
    },
  })),

  toggleStartMenu: () => set((state) => ({ startMenuOpen: !state.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),
}));
