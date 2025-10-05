import { getTodo} from '../actions'

type Props = {
    params: Promise<{ id: string }>
}



export default async function TaskPage({ params }: Props) {
    const { id } = await params;
    const todo = await getTodo(id);


    return (
        <div className="w-full flex-col justify-center items-center pt-6">
            <div className={todo.completed ? 'text-lg text-gray-700 font-bold capitalize' : 'text-lg text-gray-400 font-bold capitalize'}>
                {todo.completed ? 'Completed': 'Uncompleted'}
            </div>
            <h2 className={'text-2xl text-typography-black my-3'}>{todo.title}</h2>

        </div>
    );
}