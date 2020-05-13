import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 5,
  administrator:'',
  user:'',
}
const mutations = {
  increment (state) {
    state.count++
  },
  add10(state){
    state.count=state.count+10
  },

  setAdministrator(state,willSetMsg){
    state.administrator=willSetMsg
  },

  setUser(state,willSetMsg){
    state.user=willSetMsg
  },

}
const actions = {
  increment (context) {
    context.commit('increment')
  },
  add10 (context) {
    context.commit('add10')
  },
}
const getters={

       getAdministrator(state){
         return state.administrator;
       },

}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
})

