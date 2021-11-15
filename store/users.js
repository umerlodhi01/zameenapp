export const state = () => ({
    unVerifiedUsers: null,
    verifiedUsers: null,
    singleUser: null,
    limit: 10,
    totalPages: null,

})

export const getters = {
    getUnVerifiedUsers(state) {
        return state.unVerifiedUsers
    },
    getverifiedUsers(state) {
        return state.verifiedUsers
    },
    getSingleUser(state) {
        return state.singleUser
    },
    getTotalPages(state) {
        return state.totalPages
    }
}

export const actions = {
    async getUnVerifiedUsers(context, page) {
        const limit = context.state.limit;
        context.commit("setUnVerifiedUsers", (await this.$axios.get(`/api/v1/users?status=false&limit=${limit}&page=${page}`)).data.data);
    },
    async countUnVerifiedUsers(context) {
        context.commit("setTotalUnverified", (await this.$axios.get(`/api/v1/users?status=false`)).data.count);
    },
    async getVerifiedUsers(context, page) {
        const limit = context.state.limit;
        context.commit("setVerifiedUsers", (await this.$axios.get(`/api/v1/users?status=true&limit=${limit}&page=${page}`)).data.data);
    },
    async countVerifiedUsers(context) {
        context.commit("setTotalVerified", (await this.$axios.get(`/api/v1/users?status=true`)).data.count);
    },
    verifyUser(context, id) {
        return this.$axios.put(`/api/v1/users/markverified/${id}`)
            .catch(err => rejectError(err))
    },
    unVerifyUser(context, id) {
        return this.$axios.put(`/api/v1/users/markunverified/${id}`)
            .catch(err => rejectError(err))
    },
    async getSingleUser(context, id) {
        context.commit("setSingleUser", (await this.$axios.get(`/api/v1/users/signupusers/${id}`)).data.data);
    },
    deleteUser(context, id) {
        return this.$axios.delete(`/api/v1/users/${id}`)
            .catch(err => rejectError(err))
    },
}

export const mutations = {
    setUnVerifiedUsers(state, users) {
        state.unVerifiedUsers = users;
    },
    setVerifiedUsers(state, users) {
        state.verifiedUsers = users;
    },
    setSingleUser(state, user) {
        state.singleUser = user;
    },
    setTotalUnverified(state, total) {
        state.totalPages = Math.ceil(Number(total) / state.limit);
    },
    setTotalVerified(state, total) {
        state.totalPages = Math.ceil(Number(total) / state.limit);
    }

}