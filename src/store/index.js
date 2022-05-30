import Vue from 'vue';
import Vuex from 'vuex';
// import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        dashboard: []
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
        logout: ({ commit }) => {
            commit('RESET', '');
        }
    }
});