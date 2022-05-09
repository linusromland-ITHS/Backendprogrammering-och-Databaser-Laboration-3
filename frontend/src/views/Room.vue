<template>
	<div class="w-full flex justify-center">
		<div class="w-10/12">
			<h1 class="text-3xl font-semibold border-b py-2">{{ data.name }}</h1>
			<div class="w-full flex flex-wrap">
				<div class="w-full md:w-1/2">
					<h2>DiceGame</h2>
				</div>
				<div class="w-full md:w-1/2">
					<h2>Chat</h2>
					<Chat />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Chat from '../components/Chat.vue';

	export default {
		name: 'Room',
		components: {
			Chat,
		},
		data() {
			return {
				data: {},
			};
		},
		methods: {
			async getRoom() {
				const request = await fetch(`/api/room/?roomID=${this.$route.params.roomId}`);
				const data = await request.json();
				console.log(data);
				if (data.success) this.data = data.room;
				console.log(this.data);
			},
		},
		mounted() {
			this.getRoom();

			this.sockets.subscribe(this.$route.params.roomId, function (data) {
				console.log(data);
			});
		},
		beforeUnmount() {
			this.sockets.unsubscribe(this.$route.params.roomId);
		},
	};
</script>
