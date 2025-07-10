import TodoApp from "./features/TodoApp"
import { TodoStoreProvider } from "./features/TodoApp/context/TodoStore"
import { generateRandomInitialTodos } from "./features/TodoApp/helpers/generateRandomInitialTodo"

function App() {
  return (
    <TodoStoreProvider initialStore={generateRandomInitialTodos(4, 4)}>
      <TodoApp />
    </TodoStoreProvider>
  )
}

export default App
