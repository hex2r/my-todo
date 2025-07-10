import { memo } from "react"
import type { TodoItemType } from "./types"
import Checkbox from "../../components/Checkbox"
import { useTodoItemListeners } from "./hooks/useTodo"

export default memo(TodoItem)

function TodoItem(props: TodoItemType) {
  const { onKeyboardDelete, onChange, ...fieldListeners } =
    useTodoItemListeners(props)

  return (
    <span
      id={props.id}
      data-shortcut-info="shift+delete to delete"
      className="relative flex items-start w-full gap-4 p-4 hover:bg-[#2a2a2a] has-focus-visible:z-2 has-focus-visible:bg-[#333] has-focus-visible:before:content-[attr(data-shortcut-info)] before:absolute before:top-full before:right-1 before:text-[0.5rem] before:text-[#666] before:mt-[0.5]"
      onKeyDown={onKeyboardDelete}
    >
      <span className="flex">
        <Checkbox isChecked={props.completed} onChange={onChange} />
      </span>
      <span className="flex gap-2 flex-col grow select-none">
        <span
          className={`focus-visible:p-2 focus-visible:-m-2 ${props.completed ? "not-focus-within:line-through text-[#999] focus:text-white" : "text-white"}`}
          contentEditable="plaintext-only"
          {...fieldListeners}
          suppressContentEditableWarning
        >
          {props.title}
        </span>
      </span>
    </span>
  )
}
