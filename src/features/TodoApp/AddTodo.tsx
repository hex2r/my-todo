import { memo } from "react"
import Checkbox from "../../components/Checkbox"
import { useAddTodoItemActions } from "./hooks/useTodo"

export default memo(AddTodo)

function AddTodo() {
  const actions = useAddTodoItemActions()

  return (
    <span className="relative flex w-full gap-4 p-4 hover:bg-[#2a2a2a] has-focus-visible:bg-[#333]">
      <Checkbox isDisabled />
      <span className="flex gap-2 flex-col grow select-none">
        <span
          data-placeholder="Tap to add a new todo"
          className="p-2 -m-2 before:content-[attr(data-placeholder)] before:text-[#666] focus:before:content-[''] not-empty:before:content-[''] before:cursor-text"
          contentEditable="plaintext-only"
          {...actions}
          suppressContentEditableWarning
        />
      </span>
    </span>
  )
}
