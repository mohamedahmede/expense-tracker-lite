import React from "react";
import { colorOptions } from "../../../constants/categoryOptions";

interface ColorSelectorProps {
	selectedColor: {
		bg: string;
		text: string;
	};
	onColorSelect: (color: { bg: string; text: string }) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
	selectedColor,
	onColorSelect,
}) => {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-4">
				Select Color
			</label>
			<div className="grid grid-cols-4 gap-3">
				{colorOptions.map((color, index) => (
					<button
						key={index}
						type="button"
						onClick={() => onColorSelect(color)}
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
	);
};

export default ColorSelector; 