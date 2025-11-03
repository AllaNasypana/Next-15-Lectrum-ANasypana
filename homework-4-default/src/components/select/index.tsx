import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, className = '', ...props }, ref) => {
        return (
            <div className="w-full">

                <select
                    ref={ref}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50 border-gray-300 dark:border-gray-600 disabled:cursor-not-allowed  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
                    {...props}
                >
                    {label && <option value="">{label}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

            </div>
        );
    }
);

Select.displayName = 'Select';