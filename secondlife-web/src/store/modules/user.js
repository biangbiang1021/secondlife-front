const state = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  username: localStorage.getItem('username') || '',
  email: localStorage.getItem('email') || '',
  avatar: localStorage.getItem('avatar') || ''
}

const mutations = {
  SET_LOGIN_STATE(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
    localStorage.setItem('isLoggedIn', isLoggedIn)
  },
  SET_USER_INFO(state, userInfo) {
    state.username = userInfo.username
    state.email = userInfo.email
    state.avatar = userInfo.avatar || ''
    localStorage.setItem('username', userInfo.username)
    localStorage.setItem('email', userInfo.email)
    localStorage.setItem('avatar', userInfo.avatar || '')
  },
  CLEAR_USER_INFO(state) {
    state.username = ''
    state.email = ''
    state.avatar = ''
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('avatar')
  }
}

const actions = {
  login({ commit }, userInfo) {
    // 模拟登录API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_LOGIN_STATE', true)
        commit('SET_USER_INFO', userInfo)
        resolve()
      }, 500)
    })
  },
  register({ commit }, userInfo) {
    // 模拟注册API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_LOGIN_STATE', true)
        commit('SET_USER_INFO', userInfo)
        resolve()
      }, 500)
    })
  },
  logout({ commit }) {
    commit('SET_LOGIN_STATE', false)
    commit('CLEAR_USER_INFO')
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  username: state => state.username,
  email: state => state.email,
  avatar: state => state.avatar
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 