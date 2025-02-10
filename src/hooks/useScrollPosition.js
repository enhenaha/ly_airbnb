import { useEffect, useState } from "react";
import { throttle } from "underscore";

export default function useScrollPosition() {
  // 记录位置
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)
 
  // 监听window滚动
  useEffect(() => {
    const handleScroll = throttle(function() {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }, 100)
    // 节流库underscore的使用: 先从该库中导入throttle函数, 调用该函数时传入一个需要节流执行的回调函数, 并传入第二个参数时间。 则回调函数会遵循该时间进行节流执行。

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 返回
  return {
    scrollX,
    scrollY
  }
}


/* 
对于自定义hook来说, 当一个组件使用了自定义hook, 那么最终效果就相对于将自定义hook中的代码都放到了该组件中, 这是react内部自己操作的, 所以说自定义hook比一般的自定义函数比较特殊的原因。
例如: 在自定义hook中使用到了useState中修改数据的函数, 那么当调用该函数时, 当前组件就会被重新渲染, 但是此时处于自定义hook中而不是一个组件函数中, 那么该重新渲染谁呢? 
由于react默认会将写在自定义hook中的代码都放到使用该自定义hook的组件中(只是效果上是这样, 但实际上可能还是有点区别的, 不可能真的将代码放过去), 因此最终被重新渲染的就是使用该自定义hook的组件函数。 (这就是自定义hook的特殊性, 记住即可)
*/