/**
 * Navigation setup using React Navigation
 * Following React Navigation v6 best practices for Expo
 * @see https://reactnavigation.org/docs/getting-started
 * @see https://docs.expo.dev/guides/using-react-navigation/
 *
 * React Navigation מומלץ רשמית - Official recommendation
 * Safe-area + screens לשיפור ביצועים - Performance optimization
 */

import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import type { RootStackParamList } from './types';
import { TodayScreen, AllScreen, StatsScreen } from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigation component
 * Configured for React Navigation Native Stack with performance optimizations
 * @see https://reactnavigation.org/docs/native-stack-navigator
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // Performance optimizations
          animation: 'default',
          animationDuration: 200,
          // Enable native stack for better performance
          presentation: 'card',
          // Disable gesture handling if needed (can be enabled per screen)
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Today"
          component={TodayScreen}
          options={{
            title: 'Today',
          }}
        />
        <Stack.Screen
          name="All"
          component={AllScreen}
          options={{
            title: 'All Tasks',
          }}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Statistics',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export navigation types for use in screens
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

