<template>
	<Modal>
		<div class="w-full rounded-md p-4">
			<div class="flex flex-col items-center">
				<h1 class="text-2xl font-bold mb-2">Create new room</h1>
				<form class="flex flex-col items-center w-full" @submit.prevent="createRoom">
					<div class="flex flex-col w-4/6">
						<label class="text-sm font-bold" for="roomName">Room name:</label>

						<input
							type="text"
							id="roomName"
							class="border border-gray-200 p-2 mb-4 rounded-md"
							placeholder="Room name"
							v-model="name"
						/>
					</div>
					<p class="text-red-500 text-md mb-4 italic" v-if="error">
						{{ error }}
					</p>
					<div>
						<button
							class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline transition ease duration-150"
							@click="$emit('cancel')"
						>
							Cancel</button
						><button
							class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline transition ease duration-150"
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	</Modal>
</template>
<script>
	import { useToast } from 'vue-toastification';

	import Modal from './Modal.vue';

	export default {
		name: 'CreateRoomForm',
		components: {
			Modal,
		},
		emits: ['created', 'cancel'],
		data() {
			return {
				name: '',
				error: '',
			};
		},
		methods: {
			async createRoom() {
				const toast = useToast();

				if (this.name.length < 3) {
					this.error = 'Room name must be at least 3 characters long';
					return;
				}
				if (this.name.length > 20) {
					this.error = 'Room name must be at most 20 characters long';
					return;
				}
				const request = await fetch('/api/room', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: this.name,
					}),
				});
				const data = await request.json();
				if (data.success) {
					this.name = '';
					this.error = '';
					toast.success('Room created successfully');
					this.$emit('created');
				} else {
					this.error = data.error;
				}
			},
		},
	};
</script>
