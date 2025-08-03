import React from 'react';
import { getExpenseType } from '../../data/expenseTypes';
import { formatCurrency } from '../../api/currency';
import type { CurrencyConversion } from '../../api/currency';

interface ExpenseItemProps {
  typeId: string;
  amount: number;
  currency: string;
  date: string;
  entryType?: string;
  currencyConversion?: CurrencyConversion;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ 
  typeId, 
  amount, 
  currency,
  date, 
  entryType = "Manually",
  currencyConversion
}) => {
  const expenseType = getExpenseType(typeId) || {
    name: 'Unknown',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    iconPath: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  };
  const originalAmountFormatted = formatCurrency(amount, currency);
  const usdAmountFormatted = currencyConversion ? formatCurrency(currencyConversion.usdAmount, 'USD') : null;

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
        <p className="text-red-400 font-medium">- {originalAmountFormatted}</p>
        {usdAmountFormatted && currency !== 'USD' && (
          <p className="text-xs text-gray-500">≈ {usdAmountFormatted}</p>
        )}
        <p className="text-xs text-gray-600">{date}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
