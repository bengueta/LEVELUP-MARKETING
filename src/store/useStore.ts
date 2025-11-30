/**
 * Main Zustand store setup
 * Following Zustand best practices for Expo React Native
 * @see https://docs.pmnd.rs/zustand/getting-started/introduction
 * @see https://docs.pmnd.rs/zustand/guides/typescript
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * App state interface
 * Define your global state shape here
 */
interface AppState {
  // Example state properties - replace with your actual state
  // user: User | null;
  // theme: 'light' | 'dark';
}

/**
 * App actions interface
 * Define your global actions here
 */
interface AppActions {
  // Example actions - replace with your actual actions
  // setUser: (user: User) => void;
  // setTheme: (theme: 'light' | 'dark') => void;
  // reset: () => void;
}

type AppStore = AppState & AppActions;

/**
 * Initial state
 */
const initialState: AppState = {
  // Initialize your state here
};

/**
 * Main store using Zustand with AsyncStorage persistence
 * Persists state to AsyncStorage for offline access
 * @see https://docs.pmnd.rs/zustand/integrations/persisting-store-data
 */
export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      // Add your actions here
      // Example:
      // setUser: (user) => set({ user }),
      // reset: () => set(initialState),
    }),
    {
      name: 'app-storage', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      // Optional: specify which parts of state to persist
      // partialize: (state) => ({ user: state.user }),
    }
  )
);

