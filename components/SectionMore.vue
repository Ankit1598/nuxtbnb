<template>
	<div class="app-padded-vertical">
		<div class="app-wrapper">
			<div class="app-dual-picture">
				<NuxtLink
					class="city-san-francisco"
					to="/search?lat=37.7749295&lng=-122.4194155&label=San%20Francisco,%20CA,%20USA"
				>
					<div>
						<h3>Golden Gate Bridge</h3>
						<p>San Francisco</p>
					</div>
				</NuxtLink>
				<NuxtLink
					class="city-cancun"
					to="/search?lat=21.161908&lng=-86.8515279&label=Cancún,%20Mexico"
				>
					<div>
						<h3>Cancún</h3>
						<p>México</p>
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
