import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

const Indicator = memo((props) => {
  const { selectIndex = 0 } = props
  const contentRef = useRef()

  useEffect(() => {
    // 1、获取selectIndex对应的元素以及信息
    const selectItemEl = contentRef.current.children[selectIndex]
    const itemLeft = selectItemEl.offsetLeft
    const itemWidth = selectItemEl.clientWidth

    // 2、获取i-content元素的宽度
    const contentWidth = contentRef.current.clientWidth
    // console.log(selectItemEl, itemLeft, itemWidth, contentWidth)
    const contentScroll = contentRef.current.scrollWidth

    // 3、获取selectIndex对应的元素需要滚动的距离
    let distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5

    // 4、特殊情况的处理
    if (distance < 0) distance = 0 // 左边的特殊情况
    const totalDistance = contentScroll - contentWidth
    if (distance > totalDistance) distance = totalDistance // 右边的特殊情况
    
    // 5、改变位置
    contentRef.current.style.transform = `translate(${-distance}px)`
  }, [selectIndex])

  return (
    <IndicatorWrapper>
      <div className="i-content" ref={contentRef}>
        {
          props.children
        }
      </div>
    </IndicatorWrapper>
  )
})

Indicator.propTypes = {
  selectIndex: PropTypes.number
}

export default Indicator