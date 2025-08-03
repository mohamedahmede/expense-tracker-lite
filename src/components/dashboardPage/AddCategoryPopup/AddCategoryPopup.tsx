import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { gsap } from "gsap";
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
	
	const [isClosing, setIsClosing] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			setIsClosing(false);
			if (modalRef.current) {
				gsap.fromTo(modalRef.current, 
					{ opacity: 0 },
					{ opacity: 1, duration: 0.4, ease: "power3.out" }
				);
			}
		}

		return () => {
			// Cleanup
		};
	}, [isOpen]);

	const handleClose = () => {
		if (!isClosing) {
			setIsClosing(true);
			
			// First fade out the title, then fade out the popup
			if (modalRef.current) {
				// Wait a bit for title fade out, then fade out popup
				setTimeout(() => {
					gsap.to(modalRef.current, {
						opacity: 0,
						duration: 0.3,
						ease: "power2.in",
						onComplete: () => {
							setIsClosing(false);
							onClose();
						}
					});
				}, 200); // Wait 200ms for title fade out
			} else {
				setIsClosing(false);
				onClose();
			}
		}
	};

	if (!isOpen && !isClosing) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
				<PopupHeader title="Add New Category" onClose={handleClose} isOpen={isOpen} isClosing={isClosing} />

				<div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
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
							handleClose();
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
										onClick={handleClose}
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