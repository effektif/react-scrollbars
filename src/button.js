import React from 'react'

var style = {
  background: 'transparent',
  border: '2px solid #1ABC9C',
  borderRadius: 2,
  textTransform: 'uppercase',
  padding: '0.5em 1em',
}

function Button({ type, children }) {
  return (
    <button style={style} type={type} className="Button">
      {children}
    </button>
  )
}

export default Button
