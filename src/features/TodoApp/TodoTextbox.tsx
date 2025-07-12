import { useEffect } from "react"
import { type ReturnTextboxTodoItemListeners } from "./hooks/useTodoItemListeners"
import { type ReturnAddTodoItemListeners } from "./hooks/useAddTodoItemListeners"
import clsx from "clsx"
import isTouchScreen from "../../helpers/isTouchScreen"

type TodoTextboxProps = {
  ref?: React.RefObject<HTMLSpanElement | null>
  value?: string
  isCompleted?: boolean
  isEdited?: boolean
  placeholder?: string
} & Partial<ReturnTextboxTodoItemListeners & ReturnAddTodoItemListeners>

export default function TodoTextbox({
  ref,
  value = "",
  isCompleted,
  isEdited,
  placeholder,
  onBlur,
  onDoubleClick,
  onFocus,
  onInput,
  onKeyDown,
}: TodoTextboxProps) {
  useEffect(() => {
    if (isEdited && ref?.current instanceof HTMLSpanElement) ref.current.focus()
  }, [isEdited])

  return (
    <span
      ref={ref}
      role="textbox"
      tabIndex={isTouchScreen() || isEdited ? 0 : undefined}
      data-placeholder={placeholder}
      contentEditable={
        isTouchScreen() || isEdited ? "plaintext-only" : undefined
      }
      className={`${clsx({
        "not-focus-within:line-through text-[#999] focus:text-white":
          isCompleted,
        "text-white": !isCompleted,
        "data-[placeholder]:empty:before:content-[attr(data-placeholder)] data-[placeholder]:not-empty:before:hidden data-[placeholder]:before:text-[#666] data-[placeholder]:focus:before:content-[''] data-[placeholder]:before:cursor-text":
          placeholder,
      })} flex gap-2 flex-col grow focus-visible:p-2 focus-visible:-m-2 in-focus:outline-amber-400 select-none`}
      onBlur={onBlur}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onInput={onInput}
      onKeyDown={onKeyDown}
      suppressContentEditableWarning
    >
      {value}
    </span>
  )
}
