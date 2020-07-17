let API_TOKEN = ``
axios.defaults.baseURL = 'https://course-ec-api.hexschool.io/api/'
const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')

const setAxios = {
	setHead(property, value) {
		axios.defaults.headers.common[property] = value
	},
}

if (token) setAxios.setHead('Authorization', `Bearer ${token}`)
