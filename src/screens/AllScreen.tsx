/**
 * AllScreen - displays all tasks grouped by date
 * Tag filter bar and quick add input
 * @see https://reactnative.dev/docs/flatlist
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from 'react-native';

import { useTasksStore } from '@/store/tasks';
import { TaskItem, TagPill } from '@/components';
import { todayISO } from '@/lib/date';

/**
 * All screen component
 * Shows all tasks grouped by date with tag filter
 */
export function AllScreen() {
  const { tasks, tags, addTask, tasksByDate } = useTasksStore();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Group tasks by date
  const groupedTasks = React.useMemo(() => {
    const dates = Array.from(new Set(tasks.map((t) => t.date))).sort();
    const sections = dates.map((date) => ({
      title: date,
      data: tasksByDate(date),
    }));

    // Filter by selected tag if any
    if (selectedTag) {
      return sections.map((section) => ({
        ...section,
        data: section.data.filter((task) => task.tags.includes(selectedTag)),
      }));
    }

    return sections;
  }, [tasks, selectedTag]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      date: todayISO(),
      tags: selectedTag ? [selectedTag] : [],
      completed: false,
      points: 5, // Default points
    });

    setNewTaskTitle('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tag Filter Bar */}
      <View style={styles.filterBar}>
        <Text style={styles.filterLabel}>Filter:</Text>
        <FlatList
          horizontal
          data={tags}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedTag(selectedTag === item.id ? null : item.id)
              }
            >
              <TagPill
                tag={item}
                onPress={() =>
                  setSelectedTag(selectedTag === item.id ? null : item.id)
                }
              />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Quick Add Input */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quick add task..."
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List Grouped by Date */}
      <SectionList
        sections={groupedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={(id) => {
              const task = tasks.find((t) => t.id === id);
              if (task?.completed) {
                useTasksStore.getState().undoTask(id);
              } else {
                useTasksStore.getState().completeTask(id);
              }
            }}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tasks</Text>
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
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterLabel: {
    fontSize: 14,
    marginRight: 8,
    fontWeight: '600',
  },
  addContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
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

