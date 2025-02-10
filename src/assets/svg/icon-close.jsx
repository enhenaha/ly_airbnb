import React, { memo } from 'react'
import styleStrToObject from './utils'

const IconClose = memo((props) => {
  const { width = 12, height = 12 } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={styleStrToObject(`display: block; fill: none; height: ${height}px; width: ${width}px; stroke: currentcolor; stroke-width: 3; overflow: visible;`)}><path d="m6 6 20 20M26 6 6 26"></path></svg>
  )
})

export default IconClose