import React from "react";
import type { FormikProps } from "formik";
import {
	CustomDropdownSelect,
	CustomCurrencyInput,
	CustomDateInput,
	FileUploadInput,
} from "../../../types/inputTypes";
import { currencies } from "../../../constants/currencyOptions";
import type { AddExpenseFormValues } from "../../../types/addExpensePopupTypes";

interface ExpenseFormProps {
	formikProps: FormikProps<AddExpenseFormValues>;
	selectedCategory: string;
	selectedCurrency: string;
	expenseTypes: Array<{ id: string; name: string }>;
	onCategorySelect: (categoryId: string) => void;
	onCurrencyChange: (currencyCode: string) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
	formikProps,
	selectedCategory,
	selectedCurrency,
	expenseTypes,
	onCategorySelect,
	onCurrencyChange,
}) => {
	const { setFieldValue } = formikProps;

	return (
		<div className="space-y-2">
			<CustomDropdownSelect
				name="category"
				label="Categories"
				options={expenseTypes.map((type) => ({
					value: type.id,
					label: type.name,
				}))}
				placeholder="Select a category"
				required
				value={selectedCategory}
				onChange={(value: string) => {
					onCategorySelect(value);
					setFieldValue("category", value);
				}}
			/>

			<CustomCurrencyInput
				name="amount"
				label="Amount"
				placeholder="0.00"
				currencies={currencies}
				defaultCurrency="USD"
				required
				value={selectedCurrency}
				onChange={onCurrencyChange}
			/>

			<CustomDateInput name="date" label="Date" required />

			<FileUploadInput
				name="receipt"
				label="Attach Receipt"
				accept="image/*,.pdf"
				placeholder="Upload image"
			/>
		</div>
	);
};

export default ExpenseForm; 