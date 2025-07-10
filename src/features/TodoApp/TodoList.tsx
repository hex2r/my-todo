import { useTodoStore } from "./context/TodoStore"
import TodoItem from "./TodoItem"
import AddTodo from "./AddTodo"

export default TodoList

function TodoList() {
  const todo = useTodoStore()

  return (
    <div>
      {todo.length > 0 ? (
        <ol>
          {todo.map(({ id, title, completed }) => (
            <li className="list-none" key={id}>
              <TodoItem id={id} title={title} completed={completed} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="py-4" role="status">
          You have nothing to do. Enjoy your time ;)
        </div>
      )}
      <AddTodo />
    </div>
  )
}
