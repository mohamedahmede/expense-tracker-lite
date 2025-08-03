import { filterExpensesByPeriod } from '../utils/expenseUtils';
import type { Expense } from '../data/expenses';

describe('Pagination Logic', () => {
  const mockExpenses: Expense[] = [
    {
      id: '1',
      category: 'groceries',
      amount: 100,
      date: '2024-01-15',
      currency: 'USD',
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      category: 'entertainment',
      amount: 50,
      date: '2024-01-16',
      currency: 'USD',
      createdAt: '2024-01-16T11:00:00Z',
    },
    {
      id: '3',
      category: 'transportation',
      amount: 75,
      date: '2024-01-17',
      currency: 'USD',
      createdAt: '2024-01-17T12:00:00Z',
    },
    {
      id: '4',
      category: 'utilities',
      amount: 200,
      date: '2024-01-18',
      currency: 'USD',
      createdAt: '2024-01-18T13:00:00Z',
    },
    {
      id: '5',
      category: 'dining',
      amount: 80,
      date: '2024-01-19',
      currency: 'USD',
      createdAt: '2024-01-19T14:00:00Z',
    },
  ];

  test('should return all expenses for "all" period', () => {
    const filtered = filterExpensesByPeriod(mockExpenses, 'all');
    expect(filtered).toHaveLength(5);
    expect(filtered).toEqual(mockExpenses);
  });

  test('should filter expenses by today', () => {
    // Create expenses with today's date
    const todayExpenses = [
      {
        id: 'today-1',
        category: 'groceries',
        amount: 100,
        date: new Date().toISOString().split('T')[0], // Today's date
        currency: 'USD',
        createdAt: new Date().toISOString(),
      },
    ];

    const filtered = filterExpensesByPeriod(todayExpenses, 'today');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('today-1');
  });

  test('should filter expenses by this week', () => {
    // Create expenses within this week
    const thisWeekExpenses = [
      {
        id: 'week-1',
        category: 'groceries',
        amount: 100,
        date: new Date().toISOString().split('T')[0], // Today
        currency: 'USD',
        createdAt: new Date().toISOString(),
      },
    ];

    const filtered = filterExpensesByPeriod(thisWeekExpenses, 'this-week');
    expect(filtered.length).toBeGreaterThan(0);
  });

  test('should filter expenses by this month', () => {
    // Create expenses within this month
    const thisMonthExpenses = [
      {
        id: 'month-1',
        category: 'groceries',
        amount: 100,
        date: new Date().toISOString().split('T')[0], // Today
        currency: 'USD',
        createdAt: new Date().toISOString(),
      },
    ];

    const filtered = filterExpensesByPeriod(thisMonthExpenses, 'this-month');
    expect(filtered.length).toBeGreaterThan(0);
  });

  test('should return empty array for period with no matching expenses', () => {
    // Create expenses from a different month
    const differentMonthExpenses = [
      {
        id: 'old-1',
        category: 'groceries',
        amount: 100,
        date: '2024-03-15', // Different month
        currency: 'USD',
        createdAt: '2024-03-15T10:00:00Z',
      },
    ];

    const filtered = filterExpensesByPeriod(differentMonthExpenses, 'this-month');
    expect(filtered).toHaveLength(0);
  });

  test('should handle empty expenses array', () => {
    const emptyExpenses: Expense[] = [];
    const filtered = filterExpensesByPeriod(emptyExpenses, 'all');
    expect(filtered).toHaveLength(0);
  });
}); 