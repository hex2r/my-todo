import { useMemo } from "react"
import { useStoreAPI, useTodoStore } from "./context/TodoStore"

export default TodoActionBar

function TodoActionBar() {
  const { deleteCompletedTodo } = useStoreAPI()
  const todo = useTodoStore()

  const totalCompleted = useMemo(
    () => todo.reduce((acc, curr) => (curr.completed ? (acc += 1) : acc), 0),
    [todo],
  )

  return (
    totalCompleted > 0 && (
      <div className="flex gap-4">
        <span className="text-sm">Total completed: {totalCompleted}</span>
        {totalCompleted > 0 && (
          <button
            tabIndex={0}
            className="text-sm cursor-pointer bg-[#ddd] hover:bg-[#f2f2f2] text-[#333] px-2 rounded-sm"
            type="button"
            onClick={deleteCompletedTodo}
          >
            Clean
          </button>
        )}
      </div>
    )
  )
}
