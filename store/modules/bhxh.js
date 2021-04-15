export const state = () => ({
    bhxhs: [],
    enterprises: []

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

  }
  // mutation
  const mutations = {
    setBhxhs: (state, payload) => {
      state.bhxhs = payload.data
    },
    setE: (state, payload) => {
      state.enterprises = payload.data
    }
  }
  // action
  const actions = {
    getBhxhs(context, payload) {
        context.commit('setBhxhs', payload)
    },
    getE(context, payload) {
      context.commit('setE', payload)
  }
  }
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }