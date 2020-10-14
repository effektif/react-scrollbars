import React from 'react'

function Scrollbar({
  render,
  vertical = true,
  horizontal = true,
  scrollbarLength = {
    horizontal: 100,
    vertical: 100,
  },
  scrollbarThickness = 10,
  offset = 2,
  fixedScrollbar = false,
  stickLength = {
    horizontal: 100,
    vertical: 100,
  },
  stickPosition = {
    horizontal: 0,
    vertical: 0,
  },
  showScrollbar = {
    horizontal: true,
    vertical: false,
  },
  onMouseDown,
}) {
  if (!render) {
    return null
  }

  let verticalScrollbarHeight
  let horizontalScrollbarWidth

  if (scrollbarLength.vertical) {
    verticalScrollbarHeight = scrollbarLength.vertical
  }

  if (scrollbarLength.horizontal) {
    horizontalScrollbarWidth = scrollbarLength.horizontal
  }

  // TODO: clean this junk UP

  const scrollbarStyleVertical = Object.assign(
    {
      width: scrollbarThickness,
      top: offset,
      height: verticalScrollbarHeight || 'auto',
      bottom: verticalScrollbarHeight ? 'auto' : offset,
      right: offset,
    },
    scrollbarStyle
  )

  const scrollbarStyleHorizontal = Object.assign(
    {
      marginLeft: offset,
      bottom: offset,
      width: horizontalScrollbarWidth || 'auto',
      marginRight: horizontalScrollbarWidth ? 'auto' : offset,
      height: scrollbarThickness,
    },
    scrollbarStyle,
    fixedScrollbar && {
      position: 'fixed',
    }
  )

  const scrollbarStickStyleVertical = Object.assign(
    {
      width: scrollbarThickness,
      height: stickLength.vertical,
      right: 0,
      top: stickPosition.vertical,
    },
    stickStyle
  )

  const scrollbarStickStyleHorizontal = Object.assign(
    {
      height: scrollbarThickness,
      width: stickLength.horizontal,
      left: stickPosition.horizontal,
    },
    stickStyle
  )

  return (
    <div className="Scrollbar-wrapper">
      {vertical && showScrollbar.vertical && (
        <div className="Scrollbar" style={scrollbarStyleVertical}>
          <div
            className="Scrollbar-stick"
            style={scrollbarStickStyleVertical}
            onMouseDown={onMouseDown.bind(null, 'y')}
          />
        </div>
      )}

      {horizontal && showScrollbar.horizontal && (
        <div style={scrollbarStyleHorizontal}>
          <div
            style={scrollbarStickStyleHorizontal}
            onMouseDown={onMouseDown.bind(null, 'x')}
          />
        </div>
      )}
    </div>
  )
}

const scrollbarStyle = {
  borderRadius: 4,
  background: 'rgba(0, 0, 0, 0.5)',
  position: 'absolute',
  opacity: 1,
  zIndex: 2,
}

const stickStyle = {
  background: 'rgba(255, 255, 255, 0.7)',
  position: 'absolute',
  borderRadius: 4,
}

export default Scrollbar
