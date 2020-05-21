<template>
	<div class="container">
		<div>
			<b>학번을 입력하세요. (예시: 10101)</b><br>
			<mdc-textfield v-model="num" label="학번" outline required :helptext="numHelperText" helptext-validation :valid="numValid"/>
		</div>
		<div>
			<b>이름을 입력하세요.</b><br>
			<mdc-textfield style="margin: 0;" v-model="name" label="이름" outline required :helptext="nameHelperText" helptext-validation :valid="nameValid"/>
		</div>
		<div>
			<b style="margin-bottom: 20px; display: block;">동아리를 선택하세요.</b>
			<mdc-linear-progress v-if="groupList === null" indeterminate></mdc-linear-progress>
			<div v-else v-for="data of (groupList ? groupList : [])">
				<mdc-radio name="groups" :value="String(data.id)" :key="data.id" v-model="group" :label="`${data.name}, ${!data.available ? '마감됨' : `${data.available}명 남음`}`" :disabled="!data.available"/>
				<br>
			</div>
		</div>
		<div>
			<p style="color: red;">{{ errorText }}</p>
			<mdc-button unelevated @click="send" v-if="!sending">신청</mdc-button>
			<mdc-button unelevated v-else disabled>신청 중...</mdc-button>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: 'Application',
		data() {
			return {
				num: null,
				name: null,
				group: null,
				groupList: null,
				errorText: null,
				sending: false
			}
		},
		computed: {
			numHelperText() {
				if (typeof this.num !== "string" || !this.num.length) return "학번을 입력하세요."
				else if (isNaN(this.num)) return "학번을 올바르게 입력하세요."
				else if (this.num.length !== 5) return "학번을 5자리로 입력하세요."
				else return "";
			},
			nameHelperText() {
				if (typeof this.name !== "string" || !this.name.length) return "이름을 입력하세요."
				else if (this.name.length !== 2 && this.name.length !== 3) return "이름을 올바르게 입력하세요."
				else return "";
			},
			numValid() {
				return this.numHelperText === "";
			},
			nameValid() {
				return this.nameHelperText === "";
			}
		},
		methods: {
			getGroupsList() {
				return new Promise(async (r) => {
					await new Promise(r1 => {
						setTimeout(() => r1(), 2000)
					});

					r([
						{
							id: 0,
							name: "국어 동아리",
							available: 10
						},
						{
							id: 1,
							name: "수학 동아리",
							available: 5
						},
						{
							id: 2,
							name: "정보 동아리",
							available: 0
						},
					]/*await axios.post("https://group.dnhs.me/api/groups", {}, {responseType: 'json'}).data*/);
				});
			},
			send() {
				this.errorText = "";
				this.sending = true;
				if (!this.numValid) {
					this.errorText = this.numHelperText;
					this.sending = false;
					return;
				}
				if (!this.nameValid) {
					this.errorText = this.nameHelperText;
					this.sending = false;
					return;
				}
				if (this.groupList === null) {
					this.errorText = "잠시 후 시도해주세요.\n동아리 목록을 불러오고 있습니다...";
					this.sending = false;
					return;
				}
				let selected = this.groupList.filter(v => v.id === parseInt(this.group));
				if (!selected.length) {
					this.errorText = "신청할 동아리를 선택하세요.";
					this.sending = false;
					return;
				}
				selected = selected.shift();
				if (!selected.available){
					this.errorText = "선택한 동아리는 신청이 마감되었습니다.";
					return;
				}
				axios.post("https://group.dnhs.me/api/application/", {
					num: this.num,
					name: this.name,
					group: parseInt(this.group)
				}, {
					responseType: "json",
					timeout: 1000 * 10,
					timeoutErrorMessage: "timeout"
				}).then(res => {
					this.sending = false;
				}).catch(res => {
					this.sending = false;
					if (res.message === "timeout") {
						this.errorText = "timeout";
					}
				});
			}
		},
		created() {
			this.getGroupsList().then(data => {
				this.groupList = data;
			});
		}
	}
</script>

<style scoped>
	.container {
		text-align: left
	}

	.container > div {
		margin-bottom: 25px;
	}

	b {
		font-size: 120%;
	}
</style>
