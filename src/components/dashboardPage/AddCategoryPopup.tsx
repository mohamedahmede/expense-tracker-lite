import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../types/inputTypes";
import { CTAButton } from "../../types/buttonTypes";

interface AddCategoryPopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: AddCategoryFormValues) => void;
}

export interface AddCategoryFormValues {
	name: string;
	iconPath: string;
	bgColor: string;
	textColor: string;
}

const AddCategorySchema = Yup.object().shape({
	name: Yup.string().required("Category name is required"),
	iconPath: Yup.string().required("Icon is required"),
	bgColor: Yup.string().required("Background color is required"),
	textColor: Yup.string().required("Text color is required"),
});

const initialValues: AddCategoryFormValues = {
	name: "",
	iconPath: "",
	bgColor: "bg-gray-100",
	textColor: "text-gray-600",
};

const iconOptions = [
	{ path: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", name: "Shopping" },
	{
		path: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
		name: "Entertainment",
	},
	{ path: "M13 10V3L4 14h7v7l9-11h-7z", name: "Lightning" },
	{
		path: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
		name: "Document",
	},
	{
		path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
		name: "Home",
	},
	{
		path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
		name: "Calendar",
	},
	{
		path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
		name: "Heart",
	},
	{
		path: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z",
		name: "Food",
	},
];

const colorOptions = [
	{ bg: "bg-red-100", text: "text-red-600", name: "Red" },
	{ bg: "bg-blue-100", text: "text-blue-600", name: "Blue" },
	{ bg: "bg-green-100", text: "text-green-600", name: "Green" },
	{ bg: "bg-yellow-100", text: "text-yellow-600", name: "Yellow" },
	{ bg: "bg-purple-100", text: "text-purple-600", name: "Purple" },
	{ bg: "bg-pink-100", text: "text-pink-600", name: "Pink" },
	{ bg: "bg-indigo-100", text: "text-indigo-600", name: "Indigo" },
	{ bg: "bg-orange-100", text: "text-orange-600", name: "Orange" },
];

const AddCategoryPopup: React.FC<AddCategoryPopupProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [selectedIcon, setSelectedIcon] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<{
		bg: string;
		text: string;
	}>({ bg: "bg-gray-100", text: "text-gray-600" });

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900">
						Add New Category
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Form */}
				<div className="p-6">
					<Formik
						initialValues={initialValues}
						validationSchema={AddCategorySchema}
						onSubmit={(values) => {
							const formData = {
								...values,
								iconPath: selectedIcon,
								bgColor: selectedColor.bg,
								textColor: selectedColor.text,
							};
							onSubmit(formData);
							onClose();
						}}
					>
						{({ isSubmitting, isValid, values, setFieldValue }) => (
							<Form className="space-y-6">
								{/* Category Name */}
								<TextInput
									name="name"
									label="Category Name"
									placeholder="Enter category name"
									required
								/>

								{/* Icon Selection */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-4">
										Select Icon
									</label>
									<div className="grid grid-cols-4 gap-3">
										{iconOptions.map((icon, index) => (
											<button
												key={index}
												type="button"
												onClick={() => {
													setSelectedIcon(icon.path);
													setFieldValue('iconPath', icon.path);
												}}
												className={`aspect-square p-3 rounded-lg border-2 transition-all ${
													selectedIcon === icon.path
														? "border-primary bg-primary/10"
														: "border-gray-200 hover:border-primary/50"
												}`}
											>
												<svg
													className="w-6 h-6 mx-auto text-gray-600"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d={icon.path}
													/>
												</svg>
											</button>
										))}
									</div>
								</div>

								{/* Color Selection */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-4">
										Select Color
									</label>
									<div className="grid grid-cols-4 gap-3">
										{colorOptions.map((color, index) => (
											<button
												key={index}
												type="button"
												onClick={() => {
													setSelectedColor(color);
													setFieldValue('bgColor', color.bg);
													setFieldValue('textColor', color.text);
												}}
												className={`aspect-square p-3 rounded-lg border-2 transition-all ${
													selectedColor.bg === color.bg
														? "border-primary bg-primary/10"
														: "border-gray-200 hover:border-primary/50"
												}`}
											>
												<div
													className={`w-6 h-6 mx-auto rounded-full ${color.bg} ${color.text} flex items-center justify-center`}
												>
													<div className="w-3 h-3 rounded-full bg-current"></div>
												</div>
											</button>
										))}
									</div>
								</div>

								{/* Preview */}
								{selectedIcon && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Preview
										</label>
										<div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
											<div className={`w-10 h-10 ${selectedColor.bg} rounded-full flex items-center justify-center`}>
												<svg className={`w-5 h-5 ${selectedColor.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedIcon} />
												</svg>
											</div>
											<span className="text-gray-700">New Category</span>
										</div>
									</div>
								)}

								{/* Buttons */}
								<div className="flex space-x-3 pt-4">
									<button
										type="button"
										onClick={onClose}
										className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
									>
										Cancel
									</button>
									<CTAButton
										type="submit"
										disabled={!isValid || !selectedIcon || !values.name.trim()}
										loading={isSubmitting}
										loadingText="Adding..."
										className="flex-1"
									>
										Add Category
									</CTAButton>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default AddCategoryPopup;
