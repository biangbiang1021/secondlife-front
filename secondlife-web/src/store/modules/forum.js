const state = {
  posts: [
    {
      id: 1,
      title: 'iPhone 14 Pro Max 使用体验分享',
      author: '手机达人',
      content: '最近入手了一台iPhone 14 Pro Max，分享一下使用体验...',
      category: 'iPhone',
      views: 1250,
      replies: 45,
      createTime: '2024-01-15',
      tags: ['iPhone', '体验分享']
    },
    {
      id: 2,
      title: '华为Mate 60 Pro值得购买吗？',
      author: '科技爱好者',
      content: '华为Mate 60 Pro发布后，很多朋友都在问是否值得购买...',
      category: '华为',
      views: 890,
      replies: 32,
      createTime: '2024-01-14',
      tags: ['华为', '购买建议']
    },
    {
      id: 3,
      title: '小米14 Ultra拍照效果如何？',
      author: '摄影爱好者',
      content: '作为摄影爱好者，对小米14 Ultra的拍照功能很感兴趣...',
      category: '小米',
      views: 756,
      replies: 28,
      createTime: '2024-01-13',
      tags: ['小米', '摄影']
    }
  ],
  categories: ['iPhone', '华为', '小米', 'OPPO', 'vivo', '三星', '其他']
}

const mutations = {
  ADD_POST(state, post) {
    state.posts.unshift({
      ...post,
      id: Date.now(),
      views: 0,
      replies: 0,
      createTime: new Date().toISOString().split('T')[0]
    })
  },
  UPDATE_POST(state, { id, updates }) {
    const index = state.posts.findIndex(post => post.id === id)
    if (index !== -1) {
      state.posts[index] = { ...state.posts[index], ...updates }
    }
  },
  DELETE_POST(state, id) {
    state.posts = state.posts.filter(post => post.id !== id)
  }
}

const actions = {
  createPost({ commit }, post) {
    commit('ADD_POST', post)
  },
  updatePost({ commit }, payload) {
    commit('UPDATE_POST', payload)
  },
  deletePost({ commit }, id) {
    commit('DELETE_POST', id)
  }
}

const getters = {
  allPosts: state => state.posts,
  postsByCategory: state => category => state.posts.filter(post => post.category === category),
  categories: state => state.categories
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 