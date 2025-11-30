/**
 * StatsScreen - displays key performance indicators
 * Shows tasks done today/this week and coins earned
 * @see https://reactnative.dev/docs/safeareaview
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { useTasksStore } from '@/store/tasks';
import { KPIBox } from '@/components';
import { todayISO } from '@/lib/date';

/**
 * Stats screen component
 * Shows KPIs for tasks and coins
 */
export function StatsScreen() {
  const { tasksForToday, weeklyStats, wallet } = useTasksStore();
  const todayTasks = tasksForToday();
  const stats = weeklyStats();

  const tasksDoneToday = todayTasks.filter((t) => t.completed).length;
  const tasksDoneThisWeek = stats.completed;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Statistics</Text>

        <View style={styles.kpiRow}>
          <KPIBox label="Tasks Done Today" value={tasksDoneToday} />
          <KPIBox label="Tasks Done This Week" value={tasksDoneThisWeek} />
        </View>

        <View style={styles.kpiRow}>
          <KPIBox label="Current Coins" value={wallet.coins} />
          <KPIBox label="Total Earned" value={wallet.totalEarned} />
        </View>

        <View style={styles.kpiRow}>
          <KPIBox label="Weekly Points" value={stats.points} />
          <KPIBox label="Total Tasks" value={stats.total} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});

