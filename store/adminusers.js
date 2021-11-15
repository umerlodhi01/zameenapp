import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    users: null

})

export const getters = {
    getAdminUsers(state) {
        return state.users
    }
}

export const actions = {
    addUsers(context, data) {
        return this.$axios.post(`/api/v1/adminusers`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getAdminUsers(context) {
        context.commit("setAdminUsers", (await this.$axios.get(`/api/v1/adminusers`)).data.data);
    },
    async deleteUser({ commit, state }, id) {
        let user = this.state.auth.loginUser._id
        return this.$axios.delete(`/api/v1/adminusers/${id}?userId=${user}`)
            .catch(err => rejectError(err))

    },
    async getAdminUserById(context, id) {
        let response = await this.$axios.get(`/api/v1/adminusers/${id}`)
        return response.data.data
    },
    updateUsers(context, formData) {
        return this.$axios.put(`/api/v1/adminusers`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },


}

export const mutations = {
    setAdminUsers(state, users) {
        state.users = users
    }
}