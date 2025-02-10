import React, { memo, useRef, useState } from 'react'
import { HeaderWrapper, SearchAreaWrapper } from './style'
import HeaderLeft from './c-cpns/header-left'
import HeaderCenter from './c-cpns/header-center'
import HeaderRight from './c-cpns/header-right'
import { shallowEqual, useSelector } from 'react-redux'
import classNames from 'classnames'
import useScrollPosition from '@/hooks/useScrollPosition'
import { ThemeProvider } from 'styled-components'

const AppHeader = memo(() => {
  /* 定义组件内部的状态 */
  const [ isSearch, setIsSearch ] = useState(false)

  /* 从redux中获取数据 */
  const { headerConfig } = useSelector((state) => ({
    headerConfig: state.main.headerConfig
  }), shallowEqual)
  const { isFixed, topAlpha } = headerConfig

  /* 监听滚动 */
  const { scrollY } = useScrollPosition()
  const prevY = useRef(0) // 设置初始化值为0 (设不设置都可以, 没什么区别, 只是一种规范), 由于组件多次渲染时useRef始终返回同一个对象, 因此可以借助这一机制来记录一些数据。
  // 在正常情况下(搜索框没有弹出来), 不断记录值
  if (!isSearch) prevY.current = scrollY
  // 在弹出搜索功能的情况, 滚动的距离大于之前记录的距离的30
  if (isSearch && Math.abs(scrollY - prevY.current) > 30) setIsSearch(false)
  // Math.abs()得到的是绝对值。


  /* 透明度的逻辑 */
  const isAlpha = topAlpha && scrollY === 0

  return (
    <ThemeProvider theme={{isAlpha}}>
      {/* 在App根组件外边已经使用过styled-components库的ThemeProvider组件了, 现在在App根组件内部又使用ThemeProvider组件, 相对于ThemeProvider组件被使用了多次, styled-components库是允许这样使用的。但是需要注意这里的theme属性的属性值, 即一个对象。 这个对象只有当前组件以及当前组件的后代组件才可以使用到。 就好像包住App根组件的ThemeProvider组件上的theme属性的属性值也只有App根组件以及它的后代组件才可以使用到一样。*/}
      <HeaderWrapper className={(classNames({ fixed: isFixed }))}>
        {/* 还可以直接给css组件HeaderWrapper设置一个class类, 最终效果就是该css组件对应的html元素上会有这个设置的类。(记住即可) */}
        <div className="app-content">
          <div className="app-top">
            <HeaderLeft/>
            <HeaderCenter isSearch={ isAlpha || isSearch} searchBarClick={e => setIsSearch(true)}/>
            <HeaderRight/>
          </div>
          <SearchAreaWrapper isSearch={isAlpha || isSearch}></SearchAreaWrapper>
        </div>
        { isSearch && <div className="cover" onClick={e => setIsSearch(false)}></div> }
      </HeaderWrapper>
    </ThemeProvider>
  )
})

export default AppHeader