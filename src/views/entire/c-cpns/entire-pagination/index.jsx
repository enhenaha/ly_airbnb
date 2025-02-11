import React, { memo } from 'react'
import { PaginationWrapper } from './styled'
import Pagination from '@mui/material/Pagination';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchRoomListAction } from '@/store/modules/entire/actionCreators';

const EntirePagination = memo(() => {
  const { totalCount, currentPage, roomList } = useSelector(state => ({
    totalCount: state.entire.totalCount,
    currentPage: state.entire.currentPage,
    roomList: state.entire.roomList
  }), shallowEqual)
  const totalPage = Math.ceil(totalCount / 20)
  const startCount = currentPage * 20 + 1
  const endCount = (currentPage + 1) * 20

  /* 事件处理的逻辑 */
  const dispatch = useDispatch()
  function pageChangeHandle(event, pageCount) {

    if (currentPage !== pageCount - 1) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      dispatch(fetchRoomListAction(pageCount - 1))
    }
    
  }

  return (
    <PaginationWrapper>
      {
        !!roomList.length && (
          <div className="info">
            <Pagination count={totalPage} onChange={pageChangeHandle}/>
            <div className="desc">
              第 {startCount} - {endCount} 个房源, 共超过 {totalCount} 个房源
            </div>
          </div>
        )
      }
    </PaginationWrapper>
  )
})

export default EntirePagination