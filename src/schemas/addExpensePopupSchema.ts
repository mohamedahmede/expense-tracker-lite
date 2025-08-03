import * as Yup from "yup";
import type { AddExpenseFormValues } from "../types/addExpensePopupTypes";

export const AddExpenseSchema = Yup.object().shape({
	category: Yup.string().required("Category is required"),
	amount: Yup.string()
		.required("Amount is required")
		.test("is-positive", "Amount must be positive", (value) => {
			if (!value) return false;
			const num = parseFloat(value);
			return !isNaN(num) && num > 0;
		})
		.test("is-valid-number", "Please enter a valid number", (value) => {
			if (!value) return false;
			return !isNaN(parseFloat(value));
		}),
	date: Yup.string().required("Date is required"),
	currency: Yup.string().required("Currency is required"),
});

export const initialValues: AddExpenseFormValues = {
	category: "",
	amount: "",
	date: "",
	currency: "USD",
	receipt: undefined,
}; 