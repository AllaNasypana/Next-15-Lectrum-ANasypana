'use client';
import { useState, useEffect} from 'react';
import { TodoItem} from './todo-item';
import { CustomInput } from '../custom-input';
import { CheckBox } from '../check-box';
import { ITodo } from '@/types'

interface IProps {
    todos: ITodo[]
}

export const UserTodos = ({todos}: IProps) => {
    const [todosData, setTodosData] = useState<ITodo[]>(todos);
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState<boolean | null>(null);


    useEffect(()=> {
        let newTodos = [...todos];
        if(!!title.trim()) {
            newTodos = [...newTodos].filter(item => item.title.toLowerCase().includes(title.trim().toLowerCase()));
        }
        if(completed !== null) {
            newTodos = [...newTodos].filter(item => item.completed === completed);
        }
        setTodosData(newTodos)

    }, [title, completed]);



    return (
        <div>
            <div className="mt-7 p-6 rounded-md shadow-lg flex gap-4 justify-between items-center">
                <div className={'flex-col w-3/4'}>
                    <CustomInput
                        placeholder={'Search...'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <div className={'py-4'}>

                        <CheckBox

                            value={completed === true ? true : false}
                            onChange={() => {

                                setCompleted(prevState => {
                                    if(prevState) return null;
                                    return true;
                                })
                            }}
                            label={'Only Completed'} />
                        <CheckBox

                            value={completed === false ? true : false}
                            onChange={() => {

                                setCompleted(prevState => {
                                    if(prevState === null || prevState) return false;
                                    return null;
                                })
                            }}
                            label={'Only Uncompleted'} />


                    </div>
                </div>
                <button
                    disabled={!title && completed === null}
                    type="button"
                    onClick={() => {
                        setTitle('');
                        setCompleted(null);

                    }}
                    className={ !title && completed === null ? 'bg-gray-400  text-white font-bold py-1 px-2 rounded mt-4 h-full' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 h-full cursor-pointer'}>
                    {'Reset Filters' }
                </button>


            </div>
            <div className="mt-8 gap-5">
                {!todosData.length && <h3 className={'text-3xl text-gray-700'}>{!!todos.length ? 'No tasks by this conditions' : 'There are no tasks yet'}</h3>}
                {!!todosData.length && todosData.map(t => <TodoItem key={t.id} todo={t} />)}
            </div>

        </div>
    )

}