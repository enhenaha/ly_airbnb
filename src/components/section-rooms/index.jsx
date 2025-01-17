import PropTypes from 'prop-types'
import React, { memo } from 'react'
import RoomItem from '../room-item'
import { RoomsWrapper } from './style'

const SectionRooms = memo((props) => {
  const { roomList = [], itemWidth } = props

  return (
    <RoomsWrapper>
      {
        roomList.slice(0, 8)?.map(item => {
          return <RoomItem itemData={item} key={item.id} itemWidth={itemWidth}/>
          // jsx中使用循环时, key不仅可以绑定到某一个html元素上, 还可以绑定到自定义组件上, 因此可知, key可以绑定的React元素上(React元素就是 html元素 或 自定义组件)。
        })
      }
    </RoomsWrapper>
  )
})

SectionRooms.propTypes = {
  roomList: PropTypes.array
}

export default SectionRooms