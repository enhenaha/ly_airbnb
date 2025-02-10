import styled from 'styled-components'

export const LeftWrapper = styled.div`
  /* color: red; // 这里设置什么颜色, 则svg图片就会显示什么颜色。 因为svg有一个特性就是: svg会使用离它最近的父元素的color作为自己的color。(假如离它最近的父元素没有设置color, 但是从祖先元素中继承了color颜色, 那么svg就会使用这个继承的颜色, 也就是遵循就近原则) */
  /* color: var(--primary-color); */

  color: ${props => props.theme.isAlpha ? '#fff': props.theme.color.primaryColor};


  flex: 1;
  display: flex;
  align-items: center;
  
  .logo {
    margin-left: 24px;
    cursor: pointer;
  }
`