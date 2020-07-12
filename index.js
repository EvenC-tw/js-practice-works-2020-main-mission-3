Vue.prototype.$bus = new Vue()
var app = new Vue({
	el: '#app',
	data: {},
	components: {
		productListContainer: httpVueLoader('./components/productListContainer.vue'),
	},
})
