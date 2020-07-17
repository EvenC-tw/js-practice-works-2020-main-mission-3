<template>
	<div
		:class="[modal.enable ? modal.enableClass : '', 'modal fade']"
		tabindex="-1"
		role="dialog"
		aria-labelledby="ProductModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="ProductModalLabel">{{ modal.title }}</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<label for="imageUrl">Image Url</label>
							<input
								id="imageUrl"
								v-model="tempProduct.imageUrl && tempProduct.imageUrl[0]"
								class="form-control"
								type="text"
								name=""
							/>
						</div>
						<img
							v-if="tempProduct.imageUrl && tempProduct.imageUrl[0]"
							:src="tempProduct.imageUrl && tempProduct.imageUrl[0]"
							class="img-fluid"
							alt="image preview"
						/>
						<div class="form-group">
							<label for="name">Name</label>
							<input id="name" v-model="tempProduct.name" class="form-control" type="text" name="" />
						</div>
						<div class="form-group">
							<label for="category">Category</label>
							<input
								id="category"
								v-model="tempProduct.category"
								class="form-control"
								type="text"
								name=""
							/>
						</div>
						<div class="form-group">
							<label for="unit">Unit</label>
							<input id="unit" v-model="tempProduct.unit" class="form-control" type="text" name="" />
						</div>
						<div class="form-group">
							<label for="listPrice">List Price</label>
							<input
								id="listPrice"
								v-model="tempProduct.listPrice"
								class="form-control"
								type="number"
								name=""
							/>
						</div>
						<div class="form-group">
							<label for="retailPrice">Retail Price</label>
							<input
								id="retailPrice"
								v-model="tempProduct.retailPrice"
								class="form-control"
								type="number"
								name=""
							/>
						</div>
						<div class="form-group">
							<label for="description">Description </label>
							<input
								id="description"
								v-model="tempProduct.description"
								class="form-control"
								type="text"
								name=""
							/>
						</div>
						<div class="form-group">
							<label for="content">Content</label>
							<input
								id="content"
								v-model="tempProduct.content"
								class="form-control"
								type="text"
								name=""
							/>
						</div>
						<div class="form-check">
							<input
								id="enable"
								class="form-check-input"
								type="checkbox"
								name=""
								v-model="tempProduct.enable"
							/>
							<label for="enable" class="form-check-label">Enable</label>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">
						Close
					</button>
					<button type="button" class="btn btn-primary" @click="updateProduct">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	props: [],
	data() {
		return {
			modal: {
				enable: false,
				enableClass: 'show d-block',
				title: '',
				type: '',
			},
			tempProduct: {},
		}
	},
	created() {
		this.$bus.$on('productModal.showModal', this.showModal)
		this.$bus.$on('productModal.updateTempProduct', this.updateTempProduct)
	},
	methods: {
		updateProduct() {
			switch (this.modal.type) {
				case 'create':
					this.$bus.$emit('productList.createProduct', { ...this.tempProduct })
					break
				case 'edit':
					this.$bus.$emit('productList.updateProduct', {
						id: this.tempProduct.id,
						tempProduct: { ...this.tempProduct },
					})
					break
				default:
					break
			}
			this.hideModal()
		},
		updateTempProduct(tempProduct) {
			this.tempProduct = tempProduct
		},
		hideModal() {
			this.tempProduct = {}
			this.modal.enable = false
			this.$bus.$emit('productList.updateModalShow', false)
		},
		showModal(data) {
			const { type, title } = data
			this.modal.enable = true
			this.modal.type = type
			this.modal.title = title
			this.$bus.$emit('productList.updateModalShow', true)
		},
	},
}
</script>
