export interface AddCategoryPopupProps {
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