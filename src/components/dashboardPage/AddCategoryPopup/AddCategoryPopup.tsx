import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextInput } from "../../../types/inputTypes";
import { CTAButton } from "../../../types/buttonTypes";
import type { AddCategoryPopupProps } from "../../../types/addCategoryPopupTypes";
import { AddCategorySchema, initialValues } from "../../../schemas/addCategoryPopupSchema";
import PopupHeader from "./PopupHeader";
import IconSelector from "./IconSelector";
import ColorSelector from "./ColorSelector";

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
				<PopupHeader title="Add New Category" onClose={onClose} />

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
								<TextInput
									name="name"
									label="Category Name"
									placeholder="Enter category name"
									required
								/>

								<IconSelector
									selectedIcon={selectedIcon}
									onIconSelect={(iconPath) => {
										setSelectedIcon(iconPath);
										setFieldValue("iconPath", iconPath);
									}}
								/>

								<ColorSelector
									selectedColor={selectedColor}
									onColorSelect={(color) => {
										setSelectedColor(color);
										setFieldValue("bgColor", color.bg);
										setFieldValue("textColor", color.text);
									}}
								/>

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
										Add
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