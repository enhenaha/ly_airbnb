import React, { memo, useEffect, useState } from 'react'
import { RightWrapper } from './style'
import IconGlobal from '@/assets/svg/icon_global'
import IconMenu from '@/assets/svg/icon_menu'
import IconAvatar from '@/assets/svg/icon_avatar'

const HeaderRight = memo(() => {
  /* 定义组件内部的状态 */
  const [ showPanel, setShowPanel ] = useState(false)
  // console.log('1')

  /* 副作用代码 */
  useEffect(() => {
    
    function windowHandleClick() {
      // console.log('2')
      setShowPanel(false)
    }

    window.addEventListener('click', windowHandleClick, true) // 第二个参数true代表开启事件捕获。

    return () => {
      window.removeEventListener('click', windowHandleClick, true) // 取消监听的时候加不加第三个参数true都可以。
    }
  }, [])

  /* 事件处理函数 */
  function profileClickHandle() {
    // console.log('3')
    setShowPanel(true)
  }
  function ceshi() {
    // console.log('4')
  }

  return (
    <RightWrapper>
      <div className="btns">
        <span className='btn'>登录</span>
        <span className='btn'>注册</span>
        <span className='btn'>
          <IconGlobal/>
        </span>
      </div>

      <div className="profile" onClick={profileClickHandle}>
        <IconMenu/>
        <IconAvatar/>

        { showPanel && ( // 这个括号的作用只是为了说明括号中的内容是一个整体。
        <div className="panel" >
          <div className="top">
            <div className="item register">注册</div>
            <div className="item login" onClick={ceshi}>登录</div>
          </div>
          <div className="bottom">
            <div className='item'>出租房源</div>
            <div className='item'>开展体验</div>
            <div className='item'>帮助</div>
          </div>
        </div>
        ) }
      </div>
    </RightWrapper>
  )
})

export default HeaderRight


/* 
事件传递的阶段分为: 事件捕获、目标阶段、事件冒泡 这三个阶段。

当前组件在首次渲染和点击profile元素时, '登录'元素时的打印情况解释。
1、首先由于App根组件中使用了useRoutes, 这个hook会导致使用了该hook的组件以及它的所有后代组件在首次渲染时渲染两次 (在后续更新时和之前一样只渲染一次, 就是首次渲染时有点神经)。 而由于App组件是项目的根组件, 因此整个项目所有的组件都会在首次渲染时执行两次。 所以当打开页面, 当前组件会打印两个1
2、当点击profile时, 由于window的点击事件开启了事件捕获, 因此window的点击事件函数最先执行, 因此打印2。这时候执行代码 "setShowPanel(false)", 但是由于showPanel数据本身就是false, 之前说过使用useState的修改数据的函数setShowPanel时, 修改前后数据保持一致是不会导致组件重新渲染的, 即相当于没有执行 "setShowPanel(false)"代码, 即这行代码相当于没写。
然后到了目标节点, 即profile点击事件的事件函数执行, 因此打印3。然后执行 "setShowPanel(true)", 这会导致组件重新渲染, 因此打印 1
所以打印顺序就是 2、3、1, 此时showPanel变为true, 所以panel元素及其子元素就显示出来了。
3、 当点击'登录'元素时, 本来应该执行'登录'元素对应的点击事件函数, 但是还是由于window的点击事件开启了事件捕获, 因此window的点击事件函数最先执行, 因此打印2。这时候执行代码 "setShowPanel(false)", 由于showPanel数据现在是true, 所以setShowPanel函数可以修改成功useState中的数据, 而useState数据是通过重新渲染当前组件来达到更新数据的。 而且当组件重新渲染时, 事件传递阶段会被直接打断(但是前提是本次组件重新渲染是数据发生变化, 之前说过对于使用useState的修改数据的函数时, 就算数据没有发生变化也可能导致组件重新渲染, 例如 2->6, 6->6, 对于第二次使用useState修改数据的函数时, 6->6也会导致组件重新渲染, 但是此时没有修改数据, 因此即使组件重新渲染了也不会打断事件的传递阶段。即此时等组件重新渲染完会继续执行事件传递阶段中没有执行完的点击事件函数), 还未执行的函数也不会再执行, 因为window的点击事件函数处于事件捕获阶段, 因此在捕获阶段就使得当前组件重新渲染了, 那么目标阶段、事件冒泡阶段对应的事件函数都直接被打断了不会执行了。也就是说panel元素、'登录'元素这两个元素对应的点击事件函数都被打断了因此直接不执行了。
所以打印顺序就是 2、1, 此时showPanel变为false, 所以panel元素及其子元素就会隐藏了。
4、当再次点击profile时, 由于window的点击事件开启了事件捕获, 因此window的点击事件函数最先执行, 因此打印2。这时候执行代码 "setShowPanel(false)", 但是由于showPanel数据本身就是false, 即 false -> false, 本来组件是不会重新渲染的, 但是由于前一次组件重新渲染是因为true->false, 现在才是false->false, 所以组件会重新渲染。 也就是说如果一开始就是false, 那么false->false组件是不会渲染的, 但是一开始是true, 即true->false, 然后再点击按钮, 这时候是虽然是false->false, 但是组件会重新渲染。 这次的重新渲染是不会导致打断事件的传递阶段的。也就是说对于没有修改数据又导致组件重新渲染的那一次渲染 是不会打断事件的传递阶段的。因此打印完2后组件重新渲染打印1, 然后组件渲染完了会接着执行事件传递阶段中还没有执行完的事件函数。因此会来到profile的点击事件函数, 所以会打印3, 然后执行 "setShowPanel(true)", 这会导致组件重新渲染, 因此打印 1。
因此执行顺序就是 2、1、3、1, 此时showPanel变为true, 所以panel元素及其子元素就显示出来了。
5、然后当再次点击 "登录"元素时, 又执行第3步。
因此综上可知, 对于 '登录'元素上的点击事件函数根本没机会被执行。因为window的点击事件函数会在它之前执行, 然后让当前组件重新渲染从而打断 '登录'元素上的点击事件函数的执行。

*/