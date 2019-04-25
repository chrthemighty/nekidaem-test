<template>
	<div class="settings box">
		<div class="dropdown" :class="{ 'is-active': dropdownIsActive }">
			<div class="dropdown-trigger">
				<button
					class="button"
					ref="button"
					@click="toggleDropdown(0)"
					@blur="toggleDropdown(200)"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
				>
					<span
						class="placeholder"
					>{{ this.filters.country === 'all' ? 'All (default)' : this.filters.country }}</span>
					<span class="icon is-small">
						<i class="fas fa-angle-down" aria-hidden="true"></i>
					</span>
				</button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content">
					<a class="dropdown-item" @click=" setCountry('all')">All (default)</a>
					<a
						v-for="country in countries"
						:key="country"
						@click="setCountry(country)"
						class="dropdown-item"
					>{{ country }}</a>
				</div>
			</div>
		</div>
		<hr>
		<div class="filters">
			<label class="checkbox">
				<input type="checkbox" @click="setProxyType(0)">
				<div class="checkbox__text">Transparent</div>
			</label>
			<label class="checkbox">
				<input type="checkbox" @click="setProxyType(1)">
				<div class="checkbox__text">Anonymous</div>
			</label>
			<label class="checkbox">
				<input type="checkbox" @click="setProxyType(2)">
				<div class="checkbox__text">Elite</div>
			</label>
			<hr>
			<label class="checkbox">
				<input type="checkbox" checked @click="setAlive(!filters.alive)">
				<div class="checkbox__text">Alive</div>
			</label>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dropdownIsActive: false,
			filters: {
				alive: true,
				proxyType: [],
				country: "all"
			}
		};
	},
	computed: {
		countries() {
			return this.$store.getters.countries;
		}
	},
	methods: {
		/**
		 * Toggle dropdown with country list
		 */
		toggleDropdown(timeout) {
			// Timeout is used to overtake @blur event
			setTimeout(() => {
				this.dropdownIsActive = timeout
					? false
					: !this.dropdownIsActive;
			}, timeout);
		},
		/**
		 * Set country and dispatch filters changing
		 */
		setCountry(country) {
			this.filters.country = country;
			this.changeFilters();
		},
		/**
		 * Set alive property and dispatch filters changing
		 */
		setAlive(alive) {
			this.filters.alive = alive;
			this.changeFilters();
		},
		/**
		 * Set proxy type and dispatch filters changing
		 */
		setProxyType(type) {
			if (this.filters.proxyType.includes(type)) {
				this.filters.proxyType.splice(
					this.filters.proxyType.indexOf(type),
					1
				);
			} else {
				this.filters.proxyType.push(type);
			}
			this.changeFilters();
		},
		/**
		 * Dispatch filters changing
		 */
		changeFilters() {
			this.$store.dispatch("changeFilters", this.filters);
		}
	}
};
</script>

<style lang="scss" scoped>
.dropdown,
.dropdown-trigger,
.button,
.dropdown-menu,
.dropdown-content,
.dropdown-item,
.is-active {
	min-width: 0;
	width: 100%;
}

.button {
	justify-content: space-between;
	padding: 0 10px;
}
hr {
	margin-bottom: 0;
	margin-top: 20px;
}

.settings {
	flex-basis: 25%;
	min-width: 200px;
}
.settings:not(:last-child) {
	margin-bottom: 10px;
}

.filters {
	display: flex;
	flex-direction: column;
	.checkbox {
		&__text {
			position: relative;
			padding: 0 0 0 60px;
			cursor: pointer;
			&:before {
				content: "";
				position: absolute;
				top: -4px;
				left: 0;
				width: 50px;
				height: 26px;
				border-radius: 13px;
				background: #cdd1da;
				box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
				transition: 0.2s;
			}
			&:after {
				content: "";
				position: absolute;
				top: -2px;
				left: 2px;
				width: 22px;
				height: 22px;
				border-radius: 10px;
				background: #fff;
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
				transition: 0.2s;
			}
		}
		& input {
			z-index: -1;
			opacity: 0;
			&:checked + .checkbox__text {
				&:after {
					left: 26px;
				}
				&:before {
					background: rgb(0, 132, 141);
				}
			}
		}
	}
}

@media screen and (max-width: 599px) {
	.settings {
		min-width: 100%;
	}
}
@media screen and (min-width: 600px) {
	.settings {
		min-width: 100%;
	}
}
@media screen and (min-width: 870px) {
	.settings {
		min-width: 200px;
	}
}
@media screen and (min-width: 1200px) {
	.settings {
		min-width: 200px;
	}
}
</style>

