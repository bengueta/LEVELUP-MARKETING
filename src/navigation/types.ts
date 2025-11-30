/**
 * Navigation type definitions for React Navigation
 * Following React Navigation TypeScript setup guide
 * @see https://reactnavigation.org/docs/typescript/
 */

import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Define param lists for each navigator
export type RootStackParamList = {
  Today: undefined;
  All: undefined;
  Stats: undefined;
};

// Navigation prop type for screens
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Screen props type for screens
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

