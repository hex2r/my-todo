export default function isTouchScreen() {
  if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches)
    return true

  return false
}
