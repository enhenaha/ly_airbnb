import styled from 'styled-components'

export const HomeWrapper = styled.div`
  > .content { // 意思是HomeWrapper对应的div元素的直接子元素, 也就是儿子元素content设置如下样式。
    width: 1032px;
    margin: 0 auto;

    > div {
      margin-top: 50px;
    }
  }
`