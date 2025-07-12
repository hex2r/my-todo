import { memo } from "react"
import Checkbox from "../../components/Checkbox"
import { useAddTodoItemListeners } from "./hooks/useAddTodoItemListeners"
import TodoTextbox from "./TodoTextbox"

export default memo(AddTodoItem)

function AddTodoItem() {
  return (
    <div className="relative flex w-full gap-4 p-4 hover:bg-[#2a2a2a] has-focus-visible:bg-[#333]">
      <Checkbox disabled />
      <TodoTextbox
        isEdited
        {...useAddTodoItemListeners()}
        placeholder="Add a new todo"
      />
    </div>
  )
}
