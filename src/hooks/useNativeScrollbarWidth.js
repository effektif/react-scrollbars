import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useNativeScrollbarWidth = () => {
  const [nativeScrollbarWidth, setNativeScrollbarWidth] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const scrollbarElement = useRef()

  useLayoutEffect(() => {
    const element = document.createElement('div')
    element.style.width = '100px'
    element.style.height = '100px'
    element.style.overflow = 'scroll'
    element.style.position = 'absolute'
    element.style.top = '-100%'
    element.style.left = '-100%'

    document.body.appendChild(element)

    setNativeScrollbarWidth(element.offsetWidth - element.clientWidth)
    setFirstRender(false)

    scrollbarElement.current = element
  }, [])

  useEffect(() => {
    if (firstRender || !scrollbarElement.current) {
      return
    }

    document.body.removeChild(scrollbarElement.current)

    scrollbarElement.current = null
  }, [firstRender])

  return nativeScrollbarWidth
}

export default useNativeScrollbarWidth
