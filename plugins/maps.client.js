export default function (context, inject) {
	let isLoaded = false
	let waiting = []

	const addScript = () => {
		const script = document.createElement('script')
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&libraries=places&callback=initGoogleMaps`
		script.async = true
		document.head.appendChild(script)
	}

	const init = () => {
		isLoaded = true
		waiting.forEach((item) => {
			if (typeof item.fn === 'function') {
				item.fn(...item.arguments)
			}
		})
		waiting = []
	}
	window.initGoogleMaps = init

	function showMap(canvas, lat, lng, markers) {
		if (!isLoaded) {
			waiting.push({ fn: showMap, arguments })
			return
		}
		const mapOption = {
			zoom: 18,
			center: new window.google.maps.LatLng(lat, lng),
			disableDefaultUI: true,
			zoomControl: true,
			mapTypeId: window.google.maps.MapTypeId.SATELLITE,
			styles: [
				{
					featureType: 'poi.business',
					elementType: 'labels.icon',
					stylers: [{ visibility: 'off' }],
				},
			],
		}
		const map = new window.google.maps.Map(canvas, mapOption)
		if (!markers) {
			const marker = new window.google.maps.Marker({
				position: { lat, lng },
				clickable: false,
			})
			marker.setMap(map)
			return
		}

		const bounds = new window.google.maps.LatLngBounds()
		markers.forEach((home) => {
			const position = new window.google.maps.LatLng(home.lat, home.lng)
			const marker = new window.google.maps.Marker({
				position: { lat: home.lat, lng: home.lng },
				label: {
					text: `$${home.pricePerNight}`,
					className: `bg-white border-gray-200 rounded-xl font-bold px-2 py-1 home-${home.id}`,
				},
				icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
				clickable: false,
			})
			marker.setMap(map)
			bounds.extend(position)
		})
		map.fitBounds(bounds)
	}

	function makeAutoComplete(input, types = ['(cities)']) {
		if (!isLoaded) {
			waiting.push({ fn: makeAutoComplete, arguments })
			return
		}
		// eslint-disable-next-line no-unused-vars
		const autoComplete = new window.google.maps.places.Autocomplete(
			input,
			types
		)
		autoComplete.addListener('place_changed', () => {
			const place = autoComplete.getPlace()
			input.dispatchEvent(new CustomEvent('changed', { detail: place }))
		})
	}

	addScript()
	inject('maps', { showMap, makeAutoComplete })
}
