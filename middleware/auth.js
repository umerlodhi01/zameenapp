import  jwt_decode  from  "jwt-decode";
export default function({ app, store, route, redirect }) {
    const token = app.$cookies.get("token");
    const subdomain = app.$cookies.get("subdomain");
    if (token) {
        if (!store.state.auth.loginUser) {
            let decoded = jwt_decode(token)
            store.dispatch("auth/getLoginUser", decoded.id)
        }
    }
    if (!token) {
        if (subdomain) {
            return redirect("/" + subdomain + "/auth/login");
        } else {
            if (process.client) {
                var full = window.location.host;
                var parts = full.split(".");
                var subdomain_url = parts[0];
                return redirect("/" + subdomain_url + "/auth/login");
            }
        }
    }
}