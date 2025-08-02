import React from "react";

const DashboardPage = () => {
	return (
		<div className="min-h-screen bg-white">
			{/* User Profile Section - First Blue Card */}
			<div className="dashboard-header-container  pb-6 relative">
				<div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-b-2xl p-6 relative overflow-hidden shadow-lg">
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
					<div className="px-4 py-6">
						<div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-b-2xl p-6 relative overflow-hidden shadow-xl">
							{/* Background Pattern */}
							<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

							<div className="relative z-10">
								<div className="flex justify-between items-start mb-4">
									<h2 className="text-white font-medium">Total Balance ^</h2>
									<button className="text-white">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
											/>
										</svg>
									</button>
								</div>

								<div className="text-white mb-6">
									<span className="text-3xl font-bold">$ 2,548.00</span>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex items-center space-x-2">
										<div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
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
													d="M19 14l-7 7m0 0l-7-7m7 7V3"
												/>
											</svg>
										</div>
										<div>
											<p className="text-white/80 text-xs">↓ Income</p>
											<p className="text-white font-semibold">$ 10,840.00</p>
										</div>
									</div>

									<div className="flex items-center space-x-2">
										<div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
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
													d="M5 10l7-7m0 0l7 7m-7-7v18"
												/>
											</svg>
										</div>
										<div>
											<p className="text-white/80 text-xs">↑ Expenses</p>
											<p className="text-white font-semibold">$ 1,884.00</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Expenses Section */}
			<div className="px-4 py-6">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-gray-900">
						Recent Expenses
					</h3>
					<button className="text-primary text-sm font-medium">see all</button>
				</div>

				<div className="space-y-4">
					{/* Groceries */}
					<div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
									/>
								</svg>
							</div>
							<div>
								<p className="font-medium text-gray-900">Groceries</p>
								<p className="text-xs text-gray-500">Manually</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-red-600 font-medium">- $100</p>
							<p className="text-xs text-gray-500">Today 12:00 PM</p>
						</div>
					</div>

					{/* Entertainment */}
					<div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</div>
							<div>
								<p className="font-medium text-gray-900">Entertainment</p>
								<p className="text-xs text-gray-500">Manually</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-red-600 font-medium">- $100</p>
							<p className="text-xs text-gray-500">Today 12:00 PM</p>
						</div>
					</div>

					{/* Transportation */}
					<div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div>
								<p className="font-medium text-gray-900">Transportation</p>
								<p className="text-xs text-gray-500">Manually</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-red-600 font-medium">- $100</p>
							<p className="text-xs text-gray-500">Today 12:00 PM</p>
						</div>
					</div>

					{/* Rent */}
					<div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
							</div>
							<div>
								<p className="font-medium text-gray-900">Rent</p>
								<p className="text-xs text-gray-500">Manually</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-red-600 font-medium">- $100</p>
							<p className="text-xs text-gray-500">Today 12:00 PM</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Navigation */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
				<div className="flex justify-around items-center">
					<button className="flex flex-col items-center space-y-1 text-primary">
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
						</svg>
						<span className="text-xs">Home</span>
					</button>

					<button className="flex flex-col items-center space-y-1 text-gray-400">
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
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
						<span className="text-xs">Stats</span>
					</button>

					<button className="flex flex-col items-center space-y-1">
						<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center -mt-4">
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4v16m8-8H4"
								/>
							</svg>
						</div>
						<span className="text-xs text-primary">Add</span>
					</button>

					<button className="flex flex-col items-center space-y-1 text-gray-400">
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
								d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
							/>
						</svg>
						<span className="text-xs">Wallet</span>
					</button>

					<button className="flex flex-col items-center space-y-1 text-gray-400">
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
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<span className="text-xs">Profile</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
