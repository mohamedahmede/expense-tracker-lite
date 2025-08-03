export interface AddExpensePopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: AddExpenseFormValues) => void;
}

export interface AddExpenseFormValues {
	category: string;
	amount: string;
	date: string;
	currency: string;
	receipt?: File;
} 