<template>
	<div>
		<product-list></product-list>
		<product-modal></product-modal>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {}
	},
	components: {
		productList: httpVueLoader('./productList.vue'),
		productModal: httpVueLoader('./productModal.vue'),
	},
}
</script>
