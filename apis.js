const apis = {
	callbackProxy(res, callback) {
		// if (res && res.status !== 200) return false
		// TODO some error handle
		callback(res)
	},
	login(data, callback) {
		axios.post(`auth/login`, data).then((res) => this.callbackProxy(res.data, callback))
	},
	getProductList(data, callback) {
		const { uuid } = data
		axios.get(`${uuid}/admin/ec/products`).then((res) => this.callbackProxy(res.data, callback))
	},
}
