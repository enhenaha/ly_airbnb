import PropTypes from 'prop-types'
import React, { memo, useCallback, useState } from 'react'
import { SectionV2Wrapper } from './style'
import SectionHeader from '@/components/section-header'
import SectionTabs from '@/components/section-tabs'
import SectionRooms from '@/components/section-rooms'
import SectionFooter from '@/components/section-footer'

const HomeSectionV2 = memo((props) => {
  /* 从props中获取数据 */
  const { infoData } = props

  /* 定义内部的state */
  // 1、初始化城市, 错误的做法:
  // const initialName = Object.keys(infoData.dest_list ?? {})[0] ?? ""
  // const [name, setName] = useState(initialName)

  /* 这里的意思是当当前组件被初次渲染时, 首先父组件会传递过来一个infoData(此时由于网络请求还没获取到数据, 因此infoData是一个空对象), 从空对象中获取dest_list属性得到的就是undefined, 而由于又使用了空值合并运算符??, 因此刚开始相当于是 Object.keys(undefined ?? {}), 因此相当于是 Object.keys({})得到的是一个空数组[], 从一个空数组取元素即 [][0]得到的是undefined, 而 undefined ?? ""得到的是 "", 因此最终 initialName常量获取到的是空字符串 ""。 然后将一个空字符串传给useState, 即 useState("")。
  等网络请求获取到数据后, 当前组件的父组件会被重新渲染, 所以传递过来的infoData数据发生变化, 而infoData数据发生变化则会导致当前组件被重新渲染(从scu优化原理可知), 即第二次渲染。这次渲染时infoData就不是一个空对象了, 那么 Object.keys(infoData.dest_list ?? {})[0] ?? "" 最终返回的就是 "佛山", 因此initialName中保存的就是 "佛山", 然后将 "佛山"传给useState, 即 useState("佛山")。
  但是这里出现了一个问题, 之前说过, 对于useState这个hook而言, 例如 const [num, setNum] = useState("初始化数据"), 第一次调用它时, 传给它的数据会当成是初始化数据, 而后面都是通过调用useState函数返回的数组中的第二个元素, 即"修改数据用的函数"在这里是setNum函数来数修改useState中的数据的。
  通过调用setNum函数会导致当前组件被重新渲染从而更新useState的数据。 也就是说, 除了第一次调用useState时传入的初始化数据是有用的, 后面组件再次被渲染, 你再传给useState函数数据已经没用了, 不管你传什么给它都相当于白传。 必须通过 "修改数据用的函数"即setNum函数才能给useState函数传递数据。 因此当发送网络请求获取到数据后, 再给useState传递 "佛山"这个数据已经没用了。
  */ 

  // 2、初始化城市, 正确的做法: 
  // 在父组件中做判断, 当网络请求还没有获取到数据时, 直接不渲染当前组件。
  const initialName = Object.keys(infoData.dest_list)[0] // 因为在父组件中做了判断, 所以当当前组件被渲染时代表网络请求一定获取数据了, 所以这里不用做复杂的 ?.判断或 ??判断了。
  // (也就是说当当前组件被渲染时, 父组件已经渲染了两次了。 第一次是刚打开页面网络请求还没有获取到数据时, 只有父组件被渲染当前组件没有被渲染。 第二次是网络请求获取到数据时, 此时不仅父组件会被渲染当前组件也会被渲染。所以说这种做法在一定程度上是优化了性能的)
  const [name, setName] = useState(initialName) // 这里第一次传给useState("佛山")时就是"佛山", 因为只有网络请求获取到数据后, 才会渲染当前组件, 所以当前组件第一次渲染时initialName这个常量就获取到 "佛山"了。

  // 3、初始化城市, 正确的做法(第二种做法): 
  // 使用 调用useState函数返回的数组中的第二个元素, 即 "修改数据的函数"。
  // useEffect(() => {
  //   setName(Object.keys(infoData.dest_list)[0])
  // }, [infoData])
  // 这种做法的弊端是当前组件会被渲染三次, 第一次是网络请求还没有获取到数据时, 第二次是网络请求获取到数据了, 此时父组件传递过来的infoData数据会发生变化, 所以当前组件会被重新渲染。 而由于useEffect的第二个参数即数组中写了依赖infoData这个数据, 而第二次网络请求获取到数据后和第一次网络请求还没获取到数据相比, 父组件传递过来的infoData数据确实发生了变化, 所以当前组件会在第二次渲染后, 执行传给useEffect函数的回调函数, 而这个回调函数内部又使用了 setName这个函数, 这个函数会导致当前组件再次被渲染(从useState的原理可知), 因此当前组件会总共渲染三次。 因此该方法不推荐。
  // 而且这种做法没有像前面的做法一样纠结第一次调用useState函数时传入的参数是什么, 而是不管第一次传给useState函数的参数是什么都可以, 通过setName来修改useState中的数据。

  
  const tabNames = infoData.dest_address.map(item => item.name)

  /* 事件处理函数 */
  const tabClickHandle = useCallback(function(item, name) {
    setName(name)
  }, [])

  return (
    <SectionV2Wrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
      <SectionTabs tabNames={tabNames} tabClick={tabClickHandle}/>
      <SectionRooms roomList={infoData.dest_list[name]} itemWidth="33.33%"/>
      <SectionFooter name={name}/>
    </SectionV2Wrapper>
  )
})

HomeSectionV2.propTypes = {
  infoData: PropTypes.object
}

export default HomeSectionV2