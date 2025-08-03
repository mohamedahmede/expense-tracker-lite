import { calculateTotalExpensesUSD } from '../utils/expenseUtils';
import type { Expense } from '../data/expenses';

describe('Currency Calculation', () => {
  test('should calculate total with USD conversion', () => {
    const expenses: Expense[] = [
      {
        id: '1',
        category: 'groceries',
        amount: 100,
        date: '2024-01-15',
        currency: 'USD',
        createdAt: '2024-01-15T10:00:00Z',
        currencyConversion: {
          originalAmount: 100,
          originalCurrency: 'USD',
          usdAmount: 100,
          exchangeRate: 1,
          lastUpdated: '2024-01-15T10:00:00Z',
        },
      },
      {
        id: '2',
        category: 'entertainment',
        amount: 50,
        date: '2024-01-15',
        currency: 'EUR',
        createdAt: '2024-01-15T11:00:00Z',
        currencyConversion: {
          originalAmount: 50,
          originalCurrency: 'EUR',
          usdAmount: 55,
          exchangeRate: 1.1,
          lastUpdated: '2024-01-15T11:00:00Z',
        },
      },
    ];

    const total = calculateTotalExpensesUSD(expenses);
    expect(total).toBe(155); // 100 + 55
  });

  test('should fallback to original amount when no conversion available', () => {
    const expenses: Expense[] = [
      {
        id: '1',
        category: 'groceries',
        amount: 100,
        date: '2024-01-15',
        currency: 'USD',
        createdAt: '2024-01-15T10:00:00Z',
        // No currencyConversion
      },
      {
        id: '2',
        category: 'entertainment',
        amount: 50,
        date: '2024-01-15',
        currency: 'EUR',
        createdAt: '2024-01-15T11:00:00Z',
        currencyConversion: {
          originalAmount: 50,
          originalCurrency: 'EUR',
          usdAmount: 55,
          exchangeRate: 1.1,
          lastUpdated: '2024-01-15T11:00:00Z',
        },
      },
    ];

    const total = calculateTotalExpensesUSD(expenses);
    expect(total).toBe(155); // 100 (fallback) + 55
  });

  test('should return zero for empty expenses', () => {
    const expenses: Expense[] = [];
    const total = calculateTotalExpensesUSD(expenses);
    expect(total).toBe(0);
  });

  test('should handle mixed currencies correctly', () => {
    const expenses: Expense[] = [
      {
        id: '1',
        category: 'groceries',
        amount: 100,
        date: '2024-01-15',
        currency: 'USD',
        createdAt: '2024-01-15T10:00:00Z',
        currencyConversion: {
          originalAmount: 100,
          originalCurrency: 'USD',
          usdAmount: 100,
          exchangeRate: 1,
          lastUpdated: '2024-01-15T10:00:00Z',
        },
      },
      {
        id: '2',
        category: 'entertainment',
        amount: 200,
        date: '2024-01-15',
        currency: 'GBP',
        createdAt: '2024-01-15T11:00:00Z',
        currencyConversion: {
          originalAmount: 200,
          originalCurrency: 'GBP',
          usdAmount: 260,
          exchangeRate: 1.3,
          lastUpdated: '2024-01-15T11:00:00Z',
        },
      },
      {
        id: '3',
        category: 'transportation',
        amount: 75,
        date: '2024-01-15',
        currency: 'EUR',
        createdAt: '2024-01-15T12:00:00Z',
        currencyConversion: {
          originalAmount: 75,
          originalCurrency: 'EUR',
          usdAmount: 82.5,
          exchangeRate: 1.1,
          lastUpdated: '2024-01-15T12:00:00Z',
        },
      },
    ];

    const total = calculateTotalExpensesUSD(expenses);
    expect(total).toBe(442.5); // 100 + 260 + 82.5
  });
}); 