/**
 * TagPill component - displays a tag as a pill/badge
 * Minimal UI for tag display
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { Tag } from '@/store/tasks';

interface TagPillProps {
  tag: Tag;
  onPress?: (id: string) => void;
}

/**
 * Minimal tag pill component
 * Shows tag name with optional color
 */
export function TagPill({ tag, onPress }: TagPillProps) {
  return (
    <View
      style={[
        styles.container,
        tag.color && { backgroundColor: tag.color },
      ]}
    >
      <Text style={styles.text}>{tag.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    marginRight: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
});

