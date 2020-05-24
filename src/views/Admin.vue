<template>
	<div style="text-align: left; width: 100%">
		<div v-if="!isLogin">
			<div style="margin-bottom: 10px">
				<h3>관리자 페이지 로그인</h3>
			</div>
			<div style="margin-bottom: 10px">
				<mdc-textfield v-model="id" label="아이디" outline required/>
			</div>
			<div style="margin-bottom: 25px">
				<mdc-textfield v-model="pw" label="비밀번호" outline required/>
			</div>
			<div>
				<p style="color: red; margin-bottom: 30px;">{{ errorText }}</p>
				<mdc-button unelevated @click="login" v-if="!sending">로그인</mdc-button>
				<mdc-button unelevated v-else disabled>로그인 중...</mdc-button>
			</div>
		</div>
		<div v-else class="container">
			<div class="register">
				<h3>동아리 목록</h3>
				<table style="table-layout: auto;">
					<thead>
					<tr>
						<td style="width: 30%">동아리 이름</td>
						<td style="width: 30%">모집 현황</td>
						<td style="width: 40%">학생 목록</td>
					</tr>
					</thead>
					<tbody>
					<tr v-for="group of data.groups">
						<td style="width: 30%;">{{ group.name }}</td>
						<td style="width: 30%;">{{ group.available > 0 ? `${group.available}명 남음` : `마감됨` }}</td>
						<td style="width: 40%; padding: 0;">
							<table style="border-collapse: collapse;">
								<tbody>
								<tr v-for="student of (group.students === undefined ? [] : group.students)">
									<td>{{ student.num }}</td>
									<td>{{ student.name }}</td>
									<!--<td>{{ (new Date(student.registerTime)).toLocaleString() }}</td>-->
								</tr>
								</tbody>
							</table>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="unregister">
				<h3>미신청자 목록 ({{ data.unregisterStudent.length }}명)</h3>
				<table>
					<thead>
					<tr>
						<td>학번</td>
						<td>이름</td>
					</tr>
					</thead>
					<tbody>
					<tr v-for="student of data.unregisterStudent">
						<td>{{ student[0] }}</td>
						<td>{{ student[1] }}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Admin',
		data() {
			return {
				id: null,
				pw: null,
				sending: false,
				errorText: null
			}
		},
		computed: {
			isLogin() {
				return this.$store.getters.isLogin;
			},
			data() {
				return this.$store.getters.data;
			}
		},
		methods: {
			async login() {
				this.sending = true;
				this.errorText = null;
				await this.$store.dispatch('login', {id: this.id, pw: this.pw});

				this.sending = false;
				if (!this.isLogin) {
					this.errorText = "아이디나 비밀번호가 틀렸습니다.";
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		display: flex;

		flex-direction: row;
		justify-content: space-between;
	}

	.unregister {
		width: 30%;
	}

	.register {
		width: 65%;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th, td {
		border: 1px solid #ddd;
		text-align: left;
		padding: 15px;
	}

	.unregister th, .unregister td {
		padding: 10px;
	}

	.register table table th, .register table table td {
		border: 0;
	}

	.register table table td {
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}

	.register table table tr td:nth-last-child(1) {
		border-right: 0;
	}
	.register table table tr:nth-last-child(1) td {
		border-bottom: 0;
	}

	@media only screen and (max-width: 1280px) {
		.container {
			flex-direction: column;
			justify-content: center;
		}

		.container > * {
			width: 100%;
		}

		.register {
			margin-bottom: 40px;
		}
	}
</style>
