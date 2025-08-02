import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { 
  CustomDropdownSelect, 
  CustomCurrencyInput, 
  CustomDateInput, 
  FileUploadInput 
} from '../../types/inputTypes';
import { CTAButton } from '../../types/buttonTypes';
import { getExpenseTypeList, addExpenseType, generateCategoryId, refreshCategories } from '../../data/expenseTypes';
import { addExpense } from '../../data/expenses';
import AddCategoryPopup from './AddCategoryPopup';
import type { AddCategoryFormValues } from './AddCategoryPopup';

interface AddExpensePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddExpenseFormValues) => void;
}

export interface AddExpenseFormValues {
  category: string;
  amount: string;
  date: string;
  currency: string;
  receipt?: File;
}

const AddExpenseSchema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  amount: Yup.string().required('Amount is required'),
  date: Yup.string().required('Date is required'),
  currency: Yup.string().required('Currency is required'),
});

const initialValues: AddExpenseFormValues = {
  category: '',
  amount: '',
  date: '',
  currency: 'USD',
  receipt: undefined,
};

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'EGP', symbol: 'EGP', name: 'Egyptian Pound' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
];

const AddExpensePopup: React.FC<AddExpensePopupProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState(getExpenseTypeList());
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Refresh categories when popup opens
      refreshCategories();
      setExpenseTypes(getExpenseTypeList());
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Update form field when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      // This will be handled by the Formik form's setFieldValue
    }
  }, [selectedCategory]);

  const handleSubmit = async (values: AddExpenseFormValues) => {
    try {
      // Convert receipt file to base64 if present
      let receiptBase64: string | undefined;
      if (values.receipt) {
        receiptBase64 = await fileToBase64(values.receipt);
      }

      // Create expense object
      const expenseData = {
        category: selectedCategory,
        amount: parseFloat(values.amount),
        date: values.date,
        currency: selectedCurrency,
        receipt: receiptBase64,
      };

      // Add to localStorage
      const newExpense = addExpense(expenseData);
      
      // Call parent onSubmit
      onSubmit(values);
      
      // Close popup
      onClose();
      
      console.log('Expense added successfully:', newExpense);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAddCategory = (values: AddCategoryFormValues) => {
    const newCategory = {
      id: generateCategoryId(values.name),
      name: values.name,
      iconPath: values.iconPath,
      bgColor: values.bgColor,
      textColor: values.textColor,
    };

    addExpenseType(newCategory);
    refreshCategories();
    setExpenseTypes(getExpenseTypeList());
    setSelectedCategory(newCategory.id);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-white z-50">
        <div 
          ref={modalRef}
          className="h-full w-full flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Add Expense</h2>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Form */}
          <div className="flex-1 p-6 overflow-y-auto">
            <Formik
              initialValues={initialValues}
              validationSchema={AddExpenseSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, setFieldValue }) => (
                <Form className="space-y-2">
                  {/* Category Dropdown */}
                  <CustomDropdownSelect
                    name="category"
                    label="Categories"
                    options={expenseTypes.map(type => ({ value: type.id, label: type.name }))}
                    placeholder="Select a category"
                    required
                    value={selectedCategory}
                    onChange={(value: string) => {
                      setSelectedCategory(value);
                      setFieldValue('category', value);
                    }}
                  />

                  {/* Amount Field */}
                  <CustomCurrencyInput
                    name="amount"
                    label="Amount"
                    placeholder="0.00"
                    currencies={currencies}
                    defaultCurrency="USD"
                    required
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                  />

                  {/* Date Field */}
                  <CustomDateInput
                    name="date"
                    label="Date"
                    required
                  />

                  {/* Receipt Upload */}
                  <FileUploadInput
                    name="receipt"
                    label="Attach Receipt"
                    accept="image/*,.pdf"
                    placeholder="Upload image"
                  />

                  {/* Category Selection UI */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Categories
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {expenseTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            handleCategorySelect(type.id);
                            setFieldValue('category', type.id);
                          }}
                          className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all ${
                            selectedCategory === type.id
                              ? 'bg-primary text-white'
                              : `${type.bgColor} hover:scale-105`
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedCategory === type.id ? 'bg-white/20' : type.bgColor
                          }`}>
                            <svg 
                              className={`w-6 h-6 ${
                                selectedCategory === type.id ? 'text-white' : type.textColor
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.iconPath} />
                            </svg>
                          </div>
                          <span className={`text-xs font-medium ${
                            selectedCategory === type.id ? 'text-white' : 'text-gray-700'
                          }`}>
                            {type.name}
                          </span>
                        </button>
                      ))}
                      
                      {/* Add Category Button */}
                      <button
                        type="button"
                        onClick={() => setIsAddCategoryOpen(true)}
                        className="flex flex-col items-center space-y-2 p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Add Category</span>
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <CTAButton
                    type="submit"
                    disabled={!isValid || !selectedCategory}
                    loading={isSubmitting}
                    loadingText="Saving..."
                    className="w-full"
                  >
                    Save (Debug: isValid={isValid.toString()}, selectedCategory={selectedCategory || 'none'})
                  </CTAButton>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Add Category Popup */}
      <AddCategoryPopup
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSubmit={handleAddCategory}
      />
    </>
  );
};

export default AddExpensePopup; 