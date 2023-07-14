import { useAppSelector } from "../hooks/hooks";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.list);
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
