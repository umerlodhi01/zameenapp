import rejectError from '~/helpers/rejecterror'
export const state = () => ({
    allPurchases: null,
    limit: 10,
    totalPages: null,
    paymentDetails: null,

})

export const getters = {
    getPurchases(state) {
        return state.allPurchases
    },
    getTotalPages(state) {
        return state.totalPages
    },
    getPaymentDetails(state) {
        return state.paymentDetails
    }
}

export const actions = {
    async getPurchases(context, page) {
        const limit = context.state.limit;
        context.commit("setAllPurchases", (await this.$axios.get(`/api/v1/purchase?limit=${limit}&page=${page}`)).data.data);
    },
    async getOrderById(context, id) {
        let response = await this.$axios.get(`/api/v1/purchase/${id}`)
        return response.data.data
    },
    deleteOrder(context, id) {
        return this.$axios.delete(`/api/v1/purchase/${id}`)
            .catch(err => rejectError(err))
    },
    verifyPayment(context, id) {
        return this.$axios.put(`/api/v1/payment/verify/${id}`)
            .catch(err => rejectError(err))
    },
    unVerifyPayment(context, id) {
        return this.$axios.put(`/api/v1/payment/unverify/${id}`)
            .catch(err => rejectError(err))
    },
    async countTotalPurchases(context) {
        context.commit("setTotalPurchases", (await this.$axios.get(`/api/v1/purchase`)).data.count);
    },
    async paymentDetails(context, id) {
        context.commit("setPaymentDetail", (await this.$axios.get(`/api/v1/payment/purchase/${id}`)).data.data);
    },
    async getPendingPurchases(context, page) {
        const limit = context.state.limit;
        context.commit("setAllPurchases", (await this.$axios.get(`/api/v1/purchase?limit=${limit}&page=${page}&status=2`)).data.data);
    },
    async getCompletedPurchases(context, page) {
        const limit = context.state.limit;
        context.commit("setAllPurchases", (await this.$axios.get(`/api/v1/purchase?limit=${limit}&page=${page}&status=3`)).data.data);
    },
    async getAwaitingPurchases(context, page) {
        const limit = context.state.limit;
        context.commit("setAllPurchases", (await this.$axios.get(`/api/v1/purchase?limit=${limit}&page=${page}&status=1`)).data.data);
    },
    async countTotalAwaitingPurchases(context) {
        context.commit("setTotalPurchases", (await this.$axios.get(`/api/v1/purchase?status=1`)).data.count);
    },
    async countTotalCompletedPurchases(context) {
        context.commit("setTotalPurchases", (await this.$axios.get(`/api/v1/purchase?status=3`)).data.count);
    },
    async countTotalPendingPurchases(context) {
        context.commit("setTotalPurchases", (await this.$axios.get(`/api/v1/purchase?status=2`)).data.count);
    },
}

export const mutations = {
    setAllPurchases(state, purchases) {
        state.allPurchases = purchases
    },
    setTotalPurchases(state, total) {
        state.totalPages = Math.ceil(Number(total) / state.limit);
    },
    setPaymentDetail(state, detail) {
        state.paymentDetails = detail
    }

}