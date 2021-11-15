import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    sliders: null

})

export const getters = {
    getSliders(state) {
        return state.sliders
    }
}

export const actions = {
    addSlider(context, data) {
        return this.$axios.post(`/api/v1/sliders`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getSliders(context) {
        context.commit("setSliders", (await this.$axios.get(`/api/v1/sliders`)).data.data);
    },
    async getSliderById(context, id) {
        let response = await this.$axios.get(`/api/v1/sliders/${id}`)
        return response.data.data
    },
    updateSlider(context, formData) {
        return this.$axios.put(`/api/v1/sliders`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    deleteSlider(context, id) {
        return this.$axios.delete(`/api/v1/sliders/${id}`)
            .catch(err => rejectError(err))
    },

}

export const mutations = {
    setSliders(state, sliders) {
        state.sliders = sliders
    }
}