<template>
	<Modal>
		<div class="w-full rounded-md p-4">
			<nav class="flex justify-center p-2 border-b">
				<button
					class="bg-slate-200 hover:bg-slate-100 transition ease duration-150 rounded-md px-4 py-1 mx-1"
					:class="{ 'bg-gray-300': activeLogin }"
					@click="activeLogin = true"
				>
					Login
				</button>
				<button
					class="bg-slate-200 hover:bg-slate-100 transition ease duration-150 rounded-md px-4 py-1 mx-1"
					:class="{ 'bg-gray-300': !activeLogin }"
					@click="activeLogin = false"
				>
					Register
				</button>
			</nav>
			<div class="flex flex-col items-center" v-if="activeLogin">
				<h1 class="text-2xl font-bold mb-2">Login</h1>
				<form class="flex flex-col items-center w-full" @submit.prevent="login">
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="email">Email:</label>
						<input
							type="text"
							id="email"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Email"
							v-model="emailLogin"
						/>
					</div>
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="passwordLogin">Password:</label>

						<input
							type="password"
							id="passwordLogin"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Password"
							v-model="passwordLogin"
						/>
					</div>
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
				<h1 class="text-2xl font-bold mb-2">Register</h1>
				<form class="flex flex-col items-center w-full" @submit.prevent="register">
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="username">Username:</label>

						<input
							type="text"
							id="username"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Username"
							v-model="usernameRegister"
						/>
					</div>
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="emailRegister">Email:</label>

						<input
							type="text"
							id="emailRegister"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Email"
							v-model="emailRegister"
						/>
					</div>
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="emailConfirmRegister">Confirm Email:</label>

						<input
							type="text"
							id="emailConfirmRegister"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Confirm Email"
							v-model="emailConfirmRegister"
						/>
					</div>
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="passwordRegister">Password:</label>

						<input
							type="password"
							id="passwordRegister"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Password"
							v-model="passwordRegister"
						/>
					</div>
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="passwordConfirmRegister">Confirm Password:</label>
						<input
							type="password"
							id="passwordConfirmRegister"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Confirm Password"
							v-model="passwordConfirmRegister"
						/>
					</div>
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

				if (this.emailLogin === '' || this.passwordLogin === '') {
					this.errorLogin = 'Please fill in all fields';
					return;
				}

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

				if (
					this.usernameRegister === '' ||
					this.emailRegister === '' ||
					this.emailConfirmRegister === '' ||
					this.passwordRegister === '' ||
					this.passwordConfirmRegister === ''
				) {
					this.errorRegister = 'Please fill in all fields';
					return;
				}

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
