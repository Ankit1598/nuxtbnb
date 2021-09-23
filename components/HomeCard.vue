<template>
	<div>
		<NuxtImg
			:src="home.images[0]"
			width="200"
			height="150"
			provider="cloudinary"
		/>
		<p>{{ home.title }}</p>
		<p>{{ home.pricePerNight }} / night</p>
		<p>
			{{ home.location.address }}, {{ home.location.city }},
			{{ home.location.state }}, {{ home.location.country }}
		</p>
		<p>{{ home.guests }} guests</p>
		<p>{{ home.bedrooms }} bedrooms</p>
		<p>{{ home.beds }} beds</p>
		<p>{{ home.bathrooms }} bathrooms</p>
	</div>
</template>

<script>
export default {
	props: {
		home: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style></style>
