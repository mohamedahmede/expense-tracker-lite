import * as Yup from "yup";
import type { AddCategoryFormValues } from "../types/addCategoryPopupTypes";

export const AddCategorySchema = Yup.object().shape({
	name: Yup.string().required("Category name is required"),
	iconPath: Yup.string().required("Icon is required"),
	bgColor: Yup.string().required("Background color is required"),
	textColor: Yup.string().required("Text color is required"),
});

export const initialValues: AddCategoryFormValues = {
	name: "",
	iconPath: "",
	bgColor: "bg-gray-100",
	textColor: "text-gray-600",
}; 