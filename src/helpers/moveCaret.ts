export default function moveCaret(element: HTMLElement, position: number) {
  const range = document.createRange()
  const select = window.getSelection()

  range.setStart(element.childNodes[0], position)
  range.collapse(true)
  select?.removeAllRanges()
  select?.addRange(range)
}
