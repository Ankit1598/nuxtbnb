<template>
	<div class="app">
		<div class="app-container">
			<div class="app-hero">
				<h2>
					- Settle in somewhere new. Discover stays to live, work, or just
					relax.
				</h2>
			</div>
		</div>
		<SectionPremiumListings />
		<SectionRecentlyAdded class="app-background-grey" :homes="homes" />
		<SectionMore />
	</div>
</template>

<script>
export default {
	async asyncData({ $dataApi }) {
		return {
			homes: (await $dataApi.getHomes()).json.hits,
		}
	},
	head() {
		return {
			title: 'Homepage',
			meta: [
				{
					name: 'description',
					content:
						'NuxtBNB is an AirBNB app that uses Nuxt, Cloudinary, Stripe, Google Maps and Algolia.  Learn more at MasteringNuxt.com',
					hid: 'description',
				},
			],
		}
	},
}
</script>
