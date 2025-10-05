import { InputHTMLAttributes, FC} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const CustomInput: FC<IProps> = ({label, error, className, ...rest}) => {
    const baseInputStyle = 'w-full p-2 border border-gray-300 rounded-md bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6';
    const inputStyle = !!error ? baseInputStyle : baseInputStyle + 'border-red-600'

    return (
        <div className={`${className ? className + ' flex-col w-full' : 'flex-col w-full'}`}>
            <p className={'mb-2 text-lg text-gray-700 font-bold'}>{label}</p>
            <input className={inputStyle} {...rest}/>
            {error && <p className={'mt-1 text-sm italic text-red-600'}>{error}</p>}

        </div>
    )
}