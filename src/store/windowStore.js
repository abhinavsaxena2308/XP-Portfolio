import { create } from 'zustand';

const nextZIndex = (windows) => Math.max(0, ...windows.map((w) => w.zIndex || 0)) + 1;

export const useWindowStore = create((set, get) => ({
  windows: [],
  activeWindowId: null,

  openWindow: (id, title, icon) => set((state) => {
    const existing = state.windows.find((w) => w.id === id);
    if (existing) {
      const z = nextZIndex(state.windows);
      const updatedWindows = state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              minimized: false,
              zIndex: z,
            }
          : w
      );
      return {
        windows: updatedWindows,
        activeWindowId: id,
      };
    }

    const z = nextZIndex(state.windows);
    const window = {
      id,
      title,
      icon,
      minimized: false,
      maximized: false,
      prevGeometry: null,
      x: 120 + Math.random() * 160,
      y: 90 + Math.random() * 140,
      width: 660,
      height: 460,
      zIndex: z,
    };

    return {
      windows: [...state.windows, window],
      activeWindowId: id,
    };
  }),

  closeWindow: (id) => set((state) => {
    const remaining = state.windows.filter((w) => w.id !== id);
    let activeWindowId = state.activeWindowId;
    if (state.activeWindowId === id) {
      const top = remaining.reduce((acc, w) => (w.zIndex > (acc?.zIndex || 0) ? w : acc), null);
      activeWindowId = top?.id ?? null;
    }
    return {
      windows: remaining,
      activeWindowId,
    };
  }),

  minimizeWindow: (id) => set((state) => {
    const updated = state.windows.map((w) =>
      w.id === id
        ? {
            ...w,
            minimized: !w.minimized,
          }
        : w
    );
    const activeWindowId = state.activeWindowId === id && !state.windows.find((w) => w.id === id)?.minimized
      ? null
      : state.activeWindowId;
    return { windows: updated, activeWindowId };
  }),

  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => {
      if (w.id !== id) return w;
      if (!w.maximized) {
        return {
          ...w,
          maximized: true,
          minimized: false,
          prevGeometry: {
            x: w.x,
            y: w.y,
            width: w.width,
            height: w.height,
          },
        };
      }
      return {
        ...w,
        maximized: false,
        ...(w.prevGeometry || {}),
        prevGeometry: null,
      };
    }),
    activeWindowId: id,
  })),

  updateWindowPosition: (id, x, y) => set((state) => ({
    windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
  })),

  updateWindowSize: (id, width, height) => set((state) => ({
    windows: state.windows.map((w) => (w.id === id ? { ...w, width, height } : w)),
  })),

  focusWindow: (id) => set((state) => {
    const z = nextZIndex(state.windows);
    return {
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              minimized: false,
              zIndex: z,
            }
          : w
      ),
      activeWindowId: id,
    };
  }),

  minimizeAllExcept: (id) => set((state) => ({
    windows: state.windows.map((w) =>
      w.id === id ? { ...w, minimized: false } : { ...w, minimized: true }
    ),
    activeWindowId: id,
  })),

  closeAllWindows: () => set({ windows: [], activeWindowId: null }),
}));
