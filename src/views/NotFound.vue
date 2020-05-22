<template>
	<div class="container">
		<div>
			<h2>페이지를 찾을 수 없습니다.</h2>
			<h5 @click="$router.push({name: 'Application'})">신청 페이지로 가기 ></h5>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NotFound'
	}
</script>

<style scoped>
	.container {
		text-align: left
	}

	.container > div {
		margin-bottom: 25px;
	}
</style>
