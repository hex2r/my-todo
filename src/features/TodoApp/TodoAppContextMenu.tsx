import type { RefObject } from "react"
import {
  ContextMenu,
  type ContextMenuProps,
} from "../../components/ContextMenu"
import { useStoreAPI } from "./context/TodoStore"

type TodoItemContextMenuProps = {
  menu: ContextMenuProps
  id: string
  ref: RefObject<HTMLSpanElement | null>
  completed: boolean
}

export default function TodoItemContextMenu({
  menu,
  id,
  completed,
  ref,
}: TodoItemContextMenuProps) {
  const { deleteTodo, editTodo } = useStoreAPI()

  return (
    <ContextMenu
      x={menu.x}
      y={menu.y}
      isVisible={menu.isVisible}
      onClose={menu.onClose}
    >
      <ContextMenu.Item
        onClick={() => {
          editTodo(id, { completed: !completed })
          menu.onClose()
        }}
      >
        {!completed ? "Complete" : "Uncomplete"}
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          ref?.current?.focus()
          menu.onClose()
        }}
      >
        Edit
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          deleteTodo(id)
          menu.onClose()
        }}
      >
        Delete
      </ContextMenu.Item>
    </ContextMenu>
  )
}
