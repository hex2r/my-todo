import { useCallback, useMemo } from "react"
import { useStoreAPI } from "../context/TodoStore"
import { v7 as uuidv7 } from "uuid"
import { KEYBOARD_KEYS } from "../../../config/constants"
import moveCaret from "../../../helpers/moveCaret"
import { TODO_FIELD_MAX_CHAR_COUNT } from "../config"

const { ENTER } = KEYBOARD_KEYS

export type ReturnAddTodoItemListeners = ReturnType<
  typeof useAddTodoItemListeners
>

export function useAddTodoItemListeners() {
  const { addTodo } = useStoreAPI()

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

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === ENTER) {
      e.preventDefault()
      const field = e.currentTarget
      const fieldText = field.innerText.trim()

      if (fieldText.length === 0) return

      addTodo({
        id: uuidv7(),
        title: fieldText,
        completed: false,
      })

      field.innerText = ""
    }
  }, [])

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLSpanElement, Element>) => {
      const field = e.currentTarget
      const currentValue = field.innerText

      field.innerText = currentValue.trim()
    },
    [],
  )

  return useMemo(
    () => ({
      onInput,
      onKeyDown,
      onFocus,
      onBlur,
    }),
    [onKeyDown, onFocus, onBlur, onInput],
  )
}
