<template>
	<div class="wrapper">
		<div
			v-if="proxies.length === 0"
			class="not-found box"
		>No proxies found according to your search query.</div>
		<div v-for="(proxy, index) in proxies" :key="index" class="proxy box" @click="toggleData(index)">
			<div class="info">
				<div class="status" :style="proxy.alive ? 'background-color: green' : 'background-color: red'"></div>
				<img
					:src="`https://www.countryflags.io/${proxy.country}/flat/32.png`"
					:title="`${proxy.country}`"
					class="country"
				>
				<div class="host">{{ proxy.host }}:{{ proxy.port }}</div>
			</div>
			<div class="badges">
				<div class="type tag">{{ proxyTypes[proxy.proxy_type] }}</div>
				<div class="response-time tag">Response time: {{ proxy.port_response_time }}s</div>
			</div>
			<div class="data" v-show="expandedData.includes(index)">
				<div class="item">Proxy type: {{ proxyTypes[proxy.proxy_type] }}</div>
				<div class="item">Response time: {{ proxy.port_response_time }}s</div>
				<div class="item">Created at {{ proxy.created | moment("DD.MM.YYYY, HH:MM") }}</div>
				<div class="item">Busy until {{ proxy.busy_until | moment("DD.MM.YYYY, HH:MM") }}</div>
				<div class="item">Modified at {{ proxy.modified | moment("DD.MM.YYYY, HH:MM") }}</div>
				<div class="item">Last checked at {{ proxy.last_check_time | moment("DD.MM.YYYY, HH:MM") }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			proxyTypes: ["Transparent", "Anonymous", "Elite"],
			expandedData: [],
			proxies: []
		};
	},
	methods: {
		/**
		 * Toggle data of proxy
		 */
		toggleData(index) {
			this.expandedData.includes(index)
				? this.expandedData.splice(this.expandedData.indexOf(index), 1)
				: this.expandedData.push(index);
		},
		/**
		 * Filter proxies depending on current filters set
		 */
		filterProxies() {
			const proxies = this.$store.getters.proxies;
			const filters = this.$store.getters.filters;
			this.proxies = proxies.filter(
				proxy =>
					(proxy.country === filters.country ||
						filters.country === "all") &&
					proxy.alive === filters.alive &&
					(filters.proxyType.includes(proxy.proxy_type) ||
						!filters.proxyType.length)
			);
		}
	},
	mounted() {
		this.filterProxies();
		/**
		 * Subscribe to filters mutation for proxies list update
		 */
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === "setFilters") {
				this.filterProxies();
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.not-found {
	cursor: pointer;
	font-weight: 500;
	padding: 16px 16px;
}

.wrapper {
	width: 100%;
}

.proxy {
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	padding: 6px 16px;
	flex-basis: 75%;
	margin-left: 10px;
	.info {
		display: flex;
		align-items: center;
		.status {
			width: 10px;
			height: 10px;
			border-radius: 50%;
		}
		.country {
			margin-left: 10px;
		}
		.host {
			font-weight: 500;
			margin-left: 10px;
		}
	}
	.badges {
		.type {
			background-color: rgb(0, 132, 141);
			color: white;
		}
		.response-time {
			width: 156px;
			margin-left: 5px;
			background-color: rgb(240, 240, 240);
		}
	}
	.data {
		font-family: monospace;
		font-size: 12px;
		display: flex;
		margin: 10px 20px;
		flex-wrap: wrap;
		flex-basis: 100%;
		.item:nth-child(1),
		.item:nth-child(2) {
			display: none;
		}
		.item {
			flex-basis: 100%;
		}
	}
	&:hover {
		background-color: rgb(250, 250, 250);
	}
	&:not(:last-child) {
		margin-bottom: 10px;
	}
}

@media screen and (max-width: 599px) {
	.proxy {
		margin-left: 0;
		.badges {
			display: none;
		}
		.info {
			flex-basis: 100%;
		}
		.data {
			.item:nth-child(1),
			.item:nth-child(2) {
				display: block;
			}
		}
	}
}
@media screen and (min-width: 600px) {
	.proxy {
		margin-left: 0;
	}
}
@media screen and (min-width: 870px) {
	.proxy {
		margin-left: 10px;
	}
}
@media screen and (min-width: 1200px) {
	.proxy {
		margin-left: 10px;
	}
}
</style>

