# Testing Setup

This folder contains unit tests for the expense tracker application.

## Test Files

- **`expenseValidation.test.ts`** - Tests for expense form validation logic
- **`currencyCalculation.test.ts`** - Tests for currency conversion and calculation
- **`pagination.test.ts`** - Tests for expense filtering by time periods
- **`ExpenseItem.test.tsx`** - Tests for expense utility functions

## Running Tests

```bash
npm test          # Run all tests
npm run test:watch # Run tests in watch mode
```

## Test Coverage

The tests cover:
- ✅ Expense validation (required fields, positive amounts, valid numbers)
- ✅ Currency calculation (USD conversion, fallbacks, mixed currencies)
- ✅ Pagination logic (filtering by today, week, month, all)
- ✅ Utility functions (date formatting)

## Structure

Tests follow a simple structure:
- Each test file focuses on one area of functionality
- Tests use descriptive names that explain what they're testing
- Mock data is realistic and covers edge cases
- Tests are independent and don't rely on external state 