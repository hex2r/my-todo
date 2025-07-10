import TodoList from "./TodoList"
import TodoActionBar from "./TodoActionBar"
import { TodoStoreProvider } from "./context/TodoStore"
import { generateRandomInitialTodos } from "./helpers/generateRandomInitialTodo"

export default function TodoAppWithStoreProvider() {
  return (
    <TodoStoreProvider initialStore={generateRandomInitialTodos(6, 6)}>
      <TodoApp />
    </TodoStoreProvider>
  )
}

function TodoApp() {
  return (
    <div className="flex flex-col max-w-[40rem] mx-auto gap-8 py-8 px-4">
      <h1 className="text-3xl">To Do List</h1>
      <TodoList />
      <TodoActionBar />
    </div>
  )
}
