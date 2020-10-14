import React, { useState } from 'react'
import classNames from 'classnames'

import Scrollbar from './scrollbar'
import {
  scrollbarRequired,
  calculateStickPosition,
  getScrollbarLength,
  getStickLength,
} from './utils'
import { useFixedScrollbar, useNativeScrollbarWidth, useScroll } from './hooks'

function ScrollbarWrapper({
  scrollbarAffix = false,
  className,
  children,
  overflowTolerance = 3,
  scrollbarOffset = 2,
  ...rest
}) {
  const [stickPosition, setStickPosition] = useState({
    horizontal: 0,
    vertical: 0,
  })

  const nativeScrollbarWidth = useNativeScrollbarWidth()
  const [fixedScrollbar, containerEl] = useFixedScrollbar(scrollbarAffix)
  const [scrolling, scrollableContent, onMouseDown] = useScroll()

  return (
    <div
      ref={containerEl}
      style={scrollbarContainerStyle}
      className={classNames({
        ScrollbarContainer: true,
        'ScrollbarContainer--scrolling': scrolling,
      })}
    >
      <div
        ref={scrollableContent}
        style={scrollbarContentStyle(
          scrollableContent,
          nativeScrollbarWidth,
          overflowTolerance
        )}
        onScroll={(event) => {
          setStickPosition(
            calculateStickPosition(
              scrollableContent,
              nativeScrollbarWidth,
              overflowTolerance,
              scrollbarOffset,
              {
                left: event.target.scrollLeft,
                top: event.target.scrollTop,
              }
            )
          )
        }}
        className={className + ' ScrollbarContent'}
      >
        <div
          className="ScrollbarChildren"
          style={{
            position: 'relative',
            paddingBottom: nativeScrollbarWidth,
          }}
        >
          {children}
        </div>

        <Scrollbar
          {...rest}
          render={nativeScrollbarWidth != null}
          stickLength={getStickLength(
            scrollableContent,
            nativeScrollbarWidth,
            overflowTolerance,
            scrollbarOffset
          )}
          scrollbarLength={getScrollbarLength(
            scrollableContent,
            nativeScrollbarWidth,
            overflowTolerance,
            scrollbarOffset
          )}
          stickPosition={stickPosition}
          fixedScrollbar={fixedScrollbar}
          showScrollbar={scrollbarRequired(
            scrollableContent,
            overflowTolerance
          )}
          offset={scrollbarOffset}
          onMouseDown={onMouseDown}
        />
      </div>
    </div>
  )
}

function scrollbarContentStyle(
  scrollableContent,
  nativeScrollbarWidth,
  overflowTolerance
) {
  var style = {}

  if (scrollbarRequired(scrollableContent, overflowTolerance).vertical) {
    style.paddingRight = nativeScrollbarWidth
    style.overflowY = 'scroll'
  }

  if (scrollbarRequired(scrollableContent, overflowTolerance).horizontal) {
    style.marginBottom = nativeScrollbarWidth * -1
    style.overflowX = 'scroll'
  }

  return style
}

const scrollbarContainerStyle = {
  position: 'relative',
  overflow: 'hidden',
}

export default ScrollbarWrapper
