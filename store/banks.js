import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    societies: null,
    bank: null,
    projects: null,

})

export const getters = {
    getSocieties(state) {
        return state.societies
    },
    getBankById(state) {
        return state.bank
    },
    getProjects(state) {
        return state.projects
    },
}

export const actions = {
    addBank(context, data) {
        return this.$axios.post(`/api/v1/bank`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getSocieties(context) {
        context.commit("setSocieties", (await this.$axios.get(`/api/v1/bank/society`)).data.data);
    },
    async bankById(context, id) {
        context.commit("setBankById", (await this.$axios.get(`/api/v1/bank/${id}`)).data.data);
    },
    async getBankForEdit(context, id) {
        let response = await this.$axios.get(`/api/v1/bank/${id}`)
        return response.data.data
    },
    updateBank(context, formData) {
        return this.$axios.put(`/api/v1/bank`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    deleteBank(context, id) {
        return this.$axios.delete(`/api/v1/bank/${id}`)
            .catch(err => rejectError(err))
    },
    async getProjects(context) {
        context.commit("setProjects", (await this.$axios.get(`/api/v1/bank/project`)).data.data);
    },


}

export const mutations = {
    setSocieties(state, societies) {
        state.societies = societies
    },
    setBankById(state, bank) {
        state.bank = bank
    },
    setProjects(state, projects) {
        state.projects = projects
    }
}