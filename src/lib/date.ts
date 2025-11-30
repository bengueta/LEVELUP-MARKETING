/**
 * Date utility functions
 * Pure functions for date manipulation and comparison
 * @example
 * todayISO() // "2025-11-04"
 * isSameDay(new Date('2025-11-04'), new Date('2025-11-04')) // true
 * weekRange(new Date('2025-11-04')) // { start: "2025-11-04", end: "2025-11-10" }
 */

/**
 * Returns today's date in ISO format (YYYY-MM-DD)
 * @returns ISO date string in format YYYY-MM-DD
 * @example
 * todayISO() // "2025-11-04"
 */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Checks if two dates represent the same day (ignoring time)
 * @param a - First date (Date object or ISO string)
 * @param b - Second date (Date object or ISO string)
 * @returns true if both dates are on the same day
 * @example
 * isSameDay(new Date('2025-11-04T10:00:00'), new Date('2025-11-04T15:30:00')) // true
 * isSameDay(new Date('2025-11-04'), new Date('2025-11-05')) // false
 * isSameDay('2025-11-04', '2025-11-04') // true
 */
export function isSameDay(a: Date | string, b: Date | string): boolean {
  const dateA = typeof a === 'string' ? new Date(a) : a;
  const dateB = typeof b === 'string' ? new Date(b) : b;

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

/**
 * Returns the start and end dates of the week containing the given date
 * Week starts on Monday (ISO 8601 standard)
 * @param date - Date to get week range for (Date object or ISO string)
 * @returns Object with start and end dates in ISO format (YYYY-MM-DD)
 * @example
 * weekRange(new Date('2025-11-04')) // { start: "2025-11-03", end: "2025-11-09" }
 * weekRange('2025-11-06') // { start: "2025-11-03", end: "2025-11-09" }
 */
export function weekRange(date: Date | string): {
  start: string;
  end: string;
} {
  const inputDate = typeof date === 'string' ? new Date(date) : date;
  const dateObj = new Date(inputDate);

  // Get Monday of the week (ISO 8601: Monday = 0, Sunday = 6)
  const dayOfWeek = dateObj.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days

  const monday = new Date(dateObj);
  monday.setDate(dateObj.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  // Get Sunday of the week
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    start: monday.toISOString().split('T')[0],
    end: sunday.toISOString().split('T')[0],
  };
}

