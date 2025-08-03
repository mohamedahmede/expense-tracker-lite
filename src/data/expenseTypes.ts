export interface ExpenseType {
	id: string;
	name: string;
	iconPath: string;
	bgColor: string;
	textColor: string;
}

const CATEGORIES_STORAGE_KEY = "expense-tracker-categories";

// Default categories
const DEFAULT_EXPENSE_TYPES: Record<string, ExpenseType> = {
	groceries: {
		id: "groceries",
		name: "Groceries",
		iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
		bgColor: "bg-orange-100",
		textColor: "text-blue-600",
	},
	entertainment: {
		id: "entertainment",
		name: "Entertainment",
		iconPath:
			"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
		bgColor: "bg-purple-100",
		textColor: "text-purple-600",
	},
	gas: {
		id: "gas",
		name: "Gas",
		iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
		bgColor: "bg-red-100",
		textColor: "text-red-600",
	},
	shopping: {
		id: "shopping",
		name: "Shopping",
		iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
		bgColor: "bg-pink-100",
		textColor: "text-pink-600",
	},
	news: {
		id: "news",
		name: "News",
		iconPath:
			"M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
		bgColor: "bg-yellow-100",
		textColor: "text-yellow-600",
	},
	rent: {
		id: "rent",
		name: "Rent",
		iconPath:
			"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
		bgColor: "bg-blue-100",
		textColor: "text-blue-600",
	},
	transportation: {
		id: "transportation",
		name: "Transportation",
		iconPath:
			"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
		bgColor: "bg-green-100",
		textColor: "text-green-600",
	},
	utilities: {
		id: "utilities",
		name: "Utilities",
		iconPath:
			"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
		bgColor: "bg-indigo-100",
		textColor: "text-indigo-600",
	},
	healthcare: {
		id: "healthcare",
		name: "Healthcare",
		iconPath:
			"M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z",
		bgColor: "bg-teal-100",
		textColor: "text-teal-600",
	},
	dining: {
		id: "dining",
		name: "Dining",
		iconPath:
			"M12 8c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0 6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z",
		bgColor: "bg-amber-100",
		textColor: "text-amber-600",
	},
};

// Initialize categories from localStorage or use defaults
const initializeCategories = (): Record<string, ExpenseType> => {
	try {
		const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
		if (stored) {
			const storedCategories = JSON.parse(stored);
			// Merge with defaults to ensure all default categories exist
			return { ...DEFAULT_EXPENSE_TYPES, ...storedCategories };
		}
		return DEFAULT_EXPENSE_TYPES;
	} catch (error) {
		console.error("Error loading categories from localStorage:", error);
		return DEFAULT_EXPENSE_TYPES;
	}
};

// Get all expense types
export const getExpenseTypeList = (): ExpenseType[] => {
	const categories = initializeCategories();
	return Object.values(categories);
};

// Get expense type by ID
export const getExpenseType = (id: string): ExpenseType | undefined => {
	const categories = initializeCategories();
	return categories[id];
};

// Add new expense type
export const addExpenseType = (expenseType: ExpenseType): void => {
	const categories = initializeCategories();
	categories[expenseType.id] = expenseType;

	try {
		localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
	} catch (error) {
		console.error("Error saving categories to localStorage:", error);
	}
};



