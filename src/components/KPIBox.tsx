/**
 * KPIBox component - displays a key performance indicator
 * Minimal UI for stats display
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface KPIBoxProps {
  label: string;
  value: string | number;
}

/**
 * Minimal KPI box component
 * Shows label and value
 */
export function KPIBox({ label, value }: KPIBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
    minWidth: 100,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  label: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

