import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react"
import type { TodoItemType } from "../types"

export type ReturnUseTodoStoreActions = ReturnType<typeof useTodoStoreActions>

export function useTodoStoreActions(
  storeSetterFn: Dispatch<SetStateAction<TodoItemType[]>>,
) {
  const addTodo = useCallback((todo: TodoItemType) => {
    storeSetterFn((prevState) => [...prevState, todo])
  }, [])

  const editTodo = useCallback(
    (todoId: TodoItemType["id"], editPayload: Partial<TodoItemType>) => {
      storeSetterFn((prevState) =>
        prevState.map((todo) =>
          todo.id === todoId ? { ...todo, ...editPayload } : todo,
        ),
      )
    },
    [],
  )

  const deleteTodo = useCallback((todoId: TodoItemType["id"]) => {
    if (confirm("Are you sure you want to delete current task?"))
      storeSetterFn((prevState) => prevState.filter(({ id }) => todoId !== id))
  }, [])

  const deleteCompletedTodo = useCallback(() => {
    if (confirm("Are you sure you want to delete all the completed tasks?"))
      storeSetterFn((prevState) =>
        prevState.filter(({ completed }) => !completed),
      )
  }, [])

  return useMemo(
    () => ({
      addTodo,
      editTodo,
      deleteTodo,
      deleteCompletedTodo,
    }),
    [addTodo, editTodo, deleteTodo, deleteCompletedTodo],
  )
}
