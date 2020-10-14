import { useCallback, useEffect, useRef, useState } from 'react'

import { getRatio } from '../utils'

function useScroll() {
  const scrollableContent = useRef()
  const [scrolling, setScrolling] = useState(false)
  const [axis, setAxis] = useState(null)
  const [initialPosition, setInitialPosition] = useState({
    x: 0,
    y: 0,
  })
  const [initialScroll, setInitialScroll] = useState({
    left: 0,
    top: 0,
  })
  const [initialMovement, setInitialMovement] = useState(false)

  const handleMouseDown = useCallback((axis, event) => {
    event.preventDefault()

    setAxis(axis)
    setInitialPosition({
      x: event.pageX,
      y: event.pageY,
    })
    setInitialMovement(true)
    setScrolling(true)
  }, [])

  useEffect(() => {
    const handleMouseUp = () => setScrolling(false)

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (scrolling) {
      const handleStickDrag = (event) => {
        const origin = axis === 'x' ? 'left' : 'top'

        let initialScrollPosition = initialScroll[origin]

        if (initialMovement) {
          initialScrollPosition =
            origin === 'left'
              ? scrollableContent.current.scrollLeft
              : scrollableContent.current.scrollTop

          setInitialScroll({
            ...initialScroll,
            [origin]: initialScrollPosition,
          })

          setInitialMovement(false)
        }

        const movement = {
          x: (initialPosition.x - event.pageX) * -1,
          y: (initialPosition.y - event.pageY) * -1,
        }

        const scaledMovement = {
          x: movement.x / getRatio(scrollableContent).horizontal,
          y: movement.y / getRatio(scrollableContent).vertical,
        }

        if (axis === 'x') {
          scrollableContent.current.scrollLeft =
            initialScrollPosition + scaledMovement.x
        } else {
          scrollableContent.current.scrollTop =
            initialScrollPosition + scaledMovement.y
        }
      }

      document.addEventListener('mousemove', handleStickDrag)

      return () => {
        document.removeEventListener('mousemove', handleStickDrag)
      }
    }
  }, [
    axis,
    initialMovement,
    initialPosition.x,
    initialPosition.y,
    initialScroll,
    scrolling,
  ])

  return [scrolling, scrollableContent, handleMouseDown]
}

export default useScroll
