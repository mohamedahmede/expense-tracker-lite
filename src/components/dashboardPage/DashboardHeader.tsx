import DashboardHeaderDetails from "./DashboardHeaderDetails";

const DashboardHeader = () => {
	return (
		<div className="dashboard-header-container relative">
			<div className="bg-gradient-to-br from-blue-600 to-blue-700 min-h-[20rem] rounded-b-2xl pt-6 px-6 relative  shadow-lg">
				{/* Background Pattern */}
				<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
				<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

				<div className="relative z-10 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
							<span className="text-white font-semibold">SR</span>
						</div>
						<div>
							<p className="text-white/80 text-sm">Good Morning</p>
							<p className="text-white font-semibold">Shihab Rahman</p>
						</div>
					</div>
					<button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
						<span className="text-sm font-medium text-white">This month</span>
						<svg
							className="w-4 h-4 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
				</div>
				{/* Total Balance Card - Second Blue Card */}
				<DashboardHeaderDetails />
			</div>
		</div>
	);
};

export default DashboardHeader;
