<template>
	<div class="flex flex-col">
		<button class="bg-gray-500 hover:bg-gray-600 text-white font-bold p-2" @click="showCreateRoomForm = true">Create new room</button>
		<CreateRoomForm v-if="showCreateRoomForm" @created="created" @cancel="showCreateRoomForm = false" />
		<ul class="flex flex-wrap justify-center">
			<li v-for="(room, index) in rooms" :key="index" class="w-10/12 md:w-3/12 m-2">
				<router-link :to="`/room/${room.id}`">
					<section class="w-full p-2 rounded-md bg-slate-300 hover:bg-slate-200 transition duration-150 ease cursor-pointer">
						<p class="text-2xl font-semibold">{{ room.name }}</p>
						<div>
							<p class="text-sm">
								Room created by: <span class="font-semibold">{{ room.user.username }}</span>
							</p>
							<p class="text-sm">
								Created <span class="font-semibold">{{ convertToTime(room.createdAt) }}</span>
							</p>
						</div>
					</section>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import CreateRoomForm from '../components/CreateRoomForm.vue';
	export default {
		name: 'Home',
		inject: ['dayjs'],
		components: {
			CreateRoomForm,
		},
		data() {
			return {
				showCreateRoomForm: false,
				rooms: [],
			};
		},
		methods: {
			async getRooms() {
				const request = await fetch('/api/room');
				const data = await request.json();
				if (data.success) this.rooms = data.rooms;
			},
			created() {
				this.getRooms();
				this.showCreateRoomForm = false;
			},
			navigateToRoom(roomId) {
				this.$router.push({ path: `/room/${roomId}` });
			},
			convertToTime(date) {
				return this.dayjs(date).fromNow();
			},
		},
		mounted() {
			this.getRooms();

			this.sockets.subscribe('getRoom', () => {
				this.getRooms();
			});
		},
		beforeUnmount() {
			this.sockets.unsubscribe('getRoom');
		},
	};
</script>
