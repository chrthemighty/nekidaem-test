<template>
	<div class="preloader">
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="circle"></div>
	</div>
</template>

<style>
.preloader {
	position: fixed;
	top: 0;
	left: 0;
	background: rgb(245, 255, 254);
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.circle {
	width: 30px;
	margin-left: 10px;
	border-radius: 50%;
	transform: scale(0);
	height: 30px;
	background: rgb(0, 132, 141);
}

.circle:nth-child(1) {
	animation: loader 0.5s infinite forwards;
}

.circle:nth-child(2) {
	animation: loader 0.5s infinite forwards 0.1s;
}

.circle:nth-child(3) {
	animation: loader 0.5s infinite forwards 0.2s;
}

@keyframes loader {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}
</style>
