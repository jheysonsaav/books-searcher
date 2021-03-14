import { createStore } from "vuex";

const state = {
  books: {},
};

const mutations = {
  setBooks(state: any, books: any) {
    state.books = books;
  },
};

const store = createStore({
  state: state,
  mutations: mutations,
});

export default store;
