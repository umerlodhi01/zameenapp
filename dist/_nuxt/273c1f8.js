(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{761:function(e,t,r){"use strict";r.r(t);r(10),r(8),r(7),r(13),r(9),r(14);var n=r(3),c=r(74);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={layout:"admin",middleware:["auth"],data:function(){return{snackbar:{snackbar:!1,text:null,color:"dark"},page:1}},methods:l(l({},Object(c.b)({getUnverifiedUsers:"users/getUnVerifiedUsers",countTotalUsers:"users/countUnVerifiedUsers"})),{},{verifyUser:function(e){var t=this;this.$store.dispatch("users/verifyUser",e).then((function(e){e.data.success&&(t.snackbar.snackbar=!0,t.snackbar.text="User Verified Successfully",t.snackbar.color="primary",t.countTotalUsers(),t.getUnverifiedUsers(t.page))}))},viewUser:function(e){this.$router.push("/admin/users/signupusers/".concat(e))},deleteUser:function(e){var t=this;this.$store.dispatch("users/deleteUser",e).then((function(e){e.data.success&&(t.snackbar.snackbar=!0,t.snackbar.text="User Deleted Successfully",t.snackbar.color="error",t.countTotalUsers(),t.getUnverifiedUsers(t.page))}))}}),created:function(){this.getUnverifiedUsers(this.page),this.countTotalUsers()},computed:l({},Object(c.c)({unVerifiedUsers:"users/getUnVerifiedUsers",pages:"users/getTotalPages"})),watch:{page:{handler:function(){this.getUnverifiedUsers(this.page)},deep:!0}}},d=r(55),f=r(97),_=r.n(f),h=r(229),k=r(659),U=r(128),m=r(679),y=r(648),x=r(650),component=Object(d.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-flex",{staticClass:"\n      text-caption text-center\n      primary--text\n      text-uppercase text-decoration-underline\n    ",attrs:{"mt-3":""}},[r("h1",[e._v("Unverified Users")])]),e._v(" "),r("v-simple-table",{staticClass:"mt-5",scopedSlots:e._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",{staticClass:"text-left"},[e._v("Name")]),e._v(" "),r("th",{staticClass:"text-left"},[e._v("Email")]),e._v(" "),r("th",{staticClass:"text-left"},[e._v("Phone")]),e._v(" "),r("th",{staticClass:"text-left"},[e._v("Created At")]),e._v(" "),r("th",{staticClass:"text-center"},[e._v("View User")]),e._v(" "),r("th",{staticClass:"text-center"},[e._v("Actions")])])]),e._v(" "),e.unVerifiedUsers?r("tbody",e._l(e.unVerifiedUsers,(function(t,i){return r("tr",{key:i},[r("td",[e._v(e._s(t.name))]),e._v(" "),r("td",[e._v(e._s(t.email))]),e._v(" "),r("td",[e._v(e._s(t.phone))]),e._v(" "),r("td",[e._v(e._s(e._f("formatDate")(t.createdAt)))]),e._v(" "),r("td",{staticClass:"text-center"},[r("v-icon",{attrs:{color:"primary"},on:{click:function(r){return r.preventDefault(),e.viewUser(t._id)}}},[e._v("\n              mdi-account-eye\n            ")])],1),e._v(" "),r("td",{staticClass:"text-center"},[r("v-icon",{attrs:{color:"error"},on:{click:function(r){return r.preventDefault(),e.deleteUser(t._id)}}},[e._v("\n              mdi-delete\n            ")]),e._v(" "),r("v-icon",{attrs:{color:"success"},on:{click:function(r){return r.preventDefault(),e.verifyUser(t._id)}}},[e._v("\n              mdi-account-check\n            ")])],1)])})),0):e._e()]},proxy:!0}])}),e._v(" "),e.pages?r("div",{staticClass:"text-center"},[r("v-pagination",{attrs:{length:e.pages,circle:""},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1):e._e(),e._v(" "),r("v-snackbar",{attrs:{rounded:"pill"},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[r("v-btn",e._b({attrs:{color:e.snackbar.color,text:""},on:{click:function(t){e.snackbar.snackbar=!1}}},"v-btn",n,!1),[e._v("\n        Close\n      ")])]}}]),model:{value:e.snackbar.snackbar,callback:function(t){e.$set(e.snackbar,"snackbar",t)},expression:"snackbar.snackbar"}},[e._v("\n    "+e._s(e.snackbar.text)+"\n\n    ")])],1)}),[],!1,null,null,null);t.default=component.exports;_()(component,{VBtn:h.a,VFlex:k.a,VIcon:U.a,VPagination:m.a,VSimpleTable:y.a,VSnackbar:x.a})}}]);