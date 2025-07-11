import { useState } from "react"

export default function useContextMenu() {
  const [menu, setMenu] = useState<{
    x: number
    y: number
    isVisible: boolean
  }>({
    x: 0,
    y: 0,
    isVisible: false,
  })

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY, isVisible: true })
  }

  const onClose = () => setMenu((m) => ({ ...m, isVisible: false }))

  return {
    menu: {
      ...menu,
      onClose,
    },
    onContextMenu,
  }
}
