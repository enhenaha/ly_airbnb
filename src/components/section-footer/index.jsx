import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { FooterWrapper } from './style'
import IconMoreArrow from '@/assets/svg/icon-more-arrow'
import { useNavigate } from 'react-router-dom'

const SectionFooter = memo((props) => {
  const { name } = props

  let showMessage = "显示全部"
  if (name) {
    showMessage = `显示更多${name}房源`
  }

  /* 事件处理的逻辑 */
  const navigate = useNavigate()
  function moreClickHandle() {
    navigate('/entire')
  }

  return (
    <FooterWrapper color={name ? "#00848A": "#000"}>
      <div className="info" onClick={moreClickHandle}>
        <span className="text">{showMessage}</span>
        <IconMoreArrow/>
      </div>
    </FooterWrapper>
  )
})

SectionFooter.propTypes = {
  name: PropTypes.string
}

export default SectionFooter

// 这里有一个FooterWrapper, 在app-footer文件夹中的style.js文件中也有个FooterWrapper, 它们之间是不会互相干扰的。(可能是styled-components库内部做了一些处理)
// 而且在父组件中直接给子组件设置样式, 这可能也是styled-components库内部做了一些处理。