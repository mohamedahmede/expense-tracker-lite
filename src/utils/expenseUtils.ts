import type { Expense } from '../data/expenses';

// Generate unique expense ID
export const generateExpenseId = (): string => {
  return `expense_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Format date for display
export const formatExpenseDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Compare only the date part (year, month, day) to avoid time-based issues
  const expenseDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayOnly = new Date(todayOnly);
  yesterdayOnly.setDate(todayOnly.getDate() - 1);
  
  if (expenseDateOnly.getTime() === todayOnly.getTime()) {
    return (
      "Today " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  } else if (expenseDateOnly.getTime() === yesterdayOnly.getTime()) {
    return (
      "Yesterday " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  } else {
    const diffTime = todayOnly.getTime() - expenseDateOnly.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  }
};

// Calculate total expenses in USD
export const calculateTotalExpensesUSD = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => {
    if (expense.currencyConversion) {
      return total + expense.currencyConversion.usdAmount;
    }
    // Fallback to original amount if no conversion available
    return total + expense.amount;
  }, 0);
};

// Filter expenses by date period
export const filterExpensesByPeriod = (
  expenses: Expense[], 
  period: 'today' | 'this-week' | 'this-month' | 'this-year' | 'all'
): Expense[] => {
  if (period === 'all') {
    return expenses;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseDateOnly = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), expenseDate.getDate());

    switch (period) {
      case 'today': {
        return expenseDateOnly.getTime() === today.getTime();
      }

      case 'this-week': {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return expenseDateOnly >= startOfWeek && expenseDateOnly <= endOfWeek;
      }

      case 'this-month': {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return expenseDateOnly >= startOfMonth && expenseDateOnly <= endOfMonth;
      }

      case 'this-year': {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31);
        return expenseDateOnly >= startOfYear && expenseDateOnly <= endOfYear;
      }

      default:
        return true;
    }
  });
};

// Sort expenses by date (newest first)
export const sortExpensesByDate = (expenses: Expense[]): Expense[] => {
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}; 