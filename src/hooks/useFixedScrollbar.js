import { useEffect, useRef, useState } from 'react'

function useFixedScrollbar(scrollbarAffix) {
  const [fixedScrollbar, setFixedScrollbar] = useState(false)
  const containerEl = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (scrollbarAffix && containerEl.current) {
        const elTop = offsetTop(containerEl.current)
        const elBottom = elTop + containerEl.current.clientHeight

        const vpTop = scrollTop()
        const vpBottom = vpTop + viewportHeight()

        const isPartiallyVisible = elTop <= vpBottom && elBottom >= vpBottom

        setFixedScrollbar(isPartiallyVisible)
      }
    }

    window.addEventListener('scroll', handleScroll, false)
    window.addEventListener('resize', handleScroll, false)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll, false)
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [scrollbarAffix])

  return [fixedScrollbar, containerEl]
}

function offsetTop(elm) {
  let test = elm,
    top = 0
  while (!!test && test.tagName.toLowerCase() !== 'body') {
    top += test.offsetTop
    test = test.offsetParent
  }
  return top
}

function viewportHeight() {
  const de = document.documentElement
  if (!!window.innerWidth) {
    return window.innerHeight
  } else if (de && !isNaN(de.clientHeight)) {
    return de.clientHeight
  }
  return 0
}

function scrollTop() {
  if (window.pageYOffset) {
    return window.pageYOffset
  }
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
}

export default useFixedScrollbar
