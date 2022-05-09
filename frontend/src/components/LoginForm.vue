<template>
	<Modal>
		<div class="w-full rounded-md p-4">
			<nav class="flex justify-center p-2 border-b">
				<button class="bg-slate-300 transition ease duration-150 rounded-md px-4 py-1 mx-1" @click="activeLogin = true">
					Login
				</button>
				<button
					class="bg-slate-200 hover:bg-slate-100 transition ease duration-150 rounded-md px-4 py-1 mx-1"
					@click="activeLogin = false"
				>
					Register
				</button>
			</nav>
			<div class="flex flex-col items-center" v-if="activeLogin">
				<h1 class="text-2xl font-bold">Login</h1>
				<form class="flex flex-col items-center w-full" @submit.prevent="login">
					<input
						type="text"
						name="email"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Email"
						v-model="emailLogin"
					/>
					<input
						type="password"
						name="password"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Password"
						v-model="passwordLogin"
					/>
					<p class="text-red-500 text-md mb-4 italic" v-if="errorLogin">
						{{ errorLogin }}
					</p>
					<button
						class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150"
					>
						Login
					</button>
				</form>
			</div>
			<div class="flex flex-col items-center" v-else>
				<h1 class="text-2xl font-bold">Register</h1>
				<form class="flex flex-col items-center w-full" @submit.prevent="register">
					<input
						type="text"
						name="username"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Username"
						v-model="usernameRegister"
					/>
					<input
						type="text"
						name="email"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Email"
						v-model="emailRegister"
					/>
					<input
						type="text"
						name="email"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Confirm Email"
						v-model="emailConfirmRegister"
					/>
					<input
						type="password"
						name="password"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Password"
						v-model="passwordRegister"
					/><input
						type="password"
						name="password"
						class="border border-gray-200 p-2 mb-4 rounded-md w-4/6"
						placeholder="Confirm Password"
						v-model="passwordConfirmRegister"
					/>
					<p class="text-red-500 text-md mb-4 italic" v-if="errorRegister">
						{{ errorRegister }}
					</p>
					<button
						class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	</Modal>
</template>
<script>
	import { useToast } from 'vue-toastification';

	import Modal from './Modal.vue';

	export default {
		name: 'LoginForm',
		components: {
			Modal,
		},
		emits: ['login'],
		data() {
			return {
				emailLogin: '',
				passwordLogin: '',
				errorLogin: '',
				usernameRegister: '',
				emailRegister: '',
				emailConfirmRegister: '',
				passwordRegister: '',
				passwordConfirmRegister: '',
				errorRegister: '',
				activeLogin: true,
			};
		},
		methods: {
			async login() {
				const toast = useToast();

				const request = await fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: this.emailLogin,
						password: this.passwordLogin,
					}),
				});
				const response = await request.json();
				if (response.success) {
					toast.success('Login successful!');
					this.$emit('login');
				} else {
					this.errorLogin = 'Email or password is incorrect';
				}
			},
			async register() {
				const toast = useToast();

				if (this.emailRegister !== this.emailConfirmRegister) {
					this.errorRegister = 'Email does not match';
					return;
				}

				if (this.passwordRegister !== this.passwordConfirmRegister) {
					this.errorRegister = 'Password does not match';
					return;
				}

				const request = await fetch('/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username: this.usernameRegister,
						email: this.emailRegister,
						password: this.passwordRegister,
					}),
				});
				const response = await request.json();
				if (response.success) {
					toast.success('Registration successful!');
					this.$emit('login');
				} else {
					this.errorRegister = response.error;
				}
			},
		},
	};
</script>
