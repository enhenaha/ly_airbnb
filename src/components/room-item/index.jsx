import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { ItemWrapper } from './style'
import Rating from '@mui/material/Rating';


const RoomItem = memo((props) => {
  const { itemData, itemWidth = '25%' } = props
  
  return (
    <ItemWrapper 
      verifyColor={itemData?.verify_info.text_color || "39576a"}
      itemWidth={itemWidth}
    >
      <div className="inner">
        <div className="cover">
          <img src={itemData.picture_url} alt="" />
        </div>
        <div className="desc">
          { itemData.verify_info.messages.join("·") }
        </div>
        <div className="name">{itemData.name}</div>
        <div className="price">￥{itemData.price}/晚</div>
        <div className="bottom">
          <Rating 
            value={itemData.star_rating ?? 3.5} // 几颗星
            readOnly // 星星只读,不可交互
            precision={0.1} // 星星显示的精度, 根据value属性的属性值变化。即一个星星分成10种显示程度。
            sx={{ fontSize: "12px", color: '#00848A' }} // 星星样式
          />
          <span className='count'>{itemData.reviews_count}</span>
          {
            itemData.bottom_info && <span className="extra">·{itemData.bottom_info?.content}</span>
          }
        </div>
      </div>
    </ItemWrapper>
  )
})

RoomItem.propTypes = {
  itemData: PropTypes.object
}

export default RoomItem