const apis = {
	login(data, callback) {
		axios.post(`auth/login`, data).then(callback)
	},
}
