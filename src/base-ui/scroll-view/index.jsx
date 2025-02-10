import PropTypes from "prop-types";
import React, { memo, useEffect, useRef, useState } from "react";
import { ViewWrapper } from "./style";
import IconArrowLeft from "@/assets/svg/icon-arrow-left";
import IconArrowRight from "@/assets/svg/icon-arrow-right";

const ScrollView = memo((props) => {
  const { topValue = "50%" } = props;

  /* 定义内部的状态 */
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [posIndex, setPosIndex] = useState(0);
  const totalDistanceRef = useRef();

  /* 组件渲染完毕, 判断是否显示右侧的按钮 */
  const scrollContentRef = useRef();
  useEffect(() => {
    const scrollWidth = scrollContentRef.current.scrollWidth; // scrollWidth: 一共可滚动的宽度(注意是: 本身宽度 + 可以拉动的宽度。 可以理解为scroll + width, 即可拉动宽度 + 自身宽度)。
    const clientWidth = scrollContentRef.current.clientWidth; // clientWidth: 本身占据的宽度(即客户端可以看到的宽度, 不包括看不见的滚动区域)
    const totalDistance = scrollWidth - clientWidth; // 得到 "可以拉动的宽度"
    // console.log(scrollWidth, clientWidth, totalDistance)
    // totalDistanceRef.current = totalDistance  // 保存可以 "拉动的宽度"
    setShowRight(totalDistance > 0);
  }, []);

  /* 事件处理的逻辑 */
  function controlClickHandle(isRight) {
    const newIndex = isRight ? posIndex + 1 : posIndex - 1;
    const newEl = scrollContentRef.current.children[newIndex];
    const newOffsetLeft = newEl.offsetLeft;
    scrollContentRef.current.style.transform = `translate(-${newOffsetLeft}px)`;
    setPosIndex(newIndex);
    // 是否显示左右两侧按钮1
    // console.log(totalDistanceRef.current, newOffsetLeft, 'ceshi')
    totalDistanceRef.current =
      scrollContentRef.current.scrollWidth -
      scrollContentRef.current.clientWidth; // 不使用之前保存的 "拉动的宽度"而是重新计算, 因为有些数据有点奇怪, 必须重新计算才能获取到正确的 "拉动的宽度"。也就是需要页面打开后等一会才能获取到正确的 "拉动的宽度", 因此点击按钮时在这里重新计算, 那么就一定能获取到正确的 '拉动的宽度'。
    // setShowRight(totalDistanceRef.current > newOffsetLeft) // 使用保存的 "拉动的宽度"
    setShowRight(totalDistanceRef.current > newOffsetLeft);
    setShowLeft(newOffsetLeft > 0);

    // 从上可知, useState这个hook不是每执行到一个 "修改数据的函数"后就立马重新调用当前组件函数, 而是等待一定的时机后一起重新调用当前函数的, 例如当在一个函数中存在多个可以使当前组件重新渲染的useState的 "修改数据的函数", 例如 setPosIndex、setShowRight、setShowLeft 这三个每一个函数执行都可以让当前函数重新被调用, 但是, 不是说一执行到setPosIndex函数后, 就里面重新调用当前组件函数, 那么这样后面的setShowRight、setShowLeft函数都无法执行的, 因为组件函数都重新执行了。react的机制是如果多个useState的 "修改数据的函数"在同一时间同时执行, 例如都在一个函数controlClickHandle中执行, 那么它就会等这个controlClickHandle函数中所有 "修改数据的函数"都执行完了才会重新渲染当前组件。至于这时候组件被渲染一次 还是 一次性渲染三次就不知道了。因此这里是 setPosIndex、setShowRight、setShowLeft这三个函数都执行完后, 当前组件才会重新渲染。
  }

  return (
    <ViewWrapper topValue={topValue}>
      {showLeft && (
        <div
          className="control left"
          onClick={(e) => controlClickHandle(false)}
        >
          <IconArrowLeft />
        </div>
      )}
      {showRight && (
        <div
          className="control right"
          onClick={(e) => controlClickHandle(true)}
        >
          <IconArrowRight />
        </div>
      )}
      <div className="scroll">
        <div className="scroll-content" ref={scrollContentRef}>
          {props.children}
        </div>
      </div>
    </ViewWrapper>
  );
});

ScrollView.propTypes = {
  topValue: PropTypes.string,
};

export default ScrollView;
