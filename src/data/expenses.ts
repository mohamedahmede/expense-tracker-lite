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
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

// Get expenses filtered by time period
export const getExpensesByPeriod = (period: 'today' | 'this-week' | 'this-month' | 'this-year' | 'all'): Expense[] => {
  const allExpenses = getExpenses();
  
  console.log('Filtering for period:', period, 'Total expenses:', allExpenses.length);
  
  if (period === 'all') {
    console.log('Returning all expenses:', allExpenses.length);
    return allExpenses;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const filteredExpenses = allExpenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseDateOnly = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), expenseDate.getDate());
    
    switch (period) {
      case 'today': {
        const isToday = expenseDateOnly.getTime() === today.getTime();
        console.log('Today check:', expenseDateOnly, today, isToday);
        return isToday;
      }
      
      case 'this-week': {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const inWeek = expenseDateOnly >= startOfWeek && expenseDateOnly <= endOfWeek;
        console.log('Week check:', expenseDateOnly, startOfWeek, endOfWeek, inWeek);
        return inWeek;
      }
      
      case 'this-month': {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const inMonth = expenseDateOnly >= startOfMonth && expenseDateOnly <= endOfMonth;
        console.log('Month check:', expenseDateOnly, startOfMonth, endOfMonth, inMonth);
        return inMonth;
      }
      
      case 'this-year': {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31);
        const inYear = expenseDateOnly >= startOfYear && expenseDateOnly <= endOfYear;
        console.log('Year check:', expenseDateOnly, startOfYear, endOfYear, inYear);
        return inYear;
      }
      
      default:
        return true;
    }
  });
  
  console.log('Filtered expenses for', period, ':', filteredExpenses.length);
  return filteredExpenses;
};

// Get total expenses for a specific period
export const getTotalExpensesByPeriod = (period: 'today' | 'this-week' | 'this-month' | 'this-year' | 'all'): number => {
  return getExpensesByPeriod(period).reduce((total, expense) => total + expense.amount, 0);
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