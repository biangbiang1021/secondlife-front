import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import forum from './modules/forum'
import market from './modules/market'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    forum,
    market
  }
}) 