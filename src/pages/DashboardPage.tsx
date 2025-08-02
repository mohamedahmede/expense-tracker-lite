import React, { useState, useEffect } from 'react';
import ExpenseItem from '../components/dashboardPage/ExpenseItem';
import DashboardHeader from '../components/dashboardPage/DashboardHeader';
import AddExpensePopup from '../components/dashboardPage/AddExpensePopup';
import { getExpenses, type Expense } from '../data/expenses';
import { getExpenseType } from '../data/expenseTypes';
import type { AddExpenseFormValues } from '../components/dashboardPage/AddExpensePopup';

const DashboardPage = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    const allExpenses = getExpenses();
    setExpenses(allExpenses);
  };

  const handleAddExpense = (values: AddExpenseFormValues) => {
    console.log('New expense added:', values);
    // Reload expenses to show the new one
    loadExpenses();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today ' + date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffDays === 1) {
      return 'Yesterday ' + date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      {/* Recent Expenses Section */}
      <div className="px-4 pt-[6.5rem] pb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Expenses
          </h3>
          <button className="text-primary text-sm font-medium">see all</button>
        </div>

        <div className="space-y-4">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                typeId={expense.category}
                amount={expense.amount}
                date={formatDate(expense.date)}
                entryType="Manually"
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">No expenses yet</p>
              <p className="text-xs text-gray-400 mt-1">Add your first expense to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center space-y-1 text-primary">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-xs">Stats</span>
          </button>

          <button
            className="flex flex-col items-center space-y-1"
            onClick={() => setIsAddExpenseOpen(true)}
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center -mt-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-xs text-primary">Add</span>
          </button>

          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className="text-xs">Wallet</span>
          </button>

          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Add Expense Popup */}
      <AddExpensePopup
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

export default DashboardPage;
