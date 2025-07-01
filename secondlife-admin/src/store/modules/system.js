const state = {
  systemInfo: {
    version: '1.0.0',
    uptime: '15天',
    memory: '2.5GB',
    disk: '45GB'
  },
  systemLogs: [],
  settings: {
    siteName: '二手手机论坛',
    siteDescription: '专业的二手手机交易平台',
    allowRegistration: true,
    requireEmailVerification: false,
    maxUploadSize: 5
  }
}

const mutations = {
  SET_SYSTEM_INFO(state, info) {
    state.systemInfo = info
  },
  SET_SYSTEM_LOGS(state, logs) {
    state.systemLogs = logs
  },
  SET_SETTINGS(state, settings) {
    state.settings = settings
  }
}

const actions = {
  // 获取系统信息
  getSystemInfo({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const systemInfo = {
          version: '1.0.0',
          uptime: '15天',
          memory: '2.5GB',
          disk: '45GB',
          cpu: '15%',
          network: '1.2MB/s'
        }
        commit('SET_SYSTEM_INFO', systemInfo)
        resolve(systemInfo)
      }, 300)
    })
  },

  // 获取系统日志
  getSystemLogs({ commit }, params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const logs = [
          {
            id: 1,
            level: 'info',
            message: '系统启动成功',
            timestamp: '2024-01-15 10:00:00',
            user: 'system'
          },
          {
            id: 2,
            level: 'warning',
            message: '磁盘空间使用率超过80%',
            timestamp: '2024-01-15 09:30:00',
            user: 'system'
          },
          {
            id: 3,
            level: 'error',
            message: '数据库连接失败',
            timestamp: '2024-01-15 09:00:00',
            user: 'system'
          }
        ]
        commit('SET_SYSTEM_LOGS', logs)
        resolve(logs)
      }, 300)
    })
  },

  // 更新系统设置
  updateSettings({ commit }, settings) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_SETTINGS', settings)
        resolve({ success: true })
      }, 300)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 