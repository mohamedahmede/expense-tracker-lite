import { render, screen } from '@testing-library/react';
import ExpenseItem from '../components/dashboardPage/ExpenseItem';

describe('ExpenseItem Component', () => {
  const mockExpense = {
    typeId: 'groceries',
    amount: 50.00,
    currency: 'USD',
    date: 'Today 2:30 PM',
    entryType: 'Manually',
    currencyConversion: {
      originalAmount: 50,
      originalCurrency: 'USD',
      usdAmount: 50,
      exchangeRate: 1,
      lastUpdated: '2024-01-15T10:00:00Z',
    },
  };

  test('should render expense item with correct data', () => {
    render(<ExpenseItem {...mockExpense} />);
    
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Today 2:30 PM')).toBeInTheDocument();
    expect(screen.getByText('Manually')).toBeInTheDocument();
  });

  test('should display currency symbol correctly', () => {
    const euroExpense = {
      ...mockExpense,
      currency: 'EUR',
      amount: 45.50,
    };
    
    render(<ExpenseItem {...euroExpense} />);
    expect(screen.getByText('€45.50')).toBeInTheDocument();
  });

  test('should handle different currencies', () => {
    const gbpExpense = {
      ...mockExpense,
      currency: 'GBP',
      amount: 35.00,
    };
    
    render(<ExpenseItem {...gbpExpense} />);
    expect(screen.getByText('£35.00')).toBeInTheDocument();
  });
}); 