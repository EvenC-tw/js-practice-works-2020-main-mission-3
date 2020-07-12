<template>
	<div :class="[isModalShow ? 'opa-50' : '', 'container-fluid py-5']">
		<button type="button" class="btn btn-primary float-right" @click="showModal('create')">Create</button>
		<table class="table">
			<h1>List of Products</h1>
			<thead class="thead-dark">
				<tr>
					<th>Category</th>
					<th>Product Name</th>
					<th>List Price</th>
					<th>Retail Price</th>
					<th>Enable</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="productList.length > 0">
					<tr v-for="product in productList" :key="product.id">
						<td>{{ product.category }}</td>
						<td>{{ product.name }}</td>
						<td>{{ product.listPrice && product.listPrice.toLocaleString() }}</td>
						<td>{{ product.retailPrice && product.retailPrice.toLocaleString() }}</td>
						<td>{{ product.enable ? 'enabled' : 'disabled' }}</td>
						<td>
							<div class="btn-group" role="group" aria-label="Button group">
								<button
									type="button"
									class="btn btn-outline-primary"
									@click="showModal('edit', product.id)"
								>
									Edit
								</button>
								<button type="button" class="btn btn-outline-danger" @click="deleteProduct(product.id)">
									delete
								</button>
							</div>
						</td>
					</tr>
				</template>
				<template v-else>
					<tr>
						<td colspan="6" class="text-center">
							N/A
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
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
			isModalShow: false,
		}
	},
	created() {
		this.$bus.$on('createProduct', this.createProduct)
		this.$bus.$on('updateModalShow', this.updateModalShow)
		this.$bus.$on('updateProduct', this.updateProduct)
	},
	methods: {
		showModal(type, id) {
			let title = ''
			let tempProduct = {}
			switch (type) {
				case 'create':
					const newId = new Date().getTime()
					title = 'Create Product'
					tempProduct.id = newId
					break
				case 'edit':
					title = 'Edit Product'
					tempProduct = { ...this.productList.find((product) => product.id === id) }
					break
				default:
					break
			}
			this.$bus.$emit('showModal', { type, title })
			this.$bus.$emit('updateTempProduct', tempProduct)
		},
		deleteProduct(id) {
			this.productList.forEach((product, index) => {
				if (product.id === id) {
					this.productList.splice(index, 1)
				}
			})
		},
		createProduct(tempProduct) {
			this.productList.push(tempProduct)
		},
		updateProduct(data) {
			const { id, tempProduct } = data
			this.productList.forEach((product, index) => {
				if (product.id === id) {
					this.productList.splice(index, 1, tempProduct)
				}
			})
		},
		updateModalShow(data) {
			this.isModalShow = data
		},
	},
	updated() {},
}
</script>
