import Cookies from 'js-cookie'

export default function({ $axios, redirect }) {
    $axios.onRequest(config => {
        if (Cookies.get('token')) {
            config.headers['Authorization'] = 'Bearer ' + Cookies.get('token')
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // config.headers['X-Requested-With'] = 'XMLHttpRequest';

        config.headers['Content-type'] = 'application/json';
    });
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            redirect('/admin/auth/login')
        }
    })

    // Disable console log messages on
    let productionMode = !!process.env.production;

    if (productionMode)
        console.log = function() {}

}