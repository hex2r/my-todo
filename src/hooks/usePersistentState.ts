import { useCallback, useState } from "react"
import { isEmpty, isFunction, isUndefined, isNull } from "lodash-es"

export function usePersistentState<State extends object | any[]>(
  key: string,
  initialState?: State | (() => State),
  storage: Storage = localStorage,
): [State, React.Dispatch<React.SetStateAction<State>>] {
  const [state, setState] = useState<State>(() => {
    const storedValue = storage.getItem(key)
    let results

    if (!isNull(storedValue)) {
      results = JSON.parse(storedValue)

      if (!isEmpty(results)) return results
    }

    if (isUndefined(initialState)) {
      return initialState
    }

    if (isFunction(initialState)) {
      results = (initialState as () => State)()
    } else {
      results = initialState
    }

    storage.setItem(key, JSON.stringify(results))

    return results
  })

  const setStateWithPersist: React.Dispatch<React.SetStateAction<State>> =
    useCallback(
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
