import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    propertyTypes: null,
    propertyTypesBySocietyId: null,
    propertyTypesByProjectId: null

})

export const getters = {
    getPropertyTypes(state) {
        return state.propertyTypes
    },
    getPropertyTypesOfSpecificSociety(state) {
        return state.propertyTypesBySocietyId
    },
    getPropertyTypesOfSpecificProject(state) {
        return state.propertyTypesByProjectId
    }
}

export const actions = {
    addPropertyType(context, data) {
        return this.$axios.post(`/api/v1/propertytype`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getPropertyTypes(context) {
        context.commit("setPropertyTypes", (await this.$axios.get(`/api/v1/propertytype`)).data.data);
    },
    async getPropertyTypeById(context, id) {
        let response = await this.$axios.get(`/api/v1/propertytype/${id}`)
        return response.data.data
    },
    editPropertyType(context, formData) {
        return this.$axios.put(`/api/v1/propertytype/`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    deletePropertyType(context, id) {
        return this.$axios.delete(`/api/v1/propertytype/${id}`)
            .catch(err => rejectError(err))
    },
    async getPropertyTypesOfSpecificSociety(context, id) {
        context.commit("setPropertyTypesOfSpecificSociety", (await this.$axios.get(`/api/v1/propertytype/society/${id}`)).data.data);
    },
    async getPropertyTypesOfSpecificProject(context, id) {
        context.commit("setPropertyTypesOfSpecificProject", (await this.$axios.get(`/api/v1/propertytype/project/${id}`)).data.data);
    }

}

export const mutations = {
    setPropertyTypes(state, propertyTypes) {
        state.propertyTypes = propertyTypes
    },
    setPropertyTypesOfSpecificSociety(state, data) {
        state.propertyTypesBySocietyId = data
    },
    setPropertyTypesOfSpecificProject(state, data) {
        state.propertyTypesByProjectId = data
    }

}