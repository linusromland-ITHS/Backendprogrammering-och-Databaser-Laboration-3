<template>
	<div class="bg-cyan-500 w-full" id="navbar">
		<nav class="flex items-center justify-center md:justify-between flex-wrap p-6">
			<div class="hidden md:flex items-center flex-shrink-0 text-white mr-6">
				<router-link to="/" class="text-xl font-bold">DiceGame</router-link>
			</div>
			<div class="flex items-center">
				<div class="flex items-center flex-shrink-0 text-white mr-6">
					<a
						v-if="!loggedIn"
						@click="showLoginForm = true"
						class="text-lg font-semibold hover:text-slate-300 transition ease duration-150 cursor-pointer"
						>Login</a
					>
					<div v-else class="flex justify-between md:justify-center items-center">
						<p class="mx-8 md:mx-2 text-md">
							Logged in as: <span class="font-semibold">{{ username }}</span>
						</p>
						<a @click="logout" class="text-lg font-semibold hover:text-slate-300 transition ease duration-150 cursor-pointer">
							Logout
						</a>
					</div>
				</div>
			</div>
		</nav>
	</div>
	<LoginForm v-if="showLoginForm" @login="getUser" />
</template>
<script>
	import { useToast } from 'vue-toastification';

	import LoginForm from './LoginForm.vue';
	export default {
		name: 'Navbar',
		components: {
			LoginForm,
		},
		data() {
			return {
				loggedIn: false,
				showLoginForm: false,
				username: '',
			};
		},
		methods: {
			async getUser() {
				this.showLoginForm = false;

				const request = await fetch('/api/user');
				const response = await request.json();
				this.loggedIn = response.success;
				if (response.success) {
					this.username = response.user.username;
				} else {
					this.showLoginForm = true;
				}
			},
			async logout() {
				const toast = useToast();

				const request = await fetch('/api/logout');
				const response = await request.json();
				if (response.success) {
					this.loggedIn = false;
					this.username = '';
					this.getUser();
					toast.success('Logged out successfully');
				} else {
					toast.error('Logout failed');
				}
			},
		},
		created() {
			this.getUser();
		},
	};
</script>
