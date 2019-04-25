<template>
	<div id="app">
		<Preloader v-if="loading"></Preloader>
		<div class="application" v-if="!loading">
			<Settings></Settings>
			<List></List>
		</div>
	</div>
</template>

<script>
import Settings from "./components/Settings";
import List from "./components/List";
import Preloader from "./components/Preloader";

export default {
	name: "app",
	components: {
		Settings,
		List,
		Preloader
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	mounted() {
		this.$store.dispatch("fetchData");
	}
};
</script>

<style <style lang="scss">
@import "~bulma/bulma.sass";
#app {
	display: flex;
	width: 100%;
	justify-content: center;
	background: rgb(245, 255, 254);
	min-height: 100vh;
}

.application {
	padding: 10px;
	display: flex;
	align-items: flex-start;
}
@media screen and (max-width: 599px) {
	.application {
		width: 100%;
		flex-direction: column;
		justify-content: flex-start;
	}
}
@media screen and (min-width: 600px) {
	.application {
		width: 80%;
		flex-direction: column;
		justify-content: flex-start;
	}
}
@media screen and (min-width: 870px) {
	.application {
		width: 80%;
		flex-direction: row;
		justify-content: center;
	}
}
@media screen and (min-width: 1200px) {
	.application {
		width: 60%;
		flex-direction: row;
		justify-content: center;
	}
}
</style>
