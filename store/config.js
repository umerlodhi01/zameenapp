export const state = () => ({
  account_type: "",
  sub_domain: "",
  token: ""
})

export const mutations = {
  changeAccountType(state, platform) {
    state.account_type = platform;
  },
  changeSubDomain(state, sub_domain) {
    state.sub_domain = sub_domain;
  },
  changeAuthToken(state, token) {
    state.token = token;
  }

}
