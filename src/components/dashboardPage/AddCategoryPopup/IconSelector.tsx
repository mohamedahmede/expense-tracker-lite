import React from "react";
import { iconOptions } from "../../../constants/categoryOptions";

interface IconSelectorProps {
	selectedIcon: string;
	onIconSelect: (iconPath: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({
	selectedIcon,
	onIconSelect,
}) => {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-4">
				Select Icon
			</label>
			<div className="grid grid-cols-4 gap-3">
				{iconOptions.map((icon, index) => (
					<button
						key={index}
						type="button"
						onClick={() => onIconSelect(icon.path)}
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
	);
};

export default IconSelector; 