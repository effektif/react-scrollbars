export default function getContentDimensions(scrollableContent) {
  if (!scrollableContent.current) {
    return {}
  }

  const element = scrollableContent.current

  return {
    height: element.clientHeight,
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth,
    width: element.clientWidth,
  }
}
