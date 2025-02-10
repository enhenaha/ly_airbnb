import React, { memo, useEffect } from 'react'
import { EntireWrapper } from './style'
import EntireFilter from './c-cpns/entire-filter'
import EntireRooms from './c-cpns/entire-rooms'
import EntirePagination from './c-cpns/entire-pagination'
import { useDispatch } from 'react-redux'
import { fetchRoomListAction } from '@/store/modules/entire/actionCreators'
import { changeHeaderConfigAction } from '@/store/modules/main'
import AppHeader from '@/components/app-header'

const Entire = memo(() => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRoomListAction())
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: false }))
  }, [dispatch]) // 第二个参数数组里面不写dispatch会报警告(因为传给useEffect的回调函数中使用到了这个数据, 这就是useEffect报警告的机制, 使用到了某个数据就应该在第二个参数数组中写上), 但是写dispatch和不写其实是一样的, 因为dispatch方法始终是不会变化的。因此不会使得传给useEffect的回调函数重新调用。因此第二个参数数组中写dispatch的作用仅仅是为了消除警告。

  return (
    <EntireWrapper>
      <AppHeader/>
      <EntireFilter/>
      <EntireRooms/>
      <EntirePagination/>
    </EntireWrapper>
  )
})

export default Entire