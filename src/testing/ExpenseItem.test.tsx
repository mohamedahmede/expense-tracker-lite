import { formatExpenseDate } from '../utils/expenseUtils';

describe('Expense Utilities', () => {
  test('should format today\'s date correctly', () => {
    const today = new Date();
    const formatted = formatExpenseDate(today.toISOString());
    expect(formatted).toContain('Today');
  });

  test('should format yesterday\'s date correctly', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formatted = formatExpenseDate(yesterday.toISOString());
    expect(formatted).toContain('Yesterday');
  });

  test('should format older dates correctly', () => {
    const oldDate = new Date('2024-01-01');
    const formatted = formatExpenseDate(oldDate.toISOString());
    expect(formatted).toMatch(/Jan \d+/);
  });
}); 