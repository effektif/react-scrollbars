import getContentDimensions from './getContentDimensions'

export default function getRatio(scrollableContent) {
  if (!scrollableContent.current) {
    return {}
  }

  const element = scrollableContent.current

  return {
    horizontal:
      getContentDimensions(scrollableContent).width / element.scrollWidth,
    vertical:
      getContentDimensions(scrollableContent).height / element.scrollHeight,
  }
}
