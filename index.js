window.addEventListener('load', function (event) {
	new Vue({
		el: '#app',
		data: {
			modal: {
				enable: false,
				enableClass: 'show d-block',
				title: '',
				type: '',
			},
			newProduct: {
				// 商品名稱 - string
				name: '',
				// 商品分類 - string
				category: '',
				// 商品敘述 - string
				content: '',
				// 商品說明 - string
				description: '',
				// 商品圖片 - string
				imageUrl: '',
				// 是否上架 - boolean
				enable: true,
				// 原價 - number(integer)
				listPrice: null,
				// 售價 - number(integer)
				retailPrice: null,
				// 單位 - string
				unit: '',
				// 其他設定 - object
				options: null,
			},
			productList: [
				{
					id: 1593895500818,
					name: 'switch',
					category: 'Handheld Console',
					content: '',
					description: '',
					imageUrl: '',
					enable: true,
					listPrice: 8700,
					retailPrice: 8450,
					unit: '',
					options: null,
				},
				{
					id: 1593895500819,
					name: 'play station 5',
					category: 'Home Console',
					content: '',
					description: '',
					imageUrl: '',
					enable: false,
					listPrice: 16900,
					retailPrice: 16900,
					unit: '',
					options: null,
				},
			],
			tempProduct: {},
		},
		methods: {
			showModal(type, id) {
				this.modal.enable = true
				this.modal.type = type
				switch (type) {
					case 'create':
						const newId = new Date().getTime()
						this.modal.title = 'Create Product'
						this.tempProduct.id = newId
						break
					case 'edit':
						this.modal.title = 'Edit Product'
						this.tempProduct = { ...this.productList.find((product) => product.id === id) }
						break
					default:
						break
				}
			},
			hideModal() {
				this.tempProduct = {}
				this.modal.enable = false
			},
			updateProduct() {
				switch (this.modal.type) {
					case 'create':
						this.productList.push({ ...this.tempProduct })
						break
					case 'edit':
						this.productList.forEach((product, index) => {
							if (product.id === this.tempProduct.id) {
								this.productList[index] = { ...this.tempProduct }
							}
						})
						this.tempProduct = {}
						break
					default:
						break
				}
				this.hideModal()
			},
			deleteProduct(id) {
				let deleteIndex = null
				this.productList.forEach((product, index) => {
					if (product.id === id) {
						deleteIndex = index
					}
				})
				this.productList.splice(deleteIndex, 1)
			},
		},
		updated() {
			console.log(this.$data)
		},
	})
})
