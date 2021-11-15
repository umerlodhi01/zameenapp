import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    loginUser: null

})

export const getters = {
    getLoginUser(state) {
        return state.loginUser
    }
}

export const actions = {
    adminSignin(context, userData) {
        return this.$axios.post(`/api/v1/auth/admin`, userData)
            .then(res => {
                const user = res.data.user
                context.commit("setLoginUser", user);
                return res.data
            })
            .catch(err => rejectError(err))
    },
    async getLoginUser(context, id) {
        context.commit("setLoginUser", (await this.$axios.get(`/api/v1/auth/admin/${id}`)).data.data);
    },


}

export const mutations = {
    setLoginUser(state, loginUser) {
        state.loginUser = loginUser
    }
}