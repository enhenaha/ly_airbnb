import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HomeWrapper } from './style'
import HomeBanner from './c-cpns/home-banner'
import { fetchHomeDataAction } from '@/store/modules/home'
import HomeSectionV1 from './c-cpns/home-section-v1'
import HomeSectionV2 from './c-cpns/home-section-v2'
import { isEmptyObject } from '@/utils'
import HomeLongfor from './c-cpns/home-longfor'
import HomeSectionV3 from './c-cpns/home-section-v3'

const Home = memo(() => {
  /* 从redux中获取数据 */
  const { goodPriceInfo, highScoreInfo, discountInfo, recommendInfo, longforInfo, plusInfo } = useSelector((state) => ({
    goodPriceInfo: state.home.goodPriceInfo,
    highScoreInfo: state.home.highScoreInfo,
    discountInfo: state.home.discountInfo,
    recommendInfo: state.home.recommendInfo,
    longforInfo: state.home.longforInfo,
    plusInfo: state.home.plusInfo
  }), shallowEqual)

  /* 派发异步事件: 发起网络请求 */
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHomeDataAction())
  }, [dispatch]) // 这里写[dispatch]和[]的效果是一样的, 因为dispatch是store对象中的一个属性, 这是属性是一个方法, 而这个方法是始终保持不变的, 因为相当于传给useEffect中的函数没有任何依赖的数据。但是不写的就会报警告, 因为传给useEffect中的函数明明使用到了dispatch却说没有依赖dispatch, 因此这就是useEffect的一个小bug。

  return (
    <HomeWrapper>
      <HomeBanner/>
      <div className="content">
        { isEmptyObject(discountInfo) && <HomeSectionV2 infoData={discountInfo}/> }
        { isEmptyObject(recommendInfo) && <HomeSectionV2 infoData={recommendInfo}/> }
        { isEmptyObject(longforInfo) && <HomeLongfor infoData={longforInfo}/> }
        { isEmptyObject(goodPriceInfo) && <HomeSectionV1 infoData={goodPriceInfo}/> }
        { isEmptyObject(highScoreInfo) && <HomeSectionV1 infoData={highScoreInfo}/> }
        { isEmptyObject(plusInfo) && <HomeSectionV3 infoData={plusInfo}/> }
      </div>
    </HomeWrapper>
  )
})

export default Home