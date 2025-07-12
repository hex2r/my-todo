import { useCallback, useMemo } from "react"
import { KEYBOARD_KEYS } from "../../../config/constants"
import moveCaret from "../../../helpers/moveCaret"
import type { TodoItemType } from "../types"
import { TODO_FIELD_MAX_CHAR_COUNT } from "../config"
import { useStoreAPI } from "../context/TodoStore"

const { BACKSPACE, ENTER, E } = KEYBOARD_KEYS

export type ReturnTextboxTodoItemListeners = ReturnType<
  typeof useTextboxTodoItemListeners
>

export function useTextboxTodoItemListeners(
  { id, title }: Pick<TodoItemType, "id"> & Pick<TodoItemType, "title">,
  {
    setEditMode,
  }: { setEditMode: React.Dispatch<React.SetStateAction<boolean>> },
) {
  const { editTodo } = useStoreAPI()
  const onInput = useCallback((e: React.ChangeEvent<HTMLSpanElement>) => {
    const field = e.currentTarget
    const fieldText = field.innerText.trim()

    if (fieldText.length > TODO_FIELD_MAX_CHAR_COUNT) {
      field.innerText = fieldText.slice(0, TODO_FIELD_MAX_CHAR_COUNT)
      moveCaret(field, fieldText.length)
    }
  }, [])

  const onFocus = useCallback((e: React.FocusEvent<HTMLSpanElement>) => {
    const field = e.currentTarget

    if (field.innerText.length > 0) {
      moveCaret(field, field.innerText.length)
    }
  }, [])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === ENTER) {
        e.preventDefault()

        const field = e.currentTarget
        const fieldText = field.innerText.trim()

        if (fieldText === title) {
          field.blur()
          setEditMode(false)
          return
        }

        if (fieldText.length === 0) return

        editTodo(id, {
          completed: false,
          title: fieldText,
        })

        field.blur()
        setEditMode(false)
      }
    },
    [title],
  )

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLSpanElement, Element>) => {
      const field = e.currentTarget
      const fieldText = field.innerText

      field.innerText = fieldText.trim()

      if (fieldText !== title || fieldText.length === 0) {
        field.innerText = title
      }

      setEditMode(false)
    },
    [title],
  )

  const onDoubleClick = useCallback(
    (_: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setEditMode(true)
    },
    [],
  )

  return useMemo(
    () => ({ onKeyDown, onBlur, onFocus, onInput, onDoubleClick }),
    [onKeyDown, onBlur, onFocus, onInput, onDoubleClick],
  )
}

export type ReturnCheckboxTodoItemListeners = ReturnType<
  typeof useCheckboxTodoItemListeners
>

export function useCheckboxTodoItemListeners(
  { id }: Pick<TodoItemType, "id">,
  {
    setEditMode,
  }: { setEditMode: React.Dispatch<React.SetStateAction<boolean>> },
) {
  const { deleteTodo, editTodo } = useStoreAPI()
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    editTodo(id, { completed: e.currentTarget.checked })
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === BACKSPACE && e.shiftKey) deleteTodo(id)
    if (e.key === E && e.ctrlKey) setEditMode(true)
  }, [])

  return useMemo(() => ({ onChange, onKeyDown }), [onChange, onKeyDown])
}
