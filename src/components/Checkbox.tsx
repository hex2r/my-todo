import { IoCheckbox, IoSquare } from "react-icons/io5"
import { KEYBOARD_KEYS } from "../config/constants"
import { useRef } from "react"

const { SPACE, ENTER } = KEYBOARD_KEYS

type CheckboxProps = {
  ref?: React.RefObject<HTMLLabelElement | null>
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLLabelElement>) => void
}

export default function Checkbox({
  ref,
  checked = false,
  disabled,
  readonly,
  onChange = () => {},
  onKeyDown,
}: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement | null>(null)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    onKeyDown?.(e)

    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault()
      if (checkboxRef.current instanceof HTMLInputElement)
        checkboxRef.current.click()
    }
  }

  return (
    <label
      ref={ref}
      className={`flex shrink-0 ${disabled ? "" : "cursor-pointer"}`}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={checkboxRef}
        tabIndex={-1}
        className="sr-only peer"
        type="checkbox"
        name="completed"
        checked={checked}
        disabled={disabled}
        readOnly={readonly}
        onChange={onChange}
      />
      <IoCheckbox className="text-emerald-500 text-2xl hidden peer-checked:block" />
      <IoSquare
        className={`text-2xl block peer-checked:hidden ${disabled ? "text-[#999]" : "text-white"}`}
      />
    </label>
  )
}
