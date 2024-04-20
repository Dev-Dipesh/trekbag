import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialItems } from "../lib/constants";

const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      toggleItem: (id) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                isPacked: !item.isPacked,
              };
            }
            return item;
          }),
        }));
      },
      addItem: (name) => {
        set((state) => ({
          items: [
            ...state.items,
            {
              id: Date.now(),
              name,
              isPacked: false,
            },
          ],
        }));
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      removeAllItems: () => {
        set({ items: [] });
      },
      markAllAsPacked: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, isPacked: true })),
        }));
      },
      markAllAsUnpacked: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, isPacked: false })),
        }));
      },
      resetToInitial: () => {
        set(() => ({ items: initialItems }));
      },
    }),
    { name: "items" }
  )
);

// Custom hook for items will only re-render when items change instead of the entire state
// Custom hook for totalItems
export const useTotalItems = () => {
  const totalItems = useItemsStore((state) => state.items.length);
  return totalItems;
};

// Custom hook for totalPackedItems
export const useTotalPackedItems = () => {
  const totalPackedItems = useItemsStore(
    (state) => state.items.filter((items) => items.isPacked).length
  );
  return totalPackedItems;
};

export default useItemsStore;
