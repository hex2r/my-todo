import {
  type ChangeEvent,
  type KeyboardEvent,
  type FocusEvent,
  useCallback,
  useMemo,
} from "react"
import type { TodoItemType } from "../types"
import { KEYBOARD_KEYS } from "../../../config/constants"
import moveCaret from "../../../helpers/moveCaret"
import { TODO_FIELD_MAX_CHAR_COUNT } from "../config"
import { useStoreAPI } from "../context/TodoStore"
import { v7 as uuidv7 } from "uuid"

const { ENTER, BACKSPACE } = KEYBOARD_KEYS

function useBasicTodoListeners() {
  const onBlur = useCallback((e: FocusEvent<HTMLSpanElement, Element>) => {
    const field = e.currentTarget
    const currentValue = field.innerText

    field.innerText = currentValue.trim()
  }, [])

  const onInput = useCallback((e: ChangeEvent<HTMLSpanElement>) => {
    const field = e.currentTarget
    const fieldText = field.innerText.trim()

    if (fieldText.length > TODO_FIELD_MAX_CHAR_COUNT) {
      field.innerText = fieldText.slice(0, TODO_FIELD_MAX_CHAR_COUNT)
      moveCaret(field, fieldText.length)
    }
  }, [])

  const onFocus = useCallback((e: FocusEvent<HTMLSpanElement>) => {
    const field = e.currentTarget

    if (field.innerText.length > 0) {
      moveCaret(field, field.innerText.length)
    }
  }, [])

  return useMemo(
    () => ({
      onBlur,
      onInput,
      onFocus,
    }),
    [onBlur, onInput, onFocus],
  )
}

export function useTodoItemListeners({ id, title }: TodoItemType) {
  const { editTodo, deleteTodo } = useStoreAPI()

  const { onBlur: onBasicBlur, onInput, onFocus } = useBasicTodoListeners()

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    editTodo(id, { completed: e.target.checked })
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === ENTER) {
        e.preventDefault()

        const field = e.currentTarget
        const fieldText = field.innerText.trim()

        if (fieldText === title) {
          field.blur()
          return
        }

        if (fieldText.length === 0) return

        editTodo(id, {
          title: fieldText,
          completed: false,
        })

        field.blur()
      }
    },
    [title],
  )

  const onKeyboardDelete = useCallback((e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === BACKSPACE && e.shiftKey) {
      deleteTodo(id)
    }
  }, [])

  const onBlur = useCallback(
    (e: FocusEvent<HTMLSpanElement, Element>) => {
      onBasicBlur(e)

      const field = e.currentTarget
      const fieldText = field.innerText

      if (fieldText !== title || fieldText.length === 0) {
        field.innerText = title
      }
    },
    [title],
  )

  return useMemo(
    () => ({
      itemListeners: {
        onKeyDown: onKeyboardDelete,
      },
      fieldListeners: {
        onKeyDown,
        onBlur,
        onFocus,
        onInput,
      },
      checkboxListeners: {
        onChange,
      },
    }),
    [onChange, onKeyDown, onBlur, onKeyboardDelete, onInput, onFocus],
  )
}

export function useAddTodoItemListeners() {
  const { addTodo } = useStoreAPI()
  const { onBlur: onBasicBlur, onFocus, onInput } = useBasicTodoListeners()

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLSpanElement>) => {
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

  const onBlur = useCallback((e: FocusEvent<HTMLSpanElement, Element>) => {
    onBasicBlur(e)
  }, [])

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
