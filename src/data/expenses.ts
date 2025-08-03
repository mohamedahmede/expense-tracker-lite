import { convertToUSD } from "../api/currency";
import type { CurrencyConversion } from "../api/currency";
import {
	generateExpenseId,
	sortExpensesByDate,
	filterExpensesByPeriod,
	calculateTotalExpensesUSD,
} from "../utils/expenseUtils";

export interface Expense {
	id: string;
	category: string;
	amount: number;
	date: string;
	currency: string;
	receipt?: string; 
	createdAt: string; 
	// Currency conversion data
	currencyConversion?: CurrencyConversion;
}

const EXPENSES_STORAGE_KEY = "expense-tracker-expenses";

// Initialize expenses from localStorage
const initializeExpenses = (): Expense[] => {
	try {
		const stored = localStorage.getItem(EXPENSES_STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
		return [];
	} catch (error) {
		console.error("Error loading expenses from localStorage:", error);
		return [];
	}
};

// Get all expenses (sorted by date, newest first)
export const getExpenses = (): Expense[] => {
	const expenses = initializeExpenses();
	return sortExpensesByDate(expenses);
};

// Add a new expense with currency conversion
export const addExpense = async (
	expense: Omit<Expense, "id" | "createdAt" | "currencyConversion">
): Promise<Expense> => {
	const expenses = getExpenses();

	// Convert amount to USD
	let currencyConversion: CurrencyConversion | undefined;
	try {
		currencyConversion = await convertToUSD(expense.amount, expense.currency);
	} catch (error) {
		console.error("Failed to convert currency:", error);
		// Continue without conversion if it fails
		currencyConversion = {
			originalAmount: expense.amount,
			originalCurrency: expense.currency,
			usdAmount: expense.amount,
			exchangeRate: 1,
			lastUpdated: new Date().toISOString()
		};
	}

	const newExpense: Expense = {
		...expense,
		id: generateExpenseId(),
		createdAt: new Date().toISOString(),
		currencyConversion,
	};

	expenses.unshift(newExpense); // Add to beginning for newest first

	try {
		localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
	} catch (error) {
		console.error("Error saving expenses to localStorage:", error);
	}

	return newExpense;
};

// Get expenses by period (using utility function)
export const getExpensesByPeriod = (
	period: "today" | "this-week" | "this-month" | "this-year" | "all"
): Expense[] => {
	const allExpenses = getExpenses();
	return filterExpensesByPeriod(allExpenses, period);
};

// Get total expenses for a specific period
export const getTotalExpensesByPeriod = (
	period: "today" | "this-week" | "this-month" | "this-year" | "all"
): number => {
	const expenses = getExpensesByPeriod(period);
	return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Get total expenses in USD for a specific period
export const getTotalExpensesByPeriodUSD = (
	period: "today" | "this-week" | "this-month" | "this-year" | "all"
): number => {
	const expenses = getExpensesByPeriod(period);
	return calculateTotalExpensesUSD(expenses);
};
