<template>
	<Modal>
		<div class="flex flex-col items-center">
			<h1 class="text-2xl font-bold">Login</h1>
			<form class="flex flex-col items-center" @submit.prevent="login">
				<input type="text" name="email" class="border border-gray-400 p-2 mb-4" placeholder="Email" v-model="email" />
				<input type="password" name="password" class="border border-gray-400 p-2 mb-4" placeholder="Password" v-model="password" />
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Login
				</button>
			</form>
		</div>
	</Modal>
</template>
<script>
	import Modal from './Modal.vue';
	export default {
		name: 'LoginForm',
		components: {
			Modal,
		},
		emits: ['login'],
		data() {
			return {
				email: '',
				password: '',
			};
		},
		methods: {
			async login() {
				const request = await fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: this.email,
						password: this.password,
					}),
				});
				const response = await request.json();
				if (response.success) {
					this.$emit('login', response.user);
				} else {
					alert(response.message);
				}
			},
		},
	};
</script>
