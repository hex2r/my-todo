import { useCallback, useState, type TouchEvent } from "react"

type UseHorizontalSwipeType<Handler extends Function> = {
  swipeLeftHandler: Handler
  swipeRightHandler: Handler
  swipeDeltaX?: number
}

export default function useHorizontalSwipe<Handler extends Function>({
  swipeLeftHandler,
  swipeRightHandler,
  swipeDeltaX = 50,
}: UseHorizontalSwipeType<Handler>) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [deltaX, setDeltaX] = useState<number>(0)
  const [deltaY, setDeltaY] = useState<number>(0)

  const onTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX)
    setTouchStartY(e.touches[0].clientY)
    setDeltaX(0)
    setDeltaY(0)
  }, [])

  const onTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (touchStartX !== null && touchStartY !== null) {
        const currentX = e.touches[0].clientX
        const currentY = e.touches[0].clientY
        setDeltaX(currentX - touchStartX)
        setDeltaY(currentY - touchStartY)
      }
    },
    [touchStartX, touchStartY],
  )

  const onTouchEnd = useCallback(
    (_: TouchEvent<HTMLDivElement>) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > swipeDeltaX) {
          swipeLeftHandler()
        } else if (deltaX < -swipeDeltaX) {
          swipeRightHandler()
        }
      }
      setTouchStartX(null)
      setTouchStartY(null)
      setDeltaX(0)
      setDeltaY(0)
    },
    [deltaX, deltaY, swipeDeltaX, swipeLeftHandler, swipeRightHandler],
  )

  const limitateSwipe = (actualDelta: number) => {
    return actualDelta > 0
      ? actualDelta > 0
        ? swipeDeltaX
        : actualDelta
      : actualDelta < -swipeDeltaX
        ? -swipeDeltaX
        : actualDelta
  }

  return {
    deltaX: limitateSwipe(deltaX),
    touchStartX,
    swipeListeners: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  }
}
