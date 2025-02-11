import styled from 'styled-components'

export const LeftWrapper = styled.div`
  color: ${props => props.theme.isAlpha ? '#fff': props.theme.color.primaryColor};


  flex: 1;
  display: flex;
  align-items: center;
  
  .logo {
    margin-left: 24px;
    cursor: pointer;
  }
`