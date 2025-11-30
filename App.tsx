/**
 * Main App component
 * Uses React Navigation with RootNavigator
 * @see https://reactnavigation.org/docs/getting-started
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './src/navigation';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
  );
}
