const state = {
  adminInfo: JSON.parse(localStorage.getItem('admin_info') || '{}'),
  userList: [],
  totalUsers: 0,
  loading: false
}

const mutations = {
  SET_ADMIN_INFO(state, info) {
    state.adminInfo = info
    localStorage.setItem('admin_info', JSON.stringify(info))
  },
  SET_USER_LIST(state, list) {
    state.userList = list
  },
  SET_TOTAL_USERS(state, total) {
    state.totalUsers = total
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  // 管理员登录
  login({ commit }, loginData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const adminInfo = {
          id: 1,
          username: loginData.username,
          role: 'admin',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }
        commit('SET_ADMIN_INFO', adminInfo)
        localStorage.setItem('admin_token', 'admin_token_' + Date.now())
        resolve(adminInfo)
      }, 500)
    })
  },

  // 退出登录
  logout({ commit }) {
    commit('SET_ADMIN_INFO', {})
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_info')
  },

  // 获取用户列表
  getUserList({ commit }, params) {
    commit('SET_LOADING', true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUsers = [
          {
            id: 1,
            username: 'user001',
            email: 'user001@example.com',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            status: 'active',
            createTime: '2024-01-01 10:00:00',
            lastLoginTime: '2024-01-15 14:30:00'
          },
          {
            id: 2,
            username: 'user002',
            email: 'user002@example.com',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            status: 'inactive',
            createTime: '2024-01-02 11:00:00',
            lastLoginTime: '2024-01-10 09:15:00'
          }
        ]
        commit('SET_USER_LIST', mockUsers)
        commit('SET_TOTAL_USERS', mockUsers.length)
        commit('SET_LOADING', false)
        resolve({ list: mockUsers, total: mockUsers.length })
      }, 500)
    })
  },

  // 删除用户
  deleteUser({ commit }, userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 300)
    })
  }
}

const getters = {
  isLoggedIn: state => !!state.adminInfo.id,
  adminInfo: state => state.adminInfo
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 