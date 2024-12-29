import styled from 'styled-components'

const boxShadow = `
  transition: box-shadow 200ms ease;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .18);
  }
`

export const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${props => props.theme.text.primaryColor};
  font-weight: 600;

  .btns {
    display: flex;

    .btn {
      height: 18px;
      line-height: 18px;
      padding: 12px 15px;
      border-radius: 22px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  .profile {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 77px;
    height: 42px;
    margin-right: 24px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 25px;
    background-color: #fff;
    color: ${props => props.theme.text.primaryColor}; // 用于设置右上角的 '三条横杠'和'用户头像'的颜色。
    cursor: pointer;

    /* 写法一: 直接将css样式写到这里 */
    /* transition: box-shadow 200ms ease;
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .18); // 分别是: x轴偏移, y轴偏移, 扩散, 延申。
    } */

    /* 写法二: 将css样式抽取到外边, 写成字符串形式, 然后在这里通过 '模板字符串中使用变量'的方式 引入。
    (至于为什么是字符串的形式? 从内联css就可以看出来了, 例如: <div style="color: red;"></div>, 这里的 'color:red' 整体都是字符串, 因此可以说, css代码在js中就是字符串表示的)
    */
    /* ${boxShadow} */

    /* 写法三: 使用 '模板字符串中使用函数' 的方式。 对于styled-components来说, 通过模板字符串调用对应的函数时, 如果在模板字符串中使用函数, 那么这个函数会被自动调用。因此可以写成如下: */
    ${props => props.theme.mixin.boxShadow}

    .panel {
      position: absolute;
      top: 54px;
      right: 0;
      width: 240px;
      background-color: #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, .2);
      color: #666;

      .top, .bottom {
        padding: 10px 0;

        .item {
          height: 40px;
          line-height: 40px;
          padding: 0 16px;

          &:hover {
            background-color: #f5f5f5;
          }
        }
      }

      .top {
        border: 1px solid #ddd;
      }
    }
  }
`