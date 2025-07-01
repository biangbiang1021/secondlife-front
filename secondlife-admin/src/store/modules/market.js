const state = {
  productList: [],
  totalProducts: 0,
  categories: [],
  loading: false
}

const mutations = {
  SET_PRODUCT_LIST(state, list) {
    state.productList = list
  },
  SET_TOTAL_PRODUCTS(state, total) {
    state.totalProducts = total
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  // 获取商品列表
  getProductList({ commit }, params) {
    commit('SET_LOADING', true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProducts = [
          {
            id: 1,
            title: 'iPhone 14 Pro Max 256GB 深空黑',
            description: '95成新，无划痕，电池健康度95%，配件齐全',
            price: 6999,
            originalPrice: 9999,
            condition: '95成新',
            images: ['https://via.placeholder.com/300x200'],
            seller: 'user001',
            location: '北京',
            category: 'iPhone',
            status: 'on_sale',
            createTime: '2024-01-15 09:00:00',
            views: 156
          },
          {
            id: 2,
            title: '华为Mate 60 Pro 512GB 雅川青',
            description: '全新未拆封，官方正品，支持验机',
            price: 7999,
            originalPrice: 8999,
            condition: '全新',
            images: ['https://via.placeholder.com/300x200'],
            seller: 'user002',
            location: '上海',
            category: '华为',
            status: 'on_sale',
            createTime: '2024-01-14 14:30:00',
            views: 89
          }
        ]
        commit('SET_PRODUCT_LIST', mockProducts)
        commit('SET_TOTAL_PRODUCTS', mockProducts.length)
        commit('SET_LOADING', false)
        resolve({ list: mockProducts, total: mockProducts.length })
      }, 500)
    })
  },

  // 删除商品
  deleteProduct({ commit }, productId) {
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
          { id: 1, name: 'iPhone', count: 200 },
          { id: 2, name: '华为', count: 150 },
          { id: 3, name: '小米', count: 100 },
          { id: 4, name: 'OPPO', count: 80 },
          { id: 5, name: 'vivo', count: 70 },
          { id: 6, name: '三星', count: 60 },
          { id: 7, name: '其他', count: 50 }
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