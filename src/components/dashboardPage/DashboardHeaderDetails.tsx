import { useMemo } from "react";
import { getTotalExpensesByPeriodUSD } from "../../data/expenses";
import type { FilterPeriod } from "./DashboardHeader";

interface DashboardHeaderDetailsProps {
  selectedFilter: FilterPeriod;
  refreshTrigger: number;
}

const DashboardHeaderDetails: React.FC<DashboardHeaderDetailsProps> = ({ selectedFilter, refreshTrigger }) => {
  // Get filtered expenses for display
  const filteredExpensesUSD = useMemo(() => {
    return getTotalExpensesByPeriodUSD(selectedFilter) || 0;
  }, [selectedFilter, refreshTrigger]);

  // Get ALL expenses for total balance calculation
  const allExpensesUSD = useMemo(() => {
    return getTotalExpensesByPeriodUSD('all') || 0;
  }, [refreshTrigger]);
  
  // Set income to $10,000 by default
  const totalIncomeUSD = 10000;
  const totalBalanceUSD = totalIncomeUSD - allExpensesUSD;

	return (
		<div className="py-6">
			<div className="bg-[#496ef3] absolute bottom-[-5rem] left-0 w-full h-full rounded-2xl p-6 relative overflow-hidden shadow-xl">
				{/* Background Pattern */}
				<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
				<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

				<div className="relative z-10">
					<div className="flex justify-between items-start mb-4">
						<h2 className="text-white font-medium">Total Balance</h2>
					</div>

					<div className="text-white mb-6">
						<span className="text-3xl font-bold">$ {totalBalanceUSD.toFixed(2)}</span>
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
								<p className="text-white/80 text-xs">Income</p>
								<p className="text-white font-semibold">$ {totalIncomeUSD.toFixed(2)}</p>
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
								<p className="text-white/80 text-xs">Expenses</p>
								<p className="text-white font-semibold">$ {filteredExpensesUSD.toFixed(2)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeaderDetails;
