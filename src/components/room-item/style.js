import styled from 'styled-components'

export const ItemWrapper = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  width: ${props => props.itemWidth};
  padding: 8px;

  .inner {
    width: 100%;
  }

  .cover {
    position: relative;
    box-sizing: border-box;
    padding-top: 66.66%; // padding的百分比是相对于父元素的宽度width的。
    border-radius: 3px;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .desc {
    margin: 10px 0 5px;
    font-size: 12px;
    font-weight: 700;
    color: ${props => props.verifyColor};
  }

  .name {
    font-size: 16px;
    font-weight: 700;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    margin: 8px 0;
  }

  .bottom {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.text.primaryColor};

    .count {
      margin: 0 2px 0 4px;
    }

    .MuiRating-icon { // 这是给Rating组件中的类名为MuiRating-icon的元素设置的css样式, 注意: 在一个组件中使用另外一个组件时, 可以直接给该组件设置css样式。 也就是父组件可以直接给子组件设置css样式, 这个在styled-components中是允许的。(在这里是RoomItem组件中使用Rating组件, 但是在RoomItem组件中设置Rating组件的css样式)
      margin-right: -2px;
    }
  }
`