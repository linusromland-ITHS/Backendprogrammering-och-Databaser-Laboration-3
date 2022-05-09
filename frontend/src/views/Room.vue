<template>Room</template>
<script>
	export default {
		name: 'Room',
		data() {
			return {
				data: {},
			};
		},
		methods: {
			async getRoom() {
				const request = await fetch(`/api/room/${this.$route.params.roomId}`);
				const data = await request.json();
				if (data.success) this.data = data.room;
				console.log(this.data);
			},
		},
		mounted() {
			this.getRoom();
		},
	};
</script>
