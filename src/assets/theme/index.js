const theme = {
  color: {
    primaryColor: "#ff385c", // 红色
    secondaryColor: '#00848A' // 绿色
  },
  text: {
    primaryColor: '#484848', // 浅黑
    secondaryColor: '#222' // 深黑
  },
  mixin: {
    boxShadow: `
      transition: box-shadow 200ms ease;
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .18);
      }
    `
  }
}

export default theme