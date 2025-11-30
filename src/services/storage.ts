/**
 * AsyncStorage wrapper with type safety and JSON handling
 * Provides typed get/set/remove operations with automatic JSON serialization
 * @see https://reactnative.dev/docs/asyncstorage
 * @example
 * await storage.set('user', { name: 'John', age: 30 })
 * const user = await storage.get<User>('user')
 * await storage.remove('user')
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage key prefix to avoid conflicts
 * Can be customized if needed
 */
const STORAGE_PREFIX = '@app:';

/**
 * Gets a typed value from AsyncStorage
 * Automatically parses JSON if the value is a JSON string
 * @param key - Storage key (without prefix)
 * @returns Parsed value of type T, or null if not found
 * @example
 * const user = await storage.get<User>('user') // { name: 'John', age: 30 } | null
 * const count = await storage.get<number>('count') // 42 | null
 */
export async function get<T>(key: string): Promise<T | null> {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    const value = await AsyncStorage.getItem(fullKey);

    if (value === null) {
      return null;
    }

    // Try to parse as JSON, fallback to raw string
    try {
      return JSON.parse(value) as T;
    } catch {
      // If not valid JSON, return as string (for backwards compatibility)
      return value as unknown as T;
    }
  } catch (error) {
    console.error(`Storage get error for key "${key}":`, error);
    return null;
  }
}

/**
 * Sets a value in AsyncStorage
 * Automatically stringifies objects/arrays to JSON
 * @param key - Storage key (without prefix)
 * @param value - Value to store (will be JSON stringified if not a string)
 * @returns Promise that resolves when storage is complete
 * @example
 * await storage.set('user', { name: 'John', age: 30 })
 * await storage.set('count', 42)
 * await storage.set('message', 'Hello')
 */
export async function set<T>(key: string, value: T): Promise<void> {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;

    // Stringify if not already a string
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    await AsyncStorage.setItem(fullKey, stringValue);
  } catch (error) {
    console.error(`Storage set error for key "${key}":`, error);
    throw error;
  }
}

/**
 * Removes a value from AsyncStorage
 * @param key - Storage key (without prefix)
 * @returns Promise that resolves when removal is complete
 * @example
 * await storage.remove('user')
 */
export async function remove(key: string): Promise<void> {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    await AsyncStorage.removeItem(fullKey);
  } catch (error) {
    console.error(`Storage remove error for key "${key}":`, error);
    throw error;
  }
}

/**
 * Clears all storage items with the app prefix
 * Use with caution - removes all app data
 * @returns Promise that resolves when clearing is complete
 * @example
 * await storage.clear()
 */
export async function clear(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter((key) => key.startsWith(STORAGE_PREFIX));
    await AsyncStorage.multiRemove(appKeys);
  } catch (error) {
    console.error('Storage clear error:', error);
    throw error;
  }
}

/**
 * Gets multiple values at once
 * @param keys - Array of storage keys (without prefix)
 * @returns Object mapping keys to their values (null if not found)
 * @example
 * const data = await storage.getMultiple(['user', 'settings'])
 * // { user: { name: 'John' }, settings: { theme: 'dark' } }
 */
export async function getMultiple<T extends Record<string, unknown>>(
  keys: (keyof T)[]
): Promise<Partial<T>> {
  try {
    const fullKeys = keys.map((key) => `${STORAGE_PREFIX}${String(key)}`);
    const values = await AsyncStorage.multiGet(fullKeys);

    const result: Partial<T> = {};

    values.forEach(([fullKey, value]) => {
      if (value !== null) {
        const key = fullKey.replace(STORAGE_PREFIX, '') as keyof T;
        try {
          result[key] = JSON.parse(value) as T[keyof T];
        } catch {
          result[key] = value as unknown as T[keyof T];
        }
      }
    });

    return result;
  } catch (error) {
    console.error('Storage getMultiple error:', error);
    return {};
  }
}

/**
 * Storage service object with all methods
 * Convenience export for cleaner imports
 */
export const storage = {
  get,
  set,
  remove,
  clear,
  getMultiple,
};

