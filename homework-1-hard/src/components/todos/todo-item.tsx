import Link from 'next/link';
import { ITodo } from '@/types';

interface IProps {
    todo: ITodo
}

export const TodoItem = ({todo}: IProps) => {
    return (
        <Link href={`/todos/${todo.id}`} prefetch={true} className={'flex w-full mb-6'}>
            <div className={'rounded-md p-3 shadow-lg flex w-full justify-between items-center text-typography-black gap-2'}>
                <div className={'font-bold text-base mb-2 text-center'}>{todo.title}</div>
                <div className={todo.completed ? 'text-lg text-gray-700 font-bold capitalize' : 'text-lg text-gray-400 font-bold capitalize'}>
                    {todo.completed ? 'Completed': 'Uncompleted'}
                </div>
            </div>
        </Link>
    )

}