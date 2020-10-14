import getContentDimensions from './getContentDimensions'

export default function scrollbarRequired(
  scrollableContent,
  overflowTolerance
) {
  if (!scrollableContent.current) {
    return {}
  }

  const dimensions = getContentDimensions(scrollableContent)
  const horizontalRequired =
    dimensions.scrollWidth - overflowTolerance > dimensions.width
  const verticalRequired =
    dimensions.scrollHeight - overflowTolerance > dimensions.height

  return {
    horizontal: horizontalRequired,
    vertical: verticalRequired,
    both: horizontalRequired && verticalRequired,
  }
}
