import { useState, useRef, useEffect } from "react";
import DashboardHeaderDetails from "./DashboardHeaderDetails";

export type FilterPeriod = 'today' | 'this-week' | 'this-month' | 'this-year' | 'all';

interface DashboardHeaderProps {
  selectedFilter: FilterPeriod;
  onFilterChange: (filter: FilterPeriod) => void;
  refreshTrigger: number; // Add this prop
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ selectedFilter, onFilterChange, refreshTrigger }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'this-year', label: 'This Year' },
    { value: 'all', label: 'All Time' },
  ];

  const getFilterLabel = (filter: FilterPeriod): string => {
    const option = filterOptions.find(opt => opt.value === filter);
    console.log('getFilterLabel called with:', filter, 'Found option:', option);
    return option ? option.label : 'This Month';
  };

  return (
    <div className="dashboard-header-container relative" key={selectedFilter}>
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 min-h-[20rem] rounded-b-2xl pt-6 px-6 md:px-[10rem] lg:px-[15rem] relative shadow-lg">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">SR</span>
            </div>
            <div>
              <p className="text-white/80 text-sm">Good Morning</p>
              <p className="text-white font-semibold">Shihab Rahman</p>
            </div>
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative" ref={filterRef}>
            <button 
              className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="text-sm font-medium text-gray-700">{getFilterLabel(selectedFilter)}</span>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
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

            {/* Filter Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999]">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      console.log('Clicked option:', option.value, option.label);
                      onFilterChange(option.value as FilterPeriod);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                      selectedFilter === option.value 
                        ? 'bg-primary text-white hover:bg-primary' 
                        : 'text-gray-700'
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Total Balance Card - Second Blue Card */}
        <DashboardHeaderDetails selectedFilter={selectedFilter} refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default DashboardHeader;
