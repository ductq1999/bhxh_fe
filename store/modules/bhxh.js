export const state = () => ({
  bhxhs: [],
  enterprises: [],
  citizens: []
})
// getter
const getters = {
  getAll: (state) => {
    let result = [];
    state.bhxhs.filter((item) => {
      result.push(item)
    })
    return result
  },
  getAllE: (state) => {
    let result = [];
    state.enterprises.filter((item) => {
      result.push(item)
    })
    return result
  },
  getAllC: (state) => {
    let result = [];
    state.citizens.filter((item) => {
      result.push(item)
    })
    return result
  },

}
// mutation
const mutations = {
  setBhxhs: (state, payload) => {
    state.bhxhs = payload.data
  },
  setE: (state, payload) => {
    state.enterprises = payload.data
  },
  setC: (state, payload) => {
    state.citizens = payload.data
  }
}
// action
const actions = {
  getBhxhs(context, payload) {
    context.commit('setBhxhs', payload)
  },
  getE(context, payload) {
    context.commit('setE', payload)
  },
  getC(context, payload) {
    context.commit('setC', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}