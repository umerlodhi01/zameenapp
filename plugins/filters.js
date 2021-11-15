import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value, formatType = 'LLLL') {
    if (!value) return ''
    return moment(value).format(formatType);
})