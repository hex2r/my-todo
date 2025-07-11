import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PropsWithChildren,
} from "react"

export type ContextMenuProps = {
  x: number
  y: number
  isVisible: boolean
  onClose: () => void
} & PropsWithChildren

ContextMenu.Item = ContextMenuItem

export default function ContextMenu({
  x,
  y,
  isVisible,
  onClose,
  children,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isVisible) return

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    window.addEventListener("mousedown", handleClick)
    return () => window.removeEventListener("mousedown", handleClick)
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-[#222] text-white rounded shadow-lg p-2"
      style={{ top: y, left: x, minWidth: 120 }}
    >
      {children}
    </div>
  )
}

type ContextMenuItemType = {
  onClick: (e: ReactMouseEvent<HTMLButtonElement>) => void
} & PropsWithChildren

function ContextMenuItem({ onClick, children }: ContextMenuItemType) {
  return (
    <button
      className="block w-full text-left py-1 px-2 hover:bg-[#333]"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
