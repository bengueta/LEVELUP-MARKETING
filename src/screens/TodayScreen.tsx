/**
 * TodayScreen - displays today's checklist
 * Shows tasks for today with completion toggle
 * Sticky header with date and coins
 * @see https://reactnative.dev/docs/safeareaview
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { useTasksStore } from '@/store/tasks';
import { TaskItem, TagPill } from '@/components';
import { todayISO } from '@/lib/date';

/**
 * Today screen component
 * Shows today's tasks with sticky header
 */
export function TodayScreen() {
  const { tasksForToday, wallet, completeTask, undoTask } = useTasksStore();
  const today = todayISO();
  const todayTasks = tasksForToday();

  const handleToggle = (id: string) => {
    const task = todayTasks.find((t) => t.id === id);
    if (task?.completed) {
      undoTask(id);
    } else {
      completeTask(id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <Text style={styles.date}>{today}</Text>
        <Text style={styles.coins}>Coins: {wallet.coins}</Text>
      </View>

      {/* Tasks List */}
      <FlatList
        data={todayTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tasks for today</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coins: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  listContent: {
    padding: 16,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

