import {
  ContextMenu,
  type ContextMenuProps,
} from "../../components/ContextMenu"
import { useStoreAPI } from "./context/TodoStore"
import type { TodoItemType } from "./types"

type TodoItemContextMenuProps = {
  todo: TodoItemType
  menu: ContextMenuProps
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoItemContextMenu({
  todo,
  menu,
  setEditMode,
}: TodoItemContextMenuProps) {
  const { editTodo, deleteTodo } = useStoreAPI()

  return (
    <ContextMenu
      x={menu.x}
      y={menu.y}
      isVisible={menu.isVisible}
      onClose={menu.onClose}
    >
      <ContextMenu.Item
        onClick={() => {
          editTodo(todo.id, { completed: !todo.completed })
          menu.onClose()
        }}
      >
        {todo.completed ? "Uncomplete" : "Complete"}
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          setEditMode(true)
          menu.onClose()
        }}
      >
        Edit
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          deleteTodo(todo.id)
          menu.onClose()
        }}
      >
        Delete
      </ContextMenu.Item>
    </ContextMenu>
  )
}
