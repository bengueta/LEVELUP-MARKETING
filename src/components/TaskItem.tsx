/**
 * TaskItem component - displays a single task
 * Minimal UI with toggle complete functionality
 * @see https://reactnative.dev/docs/touchableopacity
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import type { Task } from '@/store/tasks';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

/**
 * Minimal task item component
 * Shows title, tags, and completion toggle
 */
export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onToggle(task.id)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        {task.priority && (
          <Text style={styles.priority}>{task.priority}</Text>
        )}
        <Text style={styles.points}>{task.points} pts</Text>
      </View>
      <View style={styles.checkbox}>
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  priority: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  points: {
    fontSize: 12,
    color: '#999',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

