/**
 * Tasks, Tags, and Wallet store using Zustand with AsyncStorage persistence
 *
 * Why Zustand + AsyncStorage?
 * - Zustand: קל, מהיר, API מבוסס hooks, נפוץ ב-RN
 *   - Lightweight (no providers needed, simple API)
 *   - Fast performance (minimal re-renders)
 *   - Hook-based API fits React Native patterns
 *   - Widely adopted in React Native community
 * - AsyncStorage: Persist state across app restarts
 *   - Native storage solution for React Native
 *   - Automatic JSON serialization
 *   - Works offline
 *
 * @see https://docs.pmnd.rs/zustand/getting-started/introduction
 * @see https://docs.pmnd.rs/zustand/integrations/persisting-store-data
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { isSameDay, weekRange } from '@/lib/date';

/**
 * Tag domain model
 */
export type Tag = {
  id: string;
  name: string;
  color?: string;
};

/**
 * Task priority levels
 */
export type TaskPriority = 'low' | 'med' | 'high';

/**
 * Task domain model
 */
export type Task = {
  id: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  tags: string[]; // Array of tag IDs
  priority?: TaskPriority;
  completed: boolean;
  points: number; // Score per task
};

/**
 * Wallet domain model
 */
export type Wallet = {
  coins: number;
  totalEarned: number;
};

/**
 * Store state interface
 */
interface TasksState {
  // Domain data
  tasks: Task[];
  tags: Tag[];
  wallet: Wallet;

  // Task CRUD
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  undoTask: (id: string) => void;

  // Tag CRUD
  addTag: (tag: Omit<Tag, 'id'>) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;

  // Wallet operations
  resetWallet: () => void;

  // Derived selectors (computed values)
  tasksForToday: () => Task[];
  tasksByDate: (date: string) => Task[];
  incompleteCount: (date: string) => number;
  weeklyStats: () => {
    completed: number;
    total: number;
    points: number;
    coins: number;
  };
}

/**
 * Store version for migrations
 */
const STORE_VERSION = 1;

/**
 * Initial state
 */
const initialState = {
  tasks: [] as Task[],
  tags: [] as Tag[],
  wallet: {
    coins: 0,
    totalEarned: 0,
  } as Wallet,
};

/**
 * Generate unique ID for entities
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Main tasks store with persistence
 */
export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Task CRUD
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: generateId(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      completeTask: (id) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === id);

        if (!task || task.completed) {
          return;
        }

        // Update task to completed
        set((currentState) => ({
          tasks: currentState.tasks.map((t) =>
            t.id === id ? { ...t, completed: true } : t
          ),
          wallet: {
            coins: currentState.wallet.coins + task.points,
            totalEarned: currentState.wallet.totalEarned + task.points,
          },
        }));
      },

      undoTask: (id) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === id);

        if (!task || !task.completed) {
          return;
        }

        // Update task to incomplete and subtract points
        set((currentState) => ({
          tasks: currentState.tasks.map((t) =>
            t.id === id ? { ...t, completed: false } : t
          ),
          wallet: {
            coins: Math.max(0, currentState.wallet.coins - task.points),
            totalEarned: Math.max(0, currentState.wallet.totalEarned - task.points),
          },
        }));
      },

      // Tag CRUD
      addTag: (tagData) => {
        const newTag: Tag = {
          ...tagData,
          id: generateId(),
        };

        set((state) => ({
          tags: [...state.tags, newTag],
        }));
      },

      updateTag: (id, updates) => {
        set((state) => ({
          tags: state.tags.map((tag) =>
            tag.id === id ? { ...tag, ...updates } : tag
          ),
        }));
      },

      deleteTag: (id) => {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          // Remove tag from all tasks that use it
          tasks: state.tasks.map((task) => ({
            ...task,
            tags: task.tags.filter((tagId) => tagId !== id),
          })),
        }));
      },

      // Wallet operations
      resetWallet: () => {
        set({
          wallet: {
            coins: 0,
            totalEarned: 0,
          },
        });
      },

      // Derived selectors (pure functions that compute values from state)
      tasksForToday: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        return state.tasks.filter((task) => task.date === today);
      },

      tasksByDate: (date) => {
        const state = get();
        return state.tasks.filter((task) => task.date === date);
      },

      incompleteCount: (date) => {
        const state = get();
        return state.tasks.filter(
          (task) => task.date === date && !task.completed
        ).length;
      },

      weeklyStats: () => {
        const state = get();
        const today = new Date();
        const week = weekRange(today);

        const weekTasks = state.tasks.filter((task) => {
          return task.date >= week.start && task.date <= week.end;
        });

        const completed = weekTasks.filter((task) => task.completed);
        const total = weekTasks.length;
        const points = completed.reduce((sum, task) => sum + task.points, 0);
        const coins = state.wallet.coins;

        return {
          completed: completed.length,
          total,
          points,
          coins,
        };
      },
    }),
    {
      name: 'tasks-store',
      version: STORE_VERSION,
      storage: createJSONStorage(() => AsyncStorage),
      // Migration function for future schema changes
      migrate: (persistedState: any, version: number) => {
        if (version < STORE_VERSION) {
          // Handle migrations here if needed
          // Example: if (version === 0) { /* migrate from v0 to v1 */ }
          return persistedState;
        }
        return persistedState;
      },
      // Partial persistence - only persist specific fields
      partialize: (state) => ({
        tasks: state.tasks,
        tags: state.tags,
        wallet: state.wallet,
      }),
    }
  )
);

