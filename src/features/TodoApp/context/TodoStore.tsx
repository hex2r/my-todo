import { createContext, use, useMemo, type PropsWithChildren } from "react"
import type { TodoItemType } from "../types"
import { useTodoStoreActions } from "./useTodoStoreActions"
import { usePersistentState } from "../../../hooks/usePersistentState"

type TodoStoreType = {
  todo: TodoItemType[]
}
const TodoStore = createContext<TodoStoreType | undefined>(undefined)

type TodoStoreActionsType = ReturnType<typeof useTodoStoreActions>

const TodoStoreActions = createContext<TodoStoreActionsType | undefined>(
  undefined,
)

type TodoStoreProviderProps = {
  initialStore?: TodoItemType[]
} & PropsWithChildren

export function TodoStoreProvider({
  children,
  initialStore = [],
}: TodoStoreProviderProps) {
  const [todo, setTodo] = usePersistentState<TodoItemType[]>(
    "todo",
    initialStore,
    sessionStorage,
  )

  return (
    <TodoStore value={useMemo(() => ({ todo }), [todo])}>
      <TodoStoreActions value={useTodoStoreActions(setTodo)}>
        {children}
      </TodoStoreActions>
    </TodoStore>
  )
}

export function useTodoStore() {
  const context = use(TodoStore)

  if (!context) {
    throw Error(
      "The following component should be used within TodoStore context",
    )
  }

  return context.todo
}

export function useStoreAPI() {
  const context = use(TodoStoreActions)

  if (!context) {
    throw Error(
      "The following component should be used within TodoStoreActions context",
    )
  }

  return context
}
