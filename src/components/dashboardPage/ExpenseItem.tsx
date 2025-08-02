import React from 'react';
import { getExpenseType } from '../../data/expenseTypes';

interface ExpenseItemProps {
  typeId: string;
  amount: number;
  date: string;
  entryType?: string;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ 
  typeId, 
  amount, 
  date, 
  entryType = "Manually" 
}) => {
  const expenseType = getExpenseType(typeId);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${expenseType.bgColor} rounded-full flex items-center justify-center`}>
          <svg className={`w-5 h-5 ${expenseType.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expenseType.iconPath} />
          </svg>
        </div>
        <div>
          <p className="font-medium text-gray-900">{expenseType.name}</p>
          <p className="text-xs text-gray-600">{entryType}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-red-400 font-medium">- ${amount}</p>
        <p className="text-xs text-gray-600">{date}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
