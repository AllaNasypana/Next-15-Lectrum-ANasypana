'use server';
import { IUser, ITodo } from '@/types';
import { URL_BASE} from '@/config'
;
import { getUser } from '@/app/(shell)/actions'



export const getTodos = async ():Promise<ITodo[]> => {
    const user = await getUser();

    const res = await fetch(`${URL_BASE}todos?userId=${user.id}`, {
        next: {
            revalidate: 60,
        },
    });


    if (!res.ok) throw new Error('Could not find your todos');
    const todos = await res.json() as unknown as ITodo[];
    return todos;
}

export const getTodo = async (id: string):Promise<ITodo> => {
    const user = await getUser();

    const res = await fetch(`${URL_BASE}todos?userId=${user.id}&id=${id}`, {
        next: {
            revalidate: 60,
        },
    });
    if (!res.ok) throw new Error('Could not find this todo');
    const todos = await res.json() as unknown as ITodo[];

    if (!todos.length) throw new Error('Could not find this todo');
    return todos[0];
}