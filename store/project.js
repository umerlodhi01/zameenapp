import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    projects: null

})

export const getters = {
    getProjects(state) {
        return state.projects
    }
}

export const actions = {
    addProject(context, data) {
        return this.$axios.post(`/api/v1/project`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getProjects(context) {
        context.commit("setProjects", (await this.$axios.get(`/api/v1/project`)).data.data);
    },
    async getProjectById(context, id) {
        let response = await this.$axios.get(`/api/v1/project/${id}`)
        return response.data.data
    },
    updateProject(context, formData) {
        return this.$axios.put(`/api/v1/project`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    // deleteSociety(context, id) {
    //     return this.$axios.delete(`/api/v1/society/${id}`)
    //         .catch(err => rejectError(err))
    // },


}

export const mutations = {
    setProjects(state, projects) {
        state.projects = projects
    }
}