import React, { useState, useRef, useEffect } from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

interface CustomDateInputProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  name,
  label,
  required = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());

  // Get today's date for comparison
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateSelect = (day: number, form: FieldProps['form']) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    form.setFieldValue(name, formatDate(newDate));
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1);
    
    // Don't allow navigating to future months
    if (direction === 'next') {
      const nextMonth = new Date(todayYear, todayMonth + 1, 1);
      if (newDate >= nextMonth) {
        return;
      }
    }
    
    setCurrentDate(newDate);
  };

  // Check if a date is in the future
  const isFutureDate = (day: number): boolean => {
    if (currentDate.getFullYear() > todayYear) return true;
    if (currentDate.getFullYear() < todayYear) return false;
    if (currentDate.getMonth() > todayMonth) return true;
    if (currentDate.getMonth() < todayMonth) return false;
    return day > todayDay;
  };

  // Check if a date is today
  const isToday = (day: number): boolean => {
    return currentDate.getFullYear() === todayYear && 
           currentDate.getMonth() === todayMonth && 
           day === todayDay;
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => (
          <div>
            <div className="relative" ref={dropdownRef}>
              <input
                {...field}
                type="text"
                placeholder="Select date"
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input-bg cursor-pointer ${
                  meta.touched && meta.error ? 'border-red-500' : ''
                }`}
                value={field.value || ''}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {/* Custom Calendar Dropdown */}
              {isOpen && (
                <div className="absolute z-50 w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => navigateMonth('prev')}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateMonth('next')}
                      disabled={currentDate.getFullYear() >= todayYear && currentDate.getMonth() >= todayMonth}
                      className={`p-1 rounded transition-colors ${
                        currentDate.getFullYear() >= todayYear && currentDate.getMonth() >= todayMonth
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Calendar Body */}
                  <div className="p-4">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => day && handleDateSelect(day, form)}
                          disabled={!day || isFutureDate(day)}
                          className={`w-8 h-8 text-sm rounded-full transition-colors ${
                            !day 
                              ? 'invisible' 
                              : isFutureDate(day)
                                ? 'text-gray-300 cursor-not-allowed'
                                : isToday(day)
                                  ? 'bg-blue-500 text-white font-semibold'
                                  : day === selectedDate?.getDate() && 
                                    currentDate.getMonth() === selectedDate?.getMonth() &&
                                    currentDate.getFullYear() === selectedDate?.getFullYear()
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {meta.touched && meta.error && (
              <p className="text-red-500 text-xs mt-1">{meta.error}</p>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default CustomDateInput; 