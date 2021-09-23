<template>
	<div class="flex items-center flex-col text-center">
		<img
			src="images/illustrations/page_not_found.svg"
			class="mb-5 w-1/2"
		/>
		<h1>Error!</h1>
		{{ error.statusCode }}: {{ error.message }}
	</div>
</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style></style>
