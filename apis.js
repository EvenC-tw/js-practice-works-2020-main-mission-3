const uuid = `f7828c74-e344-45f1-a069-f542ff88c6fc`
const apis = {
	callbackProxy(res, callback) {
		return (function () {
			if (callback && typeof callback === 'function') {
				const { status, data } = res
				console.log(data)
				callback(data)
			}
		})()
	},
	errorProxy(err) {
		const {
			response: { status },
		} = err
		console.log(status)
		// if (status !== 200)
		// TODO some error handle
		switch (status) {
			case 401:
				document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
				location.reload()
				break

			default:
				break
		}
	},
	login(data, callback) {
		axios
			.post(`auth/login`, data)
			.then((res) => this.callbackProxy(res, callback))
			.catch(this.errorProxy)
	},
	getProductList(data, callback) {
		const { uuid } = data
		axios
			.get(`${uuid}/admin/ec/products`)
			.then((res) => this.callbackProxy(res, callback))
			.catch(this.errorProxy)
	},
	deleteProduct(data, callback) {
		const { id } = data
		axios
			.delete(`${uuid}/admin/ec/product/${id}`)
			.then((res) => this.callbackProxy(res, callback))
			.catch(this.errorProxy)
	},
}
