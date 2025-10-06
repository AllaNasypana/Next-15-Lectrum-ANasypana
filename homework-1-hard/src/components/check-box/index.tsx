
interface IProps {
    value: boolean | undefined;
    onChange: () => void;
    label: string;
    className?: string;
}

export const CheckBox = ({ value, onChange, label, }: IProps) => {

    return (
        <label htmlFor={label} className="flex items-center cursor-pointer mb-2">
            <input
                id={label}
                type="checkbox"
                className="sr-only peer" // Hide visually but keep accessible
                value={value ? "checked" : ""}
                checked={value}
                onChange={onChange}
            />
            <div className={
                value ? 'w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200'
                    : 'w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center transition-all duration-200'}>
                {value && (
                    <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                )}
            </div>
            <span className="ml-2 text-gray-700">{label}</span>
        </label>
    )
}