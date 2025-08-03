import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PopupHeaderProps {
	title: string;
	onClose: () => void;
	isOpen: boolean;
	isClosing?: boolean;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({ title, onClose, isOpen, isClosing }) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const hasAnimated = useRef(false);

	useEffect(() => {
		if (isOpen && titleRef.current && !hasAnimated.current) {
			hasAnimated.current = true;
			gsap.fromTo(titleRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, delay: 0.2, ease: "power2.out" }
			);
		} else if (isClosing && titleRef.current && hasAnimated.current) {
			hasAnimated.current = false;
			gsap.to(titleRef.current, {
				opacity: 0,
				duration: 0.15,
				ease: "power2.in"
			});
		}
	}, [isOpen, isClosing]);

	return (
		<div className="flex items-center justify-between p-6 border-b border-gray-200">
			<h2 ref={titleRef} className="text-xl font-semibold text-gray-900">{title}</h2>
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