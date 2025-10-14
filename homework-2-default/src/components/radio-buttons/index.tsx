import { FC, ChangeEvent} from 'react';


interface IProps {
    options: {value: string, label: string}[];
    label?: string;
    error?: string;
    value?: string;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}


export const RadioButtons: FC<IProps> = ({options, label, onChange, name, value, error}) => {
    return (
        <div className="p-2">
            {label && <div className={'mb-2 text-lg text-gray-700 font-bold mb-2'}>{label}</div>}
            {
                options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer transition-all hover:bg-gray-50 mb-4"
                        >
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={onChange}
                                className="w-5 h-5 text-blue-700 focus:ring-blue-700"
                                aria-label={option.label}
                            />
                            <span className="ml-3 font-medium text-gray-900">
                  {option.label}
                </span>
                        </label>
                    ))}
            {error && <p className={'mt-1 text-sm italic text-red-600'}>{error}</p>}
        </div>
    )
}