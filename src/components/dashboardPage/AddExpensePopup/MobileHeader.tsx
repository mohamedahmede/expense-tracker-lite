import React from "react";

interface MobileHeaderProps {
	title: string;
	onClose: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title, onClose }) => {
	return (
		<div className="flex items-center justify-between p-6 border-b border-gray-200">
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
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<h2 className="text-xl font-semibold text-gray-900">{title}</h2>
			<div className="w-10"></div> {/* Spacer for centering */}
		</div>
	);
};

export default MobileHeader; 