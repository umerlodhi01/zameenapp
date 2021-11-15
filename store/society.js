import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    societies: null

})

export const getters = {
    getSocieties(state) {
        return state.societies
    }
}

export const actions = {
    addSociety(context, data) {
        return this.$axios.post(`/api/v1/society`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getSocieties(context) {
        context.commit("setSocieties", (await this.$axios.get(`/api/v1/society`)).data.data);
    },
    async getSocietyById(context, id) {
        let response = await this.$axios.get(`/api/v1/society/${id}`)
        return response.data.data
    },
    editSociety(context, formData) {
        return this.$axios.put(`/api/v1/society`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    deleteSociety(context, id) {
        return this.$axios.delete(`/api/v1/society/${id}`)
            .catch(err => rejectError(err))
    },

}

export const mutations = {
    setSocieties(state, societies) {
        state.societies = societies
    }
}