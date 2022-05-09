<template>
	<div class="w-full flex justify-center h-full">
		<div class="w-10/12 h-full">
			<h1 class="text-3xl font-semibold border-b py-2">{{ data.name }}</h1>
			<div class="w-full flex flex-wrap h-full justify-around">
				<div class="w-full md:w-5/12 m-2 flex items-center flex-col">
					<h2 class="text-2xl font-semibold">DiceGame</h2>
					<Dice />
				</div>
				<div class="w-full md:w-5/12 m-2 flex items-center flex-col">
					<h2 class="text-2xl font-semibold">Chat</h2>
					<Chat />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Chat from '../components/Chat.vue';
	import Dice from '../components/Dice.vue';

	export default {
		name: 'Room',
		components: {
			Chat,
			Dice,
		},
		data() {
			return {
				data: {},
				user: {},
			};
		},
		methods: {
			async getRoom() {
				const request = await fetch(`/api/room/?roomID=${this.$route.params.roomId}`);
				const data = await request.json();
				if (data.success) this.data = data.room;
			},
		},
		mounted() {
			this.getRoom();

			this.sockets.subscribe(this.$route.params.roomId, function (data) {
				console.log({
					message: data.message,
				});
			});
		},
		beforeUnmount() {
			this.sockets.unsubscribe(this.$route.params.roomId);
		},
	};
</script>
