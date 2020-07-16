Vue.prototype.$bus = new Vue()
var app = new Vue({
	el: '#app',
	data: {
		loginData: {
			status: false,
			expired: null,
			token: '',
			uuid: '',
		},
	},
	components: {
		productList: httpVueLoader('./components/productList.vue'),
		productModal: httpVueLoader('./components/productModal.vue'),
		LoginModal: httpVueLoader('./components/loginModal.vue'),
	},
	template: `
	<div>
		<product-list :uuid="loginData.uuid" :login-status="loginData.status"></product-list>
		<product-modal></product-modal>
		<login-modal @getLoginData="setLoginData" :login-status="loginData.status"></login-modal>
	</div>
	`,
	methods: {
		setLoginData(data) {
			console.log(data)
			const { success, expired, token, uuid } = data
			if (!success) return
			this.loginData.status = success
			this.loginData.token = token
			this.loginData.expired = expired
			this.loginData.uuid = uuid

			document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`

			setAxios.setHead('Authorization', `Bearer ${token}`)
			console.log(axios.defaults.headers.common['Authorization'])
		},
	},
	mounted() {
		this.loginData.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
		if (this.loginData.token !== '') {
			this.loginData.status = true
			// this.loginData.uuid = document.cookie.replace(/(?:(?:^|.*;\s*)uuid\s*\=\s*([^;]*).*$)|^.*$/, '$1')
		}
	},
	updated() {
		console.log(this.loginData)
	},
})
