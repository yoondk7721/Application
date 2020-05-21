<template>
	<div id="app">
		<div>
			<h1>창체동아리 신청</h1>
			<hr width="100%" style="margin-bottom: 50px;">
			<router-view/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

	* {
		font-family: 'Nanum Gothic', sans-serif;
	}

	body {
		background-color: rgba(0, 0, 0, .05);
	}

	#app {
		width: 80%;
		max-width: 720px;
		margin: 0 auto;
	}

	#app > div {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		min-height: 90vh;
	}
</style>
