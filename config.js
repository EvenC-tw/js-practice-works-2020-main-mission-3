let API_TOKEN = ``
axios.defaults.baseURL = 'https://course-ec-api.hexschool.io/api/'

const setAxios = {
	setHead(property, value) {
		axios.defaults.headers.common[property] = value
	},
}
