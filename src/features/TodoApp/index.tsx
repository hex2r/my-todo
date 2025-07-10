import TodoList from "./TodoList"
import TodoActionBar from "./TodoActionBar"

export default function TodoApp() {
  return (
    <div className="flex flex-col max-w-[40rem] mx-auto gap-8 py-8 px-4">
      <h1 className="text-3xl">To Do List</h1>
      <TodoList />
      <TodoActionBar />
    </div>
  )
}
