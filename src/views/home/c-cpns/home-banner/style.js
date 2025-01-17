import styled from 'styled-components'
import coverImg from '@/assets/img/cover_01.jpeg'

export const BannerWrapper = styled.div`
  height: 529px;

  /* 错误的引入图片的方式 */
  /* background-image: url('../../../../assets/img/cover_01.jpeg'); */
  /* 如果一个项目是通过webpack打包的, 那么在设置背景图片时、在给img标签上的src属性值时, 都不能通过上述这种方式引入图片 */

  /* 正确的做法一: 
  ①、先将图片导入(之前说过: json文件、图片资源, 在webpack认为都是默认导出的, 因此只需采用默认导入的方式导入json文件或图片资源即可) 
  ②、然后在img标签的src属性的属性值使用默认导入的内容。 如果设置背景图片则是通过 'url(导入的内容)' 这种方式设置背景图片的。
  */
  /* background-image: url(${coverImg}); // 由于当前处于函数调用中, 也就是模板字符串中, 因此得通过'模板字符串中使用变量'的方式使用coverImg变量。 */
  

  /* 正确的做法二:
  使用node的模块化中的require函数, 通过require('路径')的方式引入。
   */
  background: url(${require('@/assets/img/banner.png')}) center/cover; // 这里需要用到 '模板字符串中使用变量'的语法, 不然无法在模板字符串中使用js语法。

  /* 上述错误的引入图片的方式存在的原因是当前项目是通过webpack打包的, 如果不是webpack, 则可能不需要使用这里的正确做法一、二。
  也就是说这是webpack打包工具的特性, 在别的打包工具中, 可能上述错误的做法就是正确的做法。 */
`