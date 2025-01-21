import axios from 'axios'
export const authModule = {
    state: () => ({
        isAuthenticated: false,
        isAuthLoaded: false,
    }),
    mutations: {
        SET_AUTH(state, user) {
            state.isAuthenticated = user;
            state.isAuthLoaded = true;
        }
    },
    actions: {
        async checkAuth({ commit }) {
            try {
                const response = await axios.get("http://localhost:3000/users", {
                    withCredentials: true
                });
                commit('SET_AUTH', response.data);
            } catch {
                commit('SET_AUTH', false);
            }
        }
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        isAuthLoaded: (state) => state.isAuthLoaded,
    }
};
