import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import ExpenseItem from "../components/dashboardPage/ExpenseItem";
import DashboardHeader from "../components/dashboardPage/DashboardHeader";
import AddExpensePopup from "../components/dashboardPage/AddExpensePopup/AddExpensePopup";
import { getExpensesByPeriod } from "../data/expenses";
import { formatExpenseDate } from "../utils/expenseUtils";
import type { AddExpenseFormValues } from "../types/addExpensePopupTypes";
import type { FilterPeriod } from "../components/dashboardPage/DashboardHeader";

const ITEMS_PER_PAGE = 10;

const DashboardPage = () => {
	const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
	const [selectedFilter, setSelectedFilter] =
		useState<FilterPeriod>("this-month");
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	// Use useMemo to optimize filtering performance
	const allExpenses = useMemo(() => {
		return getExpensesByPeriod(selectedFilter);
	}, [selectedFilter, refreshTrigger]);

	// Get paginated expenses
	const expenses = useMemo(() => {
		return allExpenses.slice(0, currentPage * ITEMS_PER_PAGE);
	}, [allExpenses, currentPage]);

	// Check if there are more items to load
	useEffect(() => {
		setHasMore(expenses.length < allExpenses.length);
	}, [expenses.length, allExpenses.length]);

	// Reset pagination when filter changes
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedFilter]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					loadMore();
				}
			},
			{ threshold: 0.1 }
		);

		observerRef.current = observer;

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [hasMore, isLoading]);

	const loadMore = useCallback(() => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		// Simulate loading delay for better UX
		setTimeout(() => {
			setCurrentPage((prev) => prev + 1);
			setIsLoading(false);
		}, 500);
	}, [isLoading, hasMore]);

	const handleAddExpense = (values: AddExpenseFormValues) => {
		console.log("New expense added:", values);
		// Force re-evaluation by incrementing refresh trigger
		setRefreshTrigger((prev) => prev + 1);
		// Reset to first page when new expense is added
		setCurrentPage(1);
		// Force immediate re-render of expenses list
		setTimeout(() => {
			setRefreshTrigger((prev) => prev + 1);
		}, 100);
	};

	const handleFilterChange = (filter: FilterPeriod) => {
		console.log("Filter changing from", selectedFilter, "to", filter);
		setSelectedFilter(filter);
	};

	return (
		<div className="min-h-screen bg-white overflow-x-hidden">
			<DashboardHeader
				selectedFilter={selectedFilter}
				onFilterChange={handleFilterChange}
				refreshTrigger={refreshTrigger}
			/>

			{/* Recent Expenses Section */}
			<div className="px-4 md:px-[10rem] lg:px-[15rem] pt-[6.5rem] pb-24">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-gray-900">
						Recent Expenses
					</h3>
					{/* <button className="text-primary text-sm font-medium">see all</button> */}
				</div>

				<div className="space-y-4">
					{expenses.length > 0 ? (
						<>
							{expenses.map((expense) => (
								<ExpenseItem
									key={expense.id}
									typeId={expense.category}
									amount={expense.amount}
									currency={expense.currency}
									date={formatExpenseDate(expense.date)}
									entryType="Manually"
									currencyConversion={expense.currencyConversion}
								/>
							))}

							{/* Load More Section */}
							{hasMore && (
								<div ref={loadMoreRef} className="py-4 text-center">
									{isLoading ? (
										<div className="flex items-center justify-center space-x-2">
											<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
											<span className="text-sm text-gray-600">
												Loading more expenses...
											</span>
										</div>
									) : (
										<button
											onClick={loadMore}
											className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
										>
											Load More
										</button>
									)}
								</div>
							)}

							{/* End of list indicator */}
							{!hasMore && expenses.length > 0 && (
								<div className="py-4 text-center">
									<span className="text-sm text-gray-400">
										You've reached the end
									</span>
								</div>
							)}
						</>
					) : (
						<div className="text-center py-8 text-gray-500">
							<svg
								className="w-12 h-12 mx-auto mb-4 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
							<p className="text-sm">No expenses yet</p>
							<p className="text-xs text-gray-400 mt-1">
								Add your first expense to get started
							</p>
						</div>
					)}
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

					<button
						className="flex flex-col items-center space-y-1"
						onClick={() => setIsAddExpenseOpen(true)}
					>
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

			{/* Add Expense Popup */}
			<AddExpensePopup
				isOpen={isAddExpenseOpen}
				onClose={() => setIsAddExpenseOpen(false)}
				onSubmit={handleAddExpense}
			/>
		</div>
	);
};

export default DashboardPage;
