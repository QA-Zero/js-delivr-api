export const state = () => ({
  query: '',
  list: [],
});

export const mutations = {
  updateStore(state, { query, list }) {
    state.query = query;
    state.list = list;
  },
};

export const actions = {
  async getList({ commit }, { query, offset }) {
    const data = await this.$api.getList(query, offset);

    if (data) commit(
      'updateStore',
      {
        query,
        list: data.hits,
      },
    );
  },
  clearData({ commit }) {
    commit(
      'updateStore',
      {
        query: '',
        list: [],
      },
    );
  }
};

export const getters = {
  query: state => state.query,
  list: state => state.list,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
