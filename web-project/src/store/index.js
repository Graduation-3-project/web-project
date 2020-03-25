import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
number:1
}
const mutations = {
numadd(state){
  return state.number++;
}
}
const actions = {

}
const getters={

}



//

export default new Vuex.Store({
  state,
  actions,
  mutations,
})

