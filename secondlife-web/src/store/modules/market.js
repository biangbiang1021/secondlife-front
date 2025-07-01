const state = {
  products: [
    {
      id: 1,
      title: 'iPhone 13 Pro 256GB 深空灰',
      price: 5999,
      originalPrice: 8999,
      condition: '9成新',
      description: '去年购买的iPhone 13 Pro，使用一年，无维修，电池健康度90%',
      images: ['https://via.placeholder.com/300x200?text=iPhone+13+Pro'],
      seller: '诚信卖家',
      location: '北京',
      createTime: '2024-01-15',
      category: 'iPhone',
      tags: ['iPhone', '256GB', '深空灰']
    },
    {
      id: 2,
      title: '华为P50 Pro 8+256GB 曜金黑',
      price: 3999,
      originalPrice: 6488,
      condition: '95成新',
      description: '华为P50 Pro，使用半年，外观完美，性能强劲',
      images: ['https://via.placeholder.com/300x200?text=华为P50+Pro'],
      seller: '数码达人',
      location: '上海',
      createTime: '2024-01-14',
      category: '华为',
      tags: ['华为', '8+256GB', '曜金黑']
    },
    {
      id: 3,
      title: '小米12S Ultra 12+512GB 黑色',
      price: 3499,
      originalPrice: 6999,
      condition: '9成新',
      description: '小米12S Ultra，徕卡相机，拍照效果极佳',
      images: ['https://via.placeholder.com/300x200?text=小米12S+Ultra'],
      seller: '摄影爱好者',
      location: '深圳',
      createTime: '2024-01-13',
      category: '小米',
      tags: ['小米', '12+512GB', '黑色']
    }
  ],
  categories: ['iPhone', '华为', '小米', 'OPPO', 'vivo', '三星', '其他']
}

const mutations = {
  ADD_PRODUCT(state, product) {
    state.products.unshift({
      ...product,
      id: Date.now(),
      createTime: new Date().toISOString().split('T')[0]
    })
  },
  UPDATE_PRODUCT(state, { id, updates }) {
    const index = state.products.findIndex(product => product.id === id)
    if (index !== -1) {
      state.products[index] = { ...state.products[index], ...updates }
    }
  },
  DELETE_PRODUCT(state, id) {
    state.products = state.products.filter(product => product.id !== id)
  }
}

const actions = {
  createProduct({ commit }, product) {
    commit('ADD_PRODUCT', product)
  },
  updateProduct({ commit }, payload) {
    commit('UPDATE_PRODUCT', payload)
  },
  deleteProduct({ commit }, id) {
    commit('DELETE_PRODUCT', id)
  }
}

const getters = {
  allProducts: state => state.products,
  productsByCategory: state => category => state.products.filter(product => product.category === category),
  categories: state => state.categories
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 