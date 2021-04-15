import Vue from 'vue'
import Vuex from 'vuex'
import bhxh from './modules/bhxh'

Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    modules: {
      bhxh
    }
  })
}
export default createStore
