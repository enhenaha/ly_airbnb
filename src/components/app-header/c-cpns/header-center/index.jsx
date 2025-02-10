import React, { memo } from 'react'
import { CenterWrapper } from './style'
import IconSearchBar from '@/assets/svg/icon-search-bar'

const HeaderCenter = memo((props) => {
  const { isSearch, searchBarClick } = props

  function searchBarClickHandle() {
    if(searchBarClick) searchBarClick()
  }

  return (
    <CenterWrapper>
      {
        !isSearch ? (
          <div className="search-bar" onClick={searchBarClickHandle}>
            <div className="text">
              搜索房源和体验
            </div>
            <div className="icon">
              <IconSearchBar/>
            </div>
          </div>
        ): (
          <div className="search-detail">搜索区域</div>
        )
      }

      
    </CenterWrapper>
  )
})

export default HeaderCenter