import React from "react";
import type { FormikProps } from "formik";
import type { AddExpenseFormValues } from "../../../types/addExpensePopupTypes";

interface CategoryGridProps {
	formikProps: FormikProps<AddExpenseFormValues>;
	selectedCategory: string;
	expenseTypes: Array<{
		id: string;
		name: string;
		iconPath: string;
		bgColor: string;
		textColor: string;
	}>;
	onCategorySelect: (categoryId: string) => void;
	onAddCategory: () => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
	formikProps,
	selectedCategory,
	expenseTypes,
	onCategorySelect,
	onAddCategory,
}) => {
	const { setFieldValue } = formikProps;

	return (
		<div className="pb-12">
			<label className="block text-sm font-medium text-gray-700 mb-4">
				Categories
			</label>
			<div className="grid grid-cols-4 gap-4 justify-items-center">
				{expenseTypes.map((type) => (
					<div key={type.id} className="flex flex-col items-center space-y-2">
						<button
							type="button"
							onClick={() => {
								onCategorySelect(type.id);
								setFieldValue("category", type.id);
							}}
							className={`flex items-center justify-center p-3 rounded-full transition-all w-16 h-16 ${
								selectedCategory === type.id
									? "bg-primary text-white"
									: `${type.bgColor} hover:scale-105`
							}`}
						>
							<svg
								className={`w-6 h-6 ${
									selectedCategory === type.id ? "text-white" : type.textColor
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d={type.iconPath}
								/>
							</svg>
						</button>
						<span
							className={`text-xs font-medium text-center ${
								selectedCategory === type.id
									? "text-primary font-semibold"
									: "text-gray-700"
							}`}
							title={type.name}
						>
							{type.name}
						</span>
					</div>
				))}

				{/* Add Category Button */}
				<div className="flex flex-col items-center space-y-2">
					<button
						type="button"
						onClick={onAddCategory}
						className="flex items-center justify-center p-3 rounded-full border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all w-16 h-16"
					>
						<svg
							className="w-6 h-6 text-primary"
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
					</button>
					<span
						className="text-xs font-medium text-gray-600 text-center"
						title="Add Category"
					>
						Add Category
					</span>
				</div>
			</div>
		</div>
	);
};

export default CategoryGrid; 