import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { gsap } from "gsap";
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
	const [isClosing, setIsClosing] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const desktopModalRef = useRef<HTMLDivElement>(null);
	const setFieldValueRef = useRef<((field: string, value: string) => void) | null>(null);

	useEffect(() => {
		if (isOpen) {
			setIsClosing(false);
			document.body.style.overflow = "hidden";
			setExpenseTypes(getExpenseTypeList());
			
			if (modalRef.current) {
				gsap.fromTo(modalRef.current, 
					{ opacity: 0, x: -100 },
					{ opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
				);
			}
			
			if (desktopModalRef.current) {
				gsap.fromTo(desktopModalRef.current, 
					{ opacity: 0 },
					{ opacity: 1, duration: 0.4, ease: "power2.out" }
				);
			}
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	useEffect(() => {
		if (selectedCategory && isOpen && setFieldValueRef.current) {
			setFieldValueRef.current("category", selectedCategory);
		}
	}, [selectedCategory, isOpen]);

	const handleSubmit = async (values: AddExpenseFormValues) => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			let receiptBase64: string | undefined;
			if (values.receipt) {
				receiptBase64 = await fileToBase64(values.receipt);
			}

			const expenseData = {
				category: selectedCategory,
				amount: parseFloat(values.amount),
				date: values.date,
				currency: selectedCurrency,
				receipt: receiptBase64,
			};

			const newExpense = await addExpense(expenseData);
			onSubmit(values);

			setSelectedCategory("");
			setSelectedCurrency("USD");
			handleClose();

			console.log("Expense added successfully:", newExpense);
		} catch (error) {
			console.error("Error adding expense:", error);
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
		setExpenseTypes(getExpenseTypeList());
		setSelectedCategory(newCategory.id);
	};

	const handleCurrencyChange = (currencyCode: string) => {
		setSelectedCurrency(currencyCode);
	};

	const handleClose = () => {
		if (!isClosing) {
			setIsClosing(true);
			
			if (modalRef.current) {
				gsap.to(modalRef.current, {
					x: "-100%",
					duration: 0.4,
					ease: "power3.in",
					onComplete: () => {
						gsap.to(modalRef.current, {
							opacity: 0,
							duration: 0.2,
							ease: "power2.in",
							onComplete: () => {
								document.body.style.overflow = "unset";
								setIsClosing(false);
								onClose();
							}
						});
					}
				});
			} else {
				if (desktopModalRef.current) {
					gsap.to(desktopModalRef.current, {
						opacity: 0,
						duration: 0.3,
						ease: "power2.in",
						onComplete: () => {
							document.body.style.overflow = "unset";
							setIsClosing(false);
							onClose();
						}
					});
				} else {
					document.body.style.overflow = "unset";
					setIsClosing(false);
					onClose();
				}
			}
		}
	};

	if (!isOpen && !isClosing) return null;

	return (
		<>
			{/* Mobile Layout - Full Screen */}
			<div className="fixed inset-0 z-50 md:hidden">
				<div ref={modalRef} className="h-full w-full flex flex-col bg-white">
					<MobileHeader title="Add Expense" onClose={handleClose} />

					<div className="flex-1 p-6 overflow-y-auto">
						<Formik
							key={expenseTypes.length}
							initialValues={initialValues}
							validationSchema={AddExpenseSchema}
							onSubmit={handleSubmit}
						>
							{(formikProps) => {
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

			{/* Desktop Layout - Centered Modal */}
			<div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden md:flex items-center justify-center">
				<div ref={desktopModalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">Add Expense</h2>
						<button
							onClick={handleClose}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
						<Formik
							key={expenseTypes.length}
							initialValues={initialValues}
							validationSchema={AddExpenseSchema}
							onSubmit={handleSubmit}
						>
							{(formikProps) => {
								setFieldValueRef.current = formikProps.setFieldValue;

								return (
									<Form className="space-y-4">
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