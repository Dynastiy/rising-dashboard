import Vue from 'vue';
import Vuex from 'vuex';
// import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        dashboard: [],
        product_id: ''
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        },
        getDashboard: state => {
            return state.dashboard;
        },
        getProductId: state =>{
            return state.product_id
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_DASHBOARD: (state, dashboard) => {
            state.dashboard = dashboard;
        },
        SET_PRODUCT_ID: (state, product_id) => {
            state.product_id = product_id;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        login: ({ commit }, { token, user }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
        },
        dashboard: ({ commit }, { dashboard }) => {
            commit('SET_DASHBOARD', dashboard);
        },
        product_id: ({ commit }, { product_id }) => {
            commit('SET_PRODUCT_ID', product_id);
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        }
    }
});