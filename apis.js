const uuid = `f7828c74-e344-45f1-a069-f542ff88c6fc`
const proxies = {
	callbackPX(res, callback) {
		return (function () {
			if (callback && typeof callback === 'function') {
				const { status, data } = res
				callback(data)
			}
		})()
	},
	errorPX(err) {
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
}
const apis = {
	login(data, callback) {
		axios
			.post(`auth/login`, data)
			.then((res) => proxies.callbackPX(res, callback))
			.catch(proxies)
	},
	createProduct(data, callback) {
		axios
			.post(`${uuid}/admin/ec/product`, data)
			.then((res) => proxies.callbackPX(res, callback))
			.catch(proxies)
	},
	getProductList(data, callback) {
		axios
			.get(`${uuid}/admin/ec/products`)
			.then((res) => proxies.callbackPX(res, callback))
			.catch(proxies)
	},
	updateProduct(data, callback) {
		const { id, tempProduct } = data
		axios
			.patch(`${uuid}/admin/ec/product/${id}`, tempProduct)
			.then((res) => proxies.callbackPX(res, callback))
			.catch(proxies)
	},
	deleteProduct(data, callback) {
		const { id } = data
		axios
			.delete(`${uuid}/admin/ec/product/${id}`)
			.then((res) => proxies.callbackPX(res, callback))
			.catch(proxies)
	},
}
