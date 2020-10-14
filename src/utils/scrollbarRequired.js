import getContentDimensions from './getContentDimensions'

export default function scrollbarRequired(
  scrollableContent,
  overflowTolerance
) {
  if (!scrollableContent.current) {
    return {}
  }

  var dimensions = getContentDimensions(scrollableContent)
  var horizontalRequired =
    dimensions.scrollWidth - overflowTolerance > dimensions.width
  var verticalRequired =
    dimensions.scrollHeight - overflowTolerance > dimensions.height

  return {
    horizontal: horizontalRequired,
    vertical: verticalRequired,
    both: horizontalRequired && verticalRequired,
  }
}
