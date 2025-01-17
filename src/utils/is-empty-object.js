export function isEmptyObject(obj) {
  return !!Object.keys(obj).length 
  // 如果obj是一个空对象, 那么 "Object.keys(obj).length" 得到就是0, 然后 "!!0"得到的就是false。
}