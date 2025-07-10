import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import { isEmpty, isFunction, isUndefined, isNull } from "lodash-es"

export function usePersistentState<T extends object | any[]>(
  key: string,
  initialState?: T | (() => T),
  storage: Storage = localStorage,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = storage.getItem(key)
    let results

    if (!isNull(storedValue)) {
      results = JSON.parse(storedValue)

      // Use initialState in case of empty storage state
      if (!isEmpty(results)) return results
    }

    if (isUndefined(initialState)) {
      return initialState
    }

    if (isFunction(initialState)) {
      results = (initialState as () => T)()
    } else {
      results = initialState
    }

    storage.setItem(key, JSON.stringify(results))

    return results
  })

  const setStateWithPersist: Dispatch<SetStateAction<T>> = useCallback(
    (dispatchedValue) => {
      setState((prevState) => {
        const result = isFunction(dispatchedValue)
          ? dispatchedValue(prevState)
          : dispatchedValue
        storage.setItem(key, JSON.stringify(result))
        return result
      })
    },
    [key],
  )

  return [state, setStateWithPersist]
}
