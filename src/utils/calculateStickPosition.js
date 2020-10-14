import getContentDimensions from './getContentDimensions'
import getScrollbarLength from './getScrollbarLength'

export default function calculateStickPosition(
  scrollableContent,
  nativeScrollbarWidth,
  overflowTolerance,
  scrollbarOffset,
  { left, top }
) {
  const scrollbarRatioWidth =
    getScrollbarLength(
      scrollableContent,
      nativeScrollbarWidth,
      overflowTolerance,
      scrollbarOffset
    ).horizontal / getContentDimensions(scrollableContent).scrollWidth
  const scrollbarRatioHeight =
    getScrollbarLength(
      scrollableContent,
      nativeScrollbarWidth,
      overflowTolerance,
      scrollbarOffset
    ).vertical / getContentDimensions(scrollableContent).scrollHeight

  return {
    horizontal: left * scrollbarRatioWidth,
    vertical: top * scrollbarRatioHeight,
  }
}
