import { UserTodos } from '@/components'
import { getTodos } from './actions';

export default async function TasksPage() {
    const todos = await getTodos();

    return (
       <UserTodos todos={todos} />
    );
}