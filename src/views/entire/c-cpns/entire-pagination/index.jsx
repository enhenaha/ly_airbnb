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
  const totalPage = Math.ceil(totalCount / 20) // 例如 305条数据, 305/20=15.x, 因此超过15, 应该算16页, 所以只需要通过Math.ceil()向上取整即可。
  const startCount = currentPage * 20 + 1
  const endCount = (currentPage + 1) * 20

  /* 事件处理的逻辑 */
  const dispatch = useDispatch()
  function pageChangeHandle(event, pageCount) { // MUI组件库的Pagination组件自带一个onChange事件, 当某一个分页被点击时, 会自动调用对应的函数, 并传入两个参数, 一个是此次事件的信息event, 一个是当前被点击的分页页数pageCount

    if (currentPage !== pageCount - 1) { // 只有当用户点击的页数和当前页数不一样时, 才执行下面的操作
      
      // 每次点击分页时滚动到顶部
      // window.scrollTo(0, 0)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // 设置平滑滚动。
      })

      // 更新最新的页面
      // dispatch(changeCurrentPageAction(pageCount - 1))
    
      dispatch(fetchRoomListAction(pageCount - 1))
    }
    
  }

  return (
    <PaginationWrapper>
      {
        // 当roomList中没有元素时, roomList.length得到的结果就是0, 在react中0是会展示出来的, 因此得通过 !! 转为布尔类型, 布尔类型在页面中是不会展示的。
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