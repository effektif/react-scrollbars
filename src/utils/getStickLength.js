import getRatio from './getRatio'
import getScrollbarLength from './getScrollbarLength'

export default function getStickLength(
  scrollableContent,
  nativeScrollbarWidth,
  overflowTolerance,
  scrollbarOffset
) {
  if (!scrollableContent.current) {
    return {}
  }

  const scrollbarLength = getScrollbarLength(
    scrollableContent,
    nativeScrollbarWidth,
    overflowTolerance,
    scrollbarOffset
  )
  const horizontal =
    scrollbarLength.horizontal * getRatio(scrollableContent).horizontal
  const vertical =
    scrollbarLength.vertical * getRatio(scrollableContent).vertical

  return {
    horizontal: horizontal,
    vertical: vertical,
  }
}
