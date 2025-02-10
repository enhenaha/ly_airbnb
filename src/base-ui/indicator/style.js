import styled from 'styled-components'

export const IndicatorWrapper = styled.div`
  overflow: hidden;

  .i-content {
    position: relative; // 设置这个css属性是为了计算offsetLeft
    display: flex;
    transition: transform 200ms ease;
  }
`