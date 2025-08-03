import React from "react";

interface PopupHeaderProps {
	title: string;
	onClose: () => void;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({ title, onClose }) => {
	return (
		<div className="flex items-center justify-between p-6 border-b border-gray-200">
			<h2 className="text-xl font-semibold text-gray-900">{title}</h2>
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
	);
};

export default PopupHeader; 