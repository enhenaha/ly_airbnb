import styled from 'styled-components'

export const ViewWrapper = styled.div`
  position: relative;
  padding: 8px 0;

  .scroll {
    overflow: hidden;

    .scroll-content {
      display: flex;
      transition: transform 250ms ease;
    }
  }

  .control {
    position: absolute;
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-sizing: content-box;
    text-align: center;
    border: 2px solid #fff;
    background-color: #fff;
    box-shadow: 0px 1px 1px 1px rgba(0,0,0,.14);
    cursor: pointer;

    &.left {
      left: 0;
      top: ${props => props.topValue};
      transform: translate(-50%, -50%);
    }

    &.right {
      right: 0;
      top: ${props => props.topValue};
      transform: translate(50%, -50%);
    }
  }
`