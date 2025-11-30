/**
 * Score and points utility functions
 * Pure functions for calculating points and formatting currency/coins
 * @example
 * pointsFor('high') // 10
 * pointsFor('medium') // 5
 * coinsToDisplay(1234) // "1,234"
 */

/**
 * Priority levels for tasks/items
 */
export type Priority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Default point mapping for priority levels
 * Maps priority to points value
 * @param priority - Priority level
 * @returns Points value for the given priority
 * @example
 * pointsFor('low') // 1
 * pointsFor('medium') // 5
 * pointsFor('high') // 10
 * pointsFor('critical') // 20
 */
export function pointsFor(priority: Priority): number {
  const priorityMap: Record<Priority, number> = {
    low: 1,
    medium: 5,
    high: 10,
    critical: 20,
  };

  return priorityMap[priority] ?? 0;
}

/**
 * Formats coins/number for display with thousand separators
 * @param coins - Number of coins to format
 * @returns Formatted string with thousand separators
 * @example
 * coinsToDisplay(1234) // "1,234"
 * coinsToDisplay(1000000) // "1,000,000"
 * coinsToDisplay(42) // "42"
 */
export function coinsToDisplay(coins: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(coins);
}

/**
 * Calculates total points from an array of priorities
 * @param priorities - Array of priority levels
 * @returns Sum of all points
 * @example
 * calculateTotalPoints(['low', 'medium', 'high']) // 16
 */
export function calculateTotalPoints(priorities: Priority[]): number {
  return priorities.reduce((total, priority) => total + pointsFor(priority), 0);
}

/**
 * Gets priority level from points value (reverse lookup)
 * Finds the highest priority that matches the points
 * @param points - Points value
 * @returns Priority level or null if no match
 * @example
 * priorityFromPoints(10) // "high"
 * priorityFromPoints(5) // "medium"
 * priorityFromPoints(25) // null
 */
export function priorityFromPoints(points: number): Priority | null {
  const priorityMap: Priority[] = ['critical', 'high', 'medium', 'low'];

  for (const priority of priorityMap) {
    if (pointsFor(priority) === points) {
      return priority;
    }
  }

  return null;
}

