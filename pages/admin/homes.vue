<template>
	<div>
		<span v-for="homes in homeList" :key="homes.objectID"
			>{{ homes.title }}:
			<button class="text-red-800" @click="deleteHome(homes.objectID)">
				Delete</button
			><br />
		</span>
		<h2 class="text-xl bold">Add a Home</h2>
		<form class="form" @submit.prevent="onSubmit">
			Images:<br />
			<ImageUploader @file-uploaded="imageUpdated($event, 0)" />
			<ImageUploader @file-uploaded="imageUpdated($event, 1)" />
			<ImageUploader @file-uploaded="imageUpdated($event, 2)" />
			<ImageUploader @file-uploaded="imageUpdated($event, 3)" />
			<ImageUploader @file-uploaded="imageUpdated($event, 4)" />
			Title:<br />
			<input v-model="home.title" class="w-60" type="text" /><br />
			Description:<br />
			<textarea v-model="home.description" class="w-104" /><br />
			Note:<br />
			<textarea v-model="home.note" class="w-104" /><br />
			Features:<br />
			<input v-model="home.features[0]" class="w-26" type="text" />
			<input v-model="home.features[1]" class="w-26" type="text" />
			<input v-model="home.features[2]" class="w-26" type="text" />
			<input v-model="home.features[3]" class="w-26" type="text" /><br />
			Price Per Night:<br />
			<input v-model="home.pricePerNight" class="w-26" type="number" /><br />
			Guests / Bedrooms / Beds / Bathrooms:<br />
			<input v-model="home.guests" class="w-14" type="number" />
			<input v-model="home.bedrooms" class="w-14" type="number" />
			<input v-model="home.beds" class="w-14" type="number" />
			<input v-model="home.bathrooms" class="w-14" type="number" /><br />
			<input
				ref="locationSelector"
				type="text"
				autocomplete="off"
				placeholder="Select a location"
				@changed="changed"
			/><br />
			Address:<br />
			<input v-model="home.location.address" class="w-60" type="text" /><br />
			<input v-model="home.location.city" class="w-26" type="text" /><br />
			<input v-model="home.location.state" class="w-26" type="text" /><br />
			<input
				v-model="home.location.postalCode"
				class="w-26"
				type="text"
			/><br />
			<input v-model="home.location.country" class="w-26" type="text" /><br />
			<DatePicker
				v-for="(range, index) in home.availabilityRanges"
				:key="index"
				v-model="home.availabilityRanges[index]"
				is-range
				timezone="UTC"
				:model-config="{ timeAdjust: '00:00:00' }"
			>
				<template #default="{ inputValue, inputEvents }">
					<input :value="inputValue.start" v-on="inputEvents.start" />
					to
					<input :value="inputValue.end" v-on="inputEvents.end" /><br />
				</template>
			</DatePicker>
			<button class="border px-4 py-2 border-gray-400">Add</button>
		</form>
	</div>
</template>

<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
	data() {
		return {
			homeList: [],
			home: {
				title: '',
				description: '',
				note: '',
				pricePerNight: '',
				guests: '',
				bedrooms: '',
				beds: '',
				bathrooms: '',
				features: ['', '', '', '', ''],
				location: {
					address: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
				},
				_geoloc: { lat: 26.1, lng: 26.1 },
				images: [],
				availabilityRanges: [
					{
						start: '',
						end: '',
					},
					{
						start: '',
						end: '',
					},
				],
			},
		}
	},
	mounted() {
		this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
		this.setHomesList()
	},
	methods: {
		imageUpdated(imageUrl, index) {
			this.home.images[index] = imageUrl
		},
		async deleteHome(homeId) {
			await fetch(`/api/homes/${homeId}`, {
				method: 'DELETE',
			})
			const index = this.homeList.findIndex((obj) => obj.objectID === homeId)
			this.homeList.splice(index, 1)
		},
		async setHomesList() {
			this.homeList = (await unWrap(await fetch('/api/homes/user/'))).json
		},
		async onSubmit() {
			const response = await unWrap(
				await fetch('/api/homes', {
					method: 'POST',
					body: JSON.stringify(this.home),
					headers: { 'Content-Type': 'application/json' },
				})
			)
			this.homeList.push({
				title: this.home.title,
				objectID: response.json.homeId,
			})
		},
		changed(event) {
			const addressParts = event.detail.address_components
			const street =
				this.getAddressPart(addressParts, 'street_number')?.short_name || ''
			const route = this.getAddressPart(addressParts, 'route')?.short_name || ''

			this.home.location.address = street + ' ' + route
			this.home.location.city =
				this.getAddressPart(addressParts, 'locality')?.short_name || ''
			this.home.location.state =
				this.getAddressPart(addressParts, 'administrative_area_level_1')
					?.long_name || ''
			this.home.location.country =
				this.getAddressPart(addressParts, 'country')?.short_name || ''
			this.home.location.postalCode =
				this.getAddressPart(addressParts, 'postal_code')?.short_name || ''

			const geo = event.detail.geometry.location
			this.home._geoloc.lat = geo.lat()
			this.home._geoloc.lng = geo.lng()
		},
		getAddressPart(parts, type) {
			return parts.find((part) => part.types.includes(type))
		},
	},
}
</script>

<style lang="postcss" scoped>
.form input,
.form textarea {
	@apply p-1 m-1 bg-gray-200;
}
</style>
