import { useRef, type ChangeEvent, type KeyboardEvent } from "react"
import { IoCheckbox, IoSquare } from "react-icons/io5"

type CheckboxProps = {
  isChecked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}

export default function Checkbox({
  isChecked = false,
  isDisabled,
  onChange = () => {},
}: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null)
  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      checkboxRef.current?.click()
    }
  }

  return (
    <label
      className={`flex shrink-0 ${isDisabled ? "" : "cursor-pointer"}`}
      tabIndex={isDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={isChecked}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={checkboxRef}
        tabIndex={-1}
        className="sr-only peer"
        type="checkbox"
        name="completed"
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <IoCheckbox className="text-emerald-500 text-2xl hidden peer-checked:block" />
      <IoSquare
        className={`text-2xl block peer-checked:hidden ${isDisabled ? "text-[#999]" : "text-white"}`}
      />
    </label>
  )
}
