export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  currency: string;
  receipt?: string; // Base64 string for receipt image
  createdAt: string; // ISO string for sorting
}

const EXPENSES_STORAGE_KEY = 'expense-tracker-expenses';

// Initialize expenses from localStorage
const initializeExpenses = (): Expense[] => {
  try {
    const stored = localStorage.getItem(EXPENSES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Error loading expenses from localStorage:', error);
    return [];
  }
};

// Get all expenses (sorted by date, newest first)
export const getExpenses = (): Expense[] => {
  const expenses = initializeExpenses();
  return expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Add a new expense
export const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>): Expense => {
  const expenses = getExpenses();
  const newExpense: Expense = {
    ...expense,
    id: generateExpenseId(),
    createdAt: new Date().toISOString(),
  };
  
  expenses.unshift(newExpense); // Add to beginning for newest first
  
  try {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
  }
  
  return newExpense;
};

// Delete an expense
export const deleteExpense = (expenseId: string): boolean => {
  const expenses = getExpenses();
  const filteredExpenses = expenses.filter(expense => expense.id !== expenseId);
  
  try {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(filteredExpenses));
    return true;
  } catch (error) {
    console.error('Error deleting expense from localStorage:', error);
    return false;
  }
};

// Update an expense
export const updateExpense = (expenseId: string, updates: Partial<Expense>): boolean => {
  const expenses = getExpenses();
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);
  
  if (expenseIndex === -1) return false;
  
  expenses[expenseIndex] = { ...expenses[expenseIndex], ...updates };
  
  try {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch (error) {
    console.error('Error updating expense in localStorage:', error);
    return false;
  }
};

// Get expenses by category
export const getExpensesByCategory = (categoryId: string): Expense[] => {
  return getExpenses().filter(expense => expense.category === categoryId);
};

// Get total expenses
export const getTotalExpenses = (): number => {
  return getExpenses().reduce((total, expense) => total + expense.amount, 0);
};

// Get expenses for a specific date range
export const getExpensesByDateRange = (startDate: string, endDate: string): Expense[] => {
  return getExpenses().filter(expense => {
    const expenseDate = new Date(expense.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return expenseDate >= start && expenseDate <= end;
  });
};

// Generate unique expense ID
const generateExpenseId = (): string => {
  return `expense_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Clear all expenses (for testing/reset)
export const clearAllExpenses = (): void => {
  try {
    localStorage.removeItem(EXPENSES_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing expenses from localStorage:', error);
  }
}; 