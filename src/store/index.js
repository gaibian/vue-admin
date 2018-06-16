import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView
  },
  getters,
  state:{
    menus:"",
    authKey:'',
    autoHeight:'',
  },
  actions:{
    setMenus({commit},data){
      commit('setMenus',data);
    },
    setAutoHeight({commit},data){
      commit('setAutoHeight',data);
    },
    showLoading({commit},status){
      commit('showLoading',status);
    },
    setUsers({ commit }, users) {
      commit('setUsers', users)
    },
    setAuthKey({commit},authKey){
      commit('setAuthKey',authKey)
    }
  },
  mutations:{
    setMenus(state,data){
      state.menus = data;
    },
    setAutoHeight(state,data){
      state.autoHeight = data;
    },
    setAuthKey(state,authKey){
      state.authKey = authKey;
    },
    setUsers(state, users) {
      state.users = users
    },

  }
})

export default store
