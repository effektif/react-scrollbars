import getContentDimensions from './getContentDimensions'
import scrollbarRequired from './scrollbarRequired'

export default function getScrollbarLength(
  scrollableContent,
  nativeScrollbarWidth,
  overflowTolerance,
  scrollbarOffset
) {
  let horizontal =
    getContentDimensions(scrollableContent).width - scrollbarOffset * 2
  let vertical =
    getContentDimensions(scrollableContent).height - scrollbarOffset * 2

  if (scrollbarRequired(scrollableContent, overflowTolerance).both) {
    horizontal = horizontal - nativeScrollbarWidth
    vertical = vertical - nativeScrollbarWidth
  }

  return {
    horizontal: horizontal,
    vertical: vertical,
  }
}
