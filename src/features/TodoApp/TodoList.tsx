import { useTodoStore } from "./context/TodoStore"
import TodoItem from "./TodoItem"
import AddTodoItem from "./AddTodoItem"

export default TodoList

function TodoList() {
  const todo = useTodoStore()

  return (
    <div>
      {todo.length > 0 ? (
        <ol>
          {todo.map((props) => (
            <li className="list-none" key={props.id}>
              <TodoItem {...props} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="py-4" role="status">
          You have nothing to do. Enjoy your time ;)
        </div>
      )}
      <AddTodoItem />
    </div>
  )
}
