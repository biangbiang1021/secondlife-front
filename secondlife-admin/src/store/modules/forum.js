const state = {
  postList: [],
  totalPosts: 0,
  categories: [],
  loading: false
}

const mutations = {
  SET_POST_LIST(state, list) {
    state.postList = list
  },
  SET_TOTAL_POSTS(state, total) {
    state.totalPosts = total
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  // 获取帖子列表
  getPostList({ commit }, params) {
    commit('SET_LOADING', true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPosts = [
          {
            id: 1,
            title: 'iPhone 14 Pro Max 使用体验分享',
            content: '最近入手了iPhone 14 Pro Max，分享一下使用体验...',
            author: 'user001',
            category: 'iPhone',
            views: 1250,
            replies: 45,
            status: 'published',
            createTime: '2024-01-15 10:30:00'
          },
          {
            id: 2,
            title: '华为Mate 60 Pro 值得购买吗？',
            content: '想了解一下华为Mate 60 Pro的性能和体验...',
            author: 'user002',
            category: '华为',
            views: 890,
            replies: 23,
            status: 'published',
            createTime: '2024-01-14 15:20:00'
          }
        ]
        commit('SET_POST_LIST', mockPosts)
        commit('SET_TOTAL_POSTS', mockPosts.length)
        commit('SET_LOADING', false)
        resolve({ list: mockPosts, total: mockPosts.length })
      }, 500)
    })
  },

  // 删除帖子
  deletePost({ commit }, postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 300)
    })
  },

  // 获取分类列表
  getCategories({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = [
          { id: 1, name: 'iPhone', count: 150 },
          { id: 2, name: '华为', count: 120 },
          { id: 3, name: '小米', count: 80 },
          { id: 4, name: 'OPPO', count: 60 },
          { id: 5, name: 'vivo', count: 50 },
          { id: 6, name: '三星', count: 40 },
          { id: 7, name: '其他', count: 30 }
        ]
        commit('SET_CATEGORIES', categories)
        resolve(categories)
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