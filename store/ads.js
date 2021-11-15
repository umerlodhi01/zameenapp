import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    ads: null,
    singleAd: null,
    limit: 10,
    totalPages: null,

})

export const getters = {
    getADs(state) {
        return state.ads
    },
    getSingleAd(state) {
        return state.singleAd
    },
    getTotalPages(state) {
        return state.totalPages
    }
}

export const actions = {
    addAD(context, data) {
        return this.$axios.post(`/api/v1/ad`, data)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async countADs(context) {
        context.commit("setTotalAds", (await this.$axios.get(`/api/v1/ad`)).data.count);
    },
    async getADs(context, page) {
        const limit = context.state.limit;
        context.commit("setAds", (await this.$axios.get(`/api/v1/ad?limit=${limit}&page=${page}`)).data.data);
    },
    async getSingleAD(context, id) {
        context.commit("setAdById", (await this.$axios.get(`/api/v1/ad/${id}`)).data.data);
    },
    deleteAd(context, id) {
        return this.$axios.delete(`/api/v1/ad/${id}`)
            .catch(err => rejectError(err))
    },
    async editAd(context, id) {
        let response = await this.$axios.get(`/api/v1/ad/edit/${id}`)
        return response.data.data
    },
    updateAd(context, formData) {
        return this.$axios.put(`/api/v1/ad`, formData)
            .then((res) => {
                return res
            })
            .catch(err => rejectError(err))
    },
    async getActiveADs(context, page) {
        const limit = context.state.limit;
        context.commit("setAds", (await this.$axios.get(`/api/v1/ad?limit=${limit}&page=${page}&status=1`)).data.data);
    },
    async countActiveADs(context) {
        context.commit("setTotalAds", (await this.$axios.get(`/api/v1/ad?status=1`)).data.count);
    },
    disableAd(context, id) {
        return this.$axios.put(`/api/v1/ad/disable/${id}`)
            .catch(err => rejectError(err))
    },
    async getDisableADs(context, page) {
        const limit = context.state.limit;
        context.commit("setAds", (await this.$axios.get(`/api/v1/ad?limit=${limit}&page=${page}&status=2`)).data.data);
    },
    async countDisableADs(context) {
        context.commit("setTotalAds", (await this.$axios.get(`/api/v1/ad?status=2`)).data.count);
    },
    activateAd(context, id) {
        return this.$axios.put(`/api/v1/ad/active/${id}`)
            .catch(err => rejectError(err))
    },
    async getEQuantityADs(context, page) {
        const limit = context.state.limit;
        context.commit("setAds", (await this.$axios.get(`/api/v1/ad?limit=${limit}&page=${page}&status=3`)).data.data);
    },
    async countEQuantityADs(context) {
        context.commit("setTotalAds", (await this.$axios.get(`/api/v1/ad?status=3`)).data.count);
    },

}

export const mutations = {
    setAds(state, ads) {
        state.ads = ads
    },
    setAdById(state, ad) {
        state.singleAd = ad
    },
    setTotalAds(state, total) {
        state.totalPages = Math.ceil(Number(total) / state.limit);
    }
}