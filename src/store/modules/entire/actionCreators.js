import { getEntireRoomList } from '@/services'
import * as actionTypes from './constants'

export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage
})

export const changeRoomListAction = (roomList) => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList
})

export const changeTotalCountAction = (totalCount) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  totalCount
})

export const changeIsLoadingAction = (isLoading) => ({
  type: actionTypes.CHANGE_IS_LOADING,
  isLoading
})

export const fetchRoomListAction = (page = 0) => {
  return async (dispatch, getState) => {
    // 0、修改currentPage
    dispatch(changeCurrentPageAction(page))

    // 1、根据页码获取最新的数据
    // const currentPage = getState().entire.currentPage // 获取currentPage
    dispatch(changeIsLoadingAction(true)) // 开启蒙版
    const res = await getEntireRoomList(page * 20) // 发送网络请求
    dispatch(changeIsLoadingAction(false)) // 关闭蒙版

    // 2、获取到最新的数据, 保存在redux的store中
    const roomList = res.list
    const totalCount = res.totalCount
    dispatch(changeRoomListAction(roomList))
    dispatch(changeTotalCountAction(totalCount))
  }
}