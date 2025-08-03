import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { CTAButton } from "../../../types/buttonTypes";
import { getExpenseTypeList, addExpenseType } from "../../../data/expenseTypes";
import { addExpense } from "../../../data/expenses";
import { generateCategoryId } from "../../../utils/categoryUtils";
import AddCategoryPopup from "../AddCategoryPopup/AddCategoryPopup";
import type { AddCategoryFormValues } from "../../../types/addCategoryPopupTypes";
import type { AddExpensePopupProps, AddExpenseFormValues } from "../../../types/addExpensePopupTypes";
import { AddExpenseSchema, initialValues } from "../../../schemas/addExpensePopupSchema";
import { fileToBase64 } from "../../../utils/fileUtils";
import MobileHeader from "./MobileHeader";
import ExpenseForm from "./ExpenseForm";
import CategoryGrid from "./CategoryGrid";

const AddExpensePopup: React.FC<AddExpensePopupProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
	const [expenseTypes, setExpenseTypes] = useState(getExpenseTypeList());
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const setFieldValueRef = useRef<((field: string, value: string) => void) | null>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			// Load fresh categories when popup opens
			setExpenseTypes(getExpenseTypeList());
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// Update form field when selectedCategory changes
	useEffect(() => {
		if (selectedCategory && isOpen && setFieldValueRef.current) {
			setFieldValueRef.current("category", selectedCategory);
		}
	}, [selectedCategory, isOpen]);

	const handleSubmit = async (values: AddExpenseFormValues) => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			// Convert receipt file to base64 if present
			let receiptBase64: string | undefined;
			if (values.receipt) {
				receiptBase64 = await fileToBase64(values.receipt);
			}

			// Create expense object
			const expenseData = {
				category: selectedCategory,
				amount: parseFloat(values.amount),
				date: values.date,
				currency: selectedCurrency,
				receipt: receiptBase64,
			};

			// Add to localStorage with currency conversion
			const newExpense = await addExpense(expenseData);

			// Call parent onSubmit
			onSubmit(values);

			// Reset form state
			setSelectedCategory("");
			setSelectedCurrency("USD");

			// Close popup
			onClose();

			console.log("Expense added successfully:", newExpense);
		} catch (error) {
			console.error("Error adding expense:", error);
			// You could show an error message to the user here
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCategorySelect = (categoryId: string) => {
		setSelectedCategory(categoryId);
	};

	const handleAddCategory = (values: AddCategoryFormValues) => {
		const newCategory = {
			id: generateCategoryId(values.name),
			name: values.name,
			iconPath: values.iconPath,
			bgColor: values.bgColor,
			textColor: values.textColor,
		};

		addExpenseType(newCategory);
		// Refresh the categories list after adding new category
		setExpenseTypes(getExpenseTypeList());
		setSelectedCategory(newCategory.id);

		// We need to update the Formik form field as well
		// This will be handled by the Formik render prop
	};

	const handleCurrencyChange = (currencyCode: string) => {
		setSelectedCurrency(currencyCode);
	};

	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 bg-white z-50">
				<div ref={modalRef} className="h-full w-full flex flex-col">
					<MobileHeader title="Add Expense" onClose={onClose} />

					<div className="flex-1 p-6 overflow-y-auto">
						<Formik
							key={expenseTypes.length} // Reset form when categories change
							initialValues={initialValues}
							validationSchema={AddExpenseSchema}
							onSubmit={handleSubmit}
						>
							{(formikProps) => {
								// Store setFieldValue in ref for use in handleAddCategory
								setFieldValueRef.current = formikProps.setFieldValue;

								return (
									<Form className="space-y-2">
										<ExpenseForm
											formikProps={formikProps}
											selectedCategory={selectedCategory}
											selectedCurrency={selectedCurrency}
											expenseTypes={expenseTypes}
											onCategorySelect={handleCategorySelect}
											onCurrencyChange={handleCurrencyChange}
										/>

										<CategoryGrid
											formikProps={formikProps}
											selectedCategory={selectedCategory}
											expenseTypes={expenseTypes}
											onCategorySelect={handleCategorySelect}
											onAddCategory={() => setIsAddCategoryOpen(true)}
										/>

										<CTAButton
											type="submit"
											disabled={!formikProps.isValid || !selectedCategory}
											loading={isSubmitting}
											loadingText="Saving..."
											className="w-full"
										>
											Save
										</CTAButton>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>

			{/* Add Category Popup */}
			<AddCategoryPopup
				isOpen={isAddCategoryOpen}
				onClose={() => setIsAddCategoryOpen(false)}
				onSubmit={handleAddCategory}
			/>
		</>
	);
};

export default AddExpensePopup; 