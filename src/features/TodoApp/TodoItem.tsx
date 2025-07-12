import { memo, useRef, useState } from "react"
import clsx from "clsx"
import Checkbox from "../../components/Checkbox"
import { useStoreAPI } from "./context/TodoStore"
import useHorizontalSwipe from "../../hooks/useHorizontalSwipe"
import { useContextMenu } from "../../components/ContextMenu"
import TodoItemContextMenu from "./TodoItemContextMenu"
import TodoField from "./TodoTextbox"
import {
  useCheckboxTodoItemListeners,
  useTextboxTodoItemListeners,
} from "./hooks/useTodoItemListeners"
import type { TodoItemType } from "./types"

export default memo(TodoItem)

function TodoItem(props: TodoItemType) {
  const { deleteTodo, editTodo } = useStoreAPI()
  const [isEditMode, setEditMode] = useState(false)
  const checkboxRef = useRef<HTMLLabelElement | null>(null)
  const textboxRef = useRef<HTMLSpanElement>(null)
  const { menu, onContextMenu } = useContextMenu()
  const { deltaX, swipeListeners } = useHorizontalSwipe({
    swipeLeftHandler: () => editTodo(props.id, { completed: !props.completed }),
    swipeRightHandler: () => deleteTodo(props.id),
  })

  return (
    <>
      <div
        data-shortcut-info={"CTRL + E to Edit, Shift + Delete to Delete"}
        className={`relative flex transition-[transform_220ms_ease-out] items-start w-full gap-4 p-4 has-focus-visible:z-2 has-focus-visible:bg-[#333] not-pointer-coarse:has-focus-visible:before:content-[attr(data-shortcut-info)] before:absolute before:top-full before:right-1 before:text-[0.5rem] before:text-[#666] before:mt-[0.5] ${clsx(
          {
            "bg-[#333]": menu.isVisible,
            "hover:bg-[#2a2a2a]": !menu.isVisible,
          },
        )}`}
        {...swipeListeners}
        onContextMenu={onContextMenu}
        style={{
          transform: `translateX(${deltaX}px)`,
        }}
      >
        <Checkbox
          ref={checkboxRef}
          checked={props.completed}
          {...useCheckboxTodoItemListeners(
            { id: props.id },
            {
              setEditMode,
            },
          )}
        />
        <TodoField
          ref={textboxRef}
          value={props.title}
          isCompleted={props.completed}
          isEdited={isEditMode}
          {...useTextboxTodoItemListeners(
            { id: props.id, title: props.title },
            {
              setEditMode,
            },
          )}
        />
      </div>
      <TodoItemContextMenu menu={menu} todo={props} setEditMode={setEditMode} />
    </>
  )
}
