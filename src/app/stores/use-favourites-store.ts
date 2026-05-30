import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavouritesState {
  toolIds: string[];
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (): FavouritesState => ({
      toolIds: [],
    }),
    { name: "devbox:favourites" },
  ),
);
