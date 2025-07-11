import { memo, useRef } from "react"
import { useTodoItemListeners } from "./hooks/useTodo"
import type { TodoItemType } from "./types"
import Checkbox from "../../components/Checkbox"
import { useStoreAPI } from "./context/TodoStore"
import useHorizontalSwipe from "../../hooks/useHorizontalSwipe"
import { useContextMenu } from "../../components/ContextMenu"
import TodoAppContextMenu from "./TodoAppContextMenu"
import isTouchDevice from "../../helpers/isTouchDevice"

export default memo(TodoItem)

function TodoItem(props: TodoItemType) {
  const checkboxRef = useRef<HTMLInputElement | null>(null)
  const fieldRef = useRef<HTMLSpanElement>(null)
  const { checkboxListeners, itemListeners, fieldListeners } =
    useTodoItemListeners(props)
  const { deleteTodo, editTodo } = useStoreAPI()
  const { deltaX, swipeListeners } = useHorizontalSwipe({
    swipeLeftHandler: () =>
      editTodo(props.id, { completed: !checkboxRef?.current?.checked }),
    swipeRightHandler: () => deleteTodo(props.id),
  })
  const { menu, onContextMenu } = useContextMenu()

  const limitedDeltaX =
    deltaX > 0 ? (deltaX > 0 ? 50 : deltaX) : deltaX < -50 ? -50 : deltaX

  return (
    <>
      <div
        id={props.id}
        data-shortcut-info={
          isTouchDevice() ? undefined : "shift+delete to delete"
        }
        className="relative transition-[transform_220ms_ease-out] flex items-start w-full gap-4 p-4 hover:bg-[#2a2a2a] has-focus-visible:z-2 has-focus-visible:bg-[#333] has-focus-visible:before:content-[attr(data-shortcut-info)] before:absolute before:top-full before:right-1 before:text-[0.5rem] before:text-[#666] before:mt-[0.5]"
        {...itemListeners}
        {...swipeListeners}
        onContextMenu={onContextMenu}
        style={{
          transform: `translateX(${limitedDeltaX}px)`,
        }}
      >
        <Checkbox
          ref={checkboxRef}
          isChecked={props.completed}
          {...checkboxListeners}
        />
        <span
          ref={fieldRef}
          tabIndex={-1}
          contentEditable="plaintext-only"
          className={`flex gap-2 flex-col grow focus-visible:p-2 focus-visible:-m-2 ${props.completed ? "not-focus-within:line-through text-[#999] focus:text-white" : "text-white"}`}
          {...fieldListeners}
          suppressContentEditableWarning
        >
          {props.title}
        </span>
      </div>
      <TodoAppContextMenu
        completed={checkboxRef.current?.checked || false}
        ref={fieldRef}
        id={props.id}
        menu={menu}
      />
    </>
  )
}
