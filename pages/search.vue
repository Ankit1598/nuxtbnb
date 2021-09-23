<template>
	<div class="app-search-results-page">
		<div class="app-search-results">
			<div class="app-search-results-listing">
				<div class="app-title">Stays in {{ label }}</div>
				<NuxtLink
					v-for="home in homes"
					:key="home.objectID"
					:to="{ name: 'home-id', params: { id: home.objectID } }"
				>
					<HomeRow
						class="app-house"
						:home="home"
						@mouseover.native="highlightMarker(home.objectID, true)"
						@mouseout.native="highlightMarker(home.objectID, false)"
					/>
				</NuxtLink>
			</div>
			<div class="app-search-results-map">
				<div ref="map" class="app-map" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	async beforeRouteUpdate(to, from, next) {
		const data = await this.$dataApi.getHomesByLocation(
			to.query.lat,
			to.query.lng,
			to.query.start,
			to.query.end
		)
		console.log('beforeRouteUpdate', data.json.hits)
		this.homes = data.json.hits
		this.label = to.query.label
		this.lat = to.query.lat
		this.lng = to.query.lng
		this.updateMap()
		next()
	},
	async asyncData({ query, $dataApi }) {
		const data = await $dataApi.getHomesByLocation(
			query.lat,
			query.lng,
			query.start,
			query.end
		)
		console.log('asyncData', data.json.hits, query.lat,
			query.lng,
			query.start,
			query.end)
		return {
			homes: data.json.hits,
			label: query.label,
			lat: query.lat,
			lng: query.lng,
		}
	},
	head() {
		return {
			title: `Homes around ${this.label}`,
		}
	},
	mounted() {
		this.updateMap()
	},
	methods: {
		highlightMarker(homeId, isHighlighted) {
			document
				.getElementsByClassName(`home-${homeId}`)[0]
				?.classList?.toggle('marker-highlight', isHighlighted)
		},
		updateMap() {
			this.$maps.showMap(
				this.$refs.map,
				this.lat,
				this.lng,
				this.getHomeMarkers()
			)
		},
		getHomeMarkers() {
			if (this.homes.length === 0) return null
			return this.homes.map((home) => {
				return {
					...home._geoloc,
					pricePerNight: home.pricePerNight,
					id: home.objectID,
				}
			})
		},
	},
}
</script>

<style lang="css">
.marker-highlight {
	color: white !important;
	background: black;
	border: 1px solid black !important;
}
</style>
