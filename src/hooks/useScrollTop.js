import { useEffect } from "react"
import { useLocation } from "react-router-dom"


export default function useScrollTop() { // 由于这里是用use开头的自定义函数, 因此才可以使用react的hook, 如果不是以use开头, 则自定义函数不可以使用react的hook。
  /* 页面发生切换时, 默认停留在页面的最顶部 */
  // 有时候切换页面时, 不一定会在页面的顶部。所以需要移动回顶部
  const location = useLocation() // 从react-router-dom包中导入useLocation这个hook, 调用该hook会返回一个location对象, 该对象中的pathname属性中保存当前页面的url对应的path路径。(当页面切换时, 即url的path改变时, location.pathname属性的属性值也会发生改变)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname]) // 由于location.pathname属性的属性值会随着页面的切换发生改变, 则可以用于useEffect的第二个参数, 则当location.pathname改变时会重新调用传给useEffect的回调函数参数。
}