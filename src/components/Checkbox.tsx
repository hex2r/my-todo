import { type ChangeEvent, type KeyboardEvent, type RefObject } from "react"
import { IoCheckbox, IoSquare } from "react-icons/io5"

type CheckboxProps = {
  ref?: RefObject<HTMLInputElement | null>
  isChecked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}

export default function Checkbox({
  ref,
  isChecked = false,
  isDisabled,
  onChange = () => {},
}: CheckboxProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      ref?.current?.click()
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
        ref={ref}
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
