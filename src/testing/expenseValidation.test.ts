import { AddExpenseSchema } from '../schemas/addExpensePopupSchema';

describe('Expense Validation', () => {
  test('should validate a valid expense', async () => {
    const validExpense = {
      category: 'groceries',
      amount: '50.00',
      date: '2024-01-15',
      currency: 'USD',
    };

    const result = await AddExpenseSchema.validate(validExpense);
    expect(result).toEqual(validExpense);
  });

  test('should reject empty category', async () => {
    const invalidExpense = {
      category: '',
      amount: '50.00',
      date: '2024-01-15',
      currency: 'USD',
    };

    try {
      await AddExpenseSchema.validate(invalidExpense);
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Category is required');
    }
  });

  test('should reject negative amount', async () => {
    const invalidExpense = {
      category: 'groceries',
      amount: '-50.00',
      date: '2024-01-15',
      currency: 'USD',
    };

    try {
      await AddExpenseSchema.validate(invalidExpense);
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Amount must be positive');
    }
  });

  test('should reject zero amount', async () => {
    const invalidExpense = {
      category: 'groceries',
      amount: '0',
      date: '2024-01-15',
      currency: 'USD',
    };

    try {
      await AddExpenseSchema.validate(invalidExpense);
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Amount must be positive');
    }
  });

  test('should reject invalid number', async () => {
    const invalidExpense = {
      category: 'groceries',
      amount: 'abc',
      date: '2024-01-15',
      currency: 'USD',
    };

    try {
      await AddExpenseSchema.validate(invalidExpense);
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Amount must be positive');
    }
  });

  test('should reject empty date', async () => {
    const invalidExpense = {
      category: 'groceries',
      amount: '50.00',
      date: '',
      currency: 'USD',
    };

    try {
      await AddExpenseSchema.validate(invalidExpense);
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Date is required');
    }
  });
}); 