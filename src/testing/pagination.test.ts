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
    // Mock today's date
    const originalDate = global.Date;
    global.Date = class extends Date {
      constructor() {
        super('2024-01-15');
      }
    } as any;

    const filtered = filterExpensesByPeriod(mockExpenses, 'today');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('1');

    global.Date = originalDate;
  });

  test('should filter expenses by this week', () => {
    // Mock today's date to be in the same week as our test data
    const originalDate = global.Date;
    global.Date = class extends Date {
      constructor() {
        super('2024-01-16'); // Wednesday of the same week
      }
    } as any;

    const filtered = filterExpensesByPeriod(mockExpenses, 'this-week');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(expense => {
      const expenseDate = new Date(expense.date);
      const today = new Date('2024-01-16');
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
    })).toBe(true);

    global.Date = originalDate;
  });

  test('should filter expenses by this month', () => {
    // Mock today's date to be in the same month as our test data
    const originalDate = global.Date;
    global.Date = class extends Date {
      constructor() {
        super('2024-01-20');
      }
    } as any;

    const filtered = filterExpensesByPeriod(mockExpenses, 'this-month');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(expense => {
      const expenseDate = new Date(expense.date);
      const today = new Date('2024-01-20');
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
    })).toBe(true);

    global.Date = originalDate;
  });

  test('should return empty array for period with no matching expenses', () => {
    // Mock today's date to be in a different month
    const originalDate = global.Date;
    global.Date = class extends Date {
      constructor() {
        super('2024-03-15'); // Different month
      }
    } as any;

    const filtered = filterExpensesByPeriod(mockExpenses, 'this-month');
    expect(filtered).toHaveLength(0);

    global.Date = originalDate;
  });

  test('should handle empty expenses array', () => {
    const emptyExpenses: Expense[] = [];
    const filtered = filterExpensesByPeriod(emptyExpenses, 'all');
    expect(filtered).toHaveLength(0);
  });
}); 