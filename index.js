Vue.prototype.$bus = new Vue()
var app = new Vue({
	el: '#app',
	data: {
		loginData: {
			status: false,
			expired: null,
			token: '',
			uuid: 'f7828c74-e344-45f1-a069-f542ff88c6fc',
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
			const { success, expired, token } = data
			if (!success) return
			this.loginData.status = success
			this.loginData.token = token
			this.loginData.expired = expired

			document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`

			setAxios.setHead('Authorization', `Bearer ${token}`)
			console.log(axios.defaults.headers.common['Authorization'])
		},
	},
	mounted() {
		this.loginData.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
		if (this.loginData.token !== '') {
			this.loginData.status = true
			setAxios.setHead('Authorization', `Bearer ${token}`)
		}
	},
	updated() {
		console.log(this.loginData)
	},
})
