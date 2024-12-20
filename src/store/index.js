import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './modules/home'
import entireReducer from './modules/entire'

const store = configureStore({
  reducer: {
    home: homeReducer,
    entire: entireReducer
  }
})

export default store

/* 
homeReducer是从 '@reduxjs/toolkit'包中导入的createSlice函数被调用后返回的slice对象的reduce属性。 而entireReducer是原生redux中的reducer函数。 因此可知其实调用createSlice函数返回的slice对象中的reducer属性就等于之前原生的reducer函数。

*/