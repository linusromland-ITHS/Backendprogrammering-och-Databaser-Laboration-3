<template>
	<div class="w-full flex justify-center">
		<li v-for="(message, index) in messages" :key="index">
			<p><span class="font-bold">linusromland:</span>{{ message.message }}</p>
		</li>
		<input type="text" v-model="messageInput" @keyup.enter="sendMessage" />
	</div>
</template>

<script>
	export default {
		name: 'Chat',
		data() {
			return {
				messages: [],
				messageInput: '',
			};
		},
		methods: {
			async getMessages() {
				const request = await fetch(`/api/messages/?roomID=${this.$route.params.roomId}`);
				const data = await request.json();
				if (data.success) this.messages = data.messages;
			},
			sendMessage() {
				const message = {
					roomID: this.$route.params.roomId,
					message: this.messageInput,
				};
				this.$socket.emit('message', message);
				this.messageInput = '';
			},
			mounted() {
				this.getMessages();

				this.sockets.subscribe(`messages-${this.$route.params.roomId}`, function (data) {
					this.messages.push(data);
				});
			},
			beforeUnmount() {
				this.sockets.unsubscribe(`messages-${this.$route.params.roomId}`);
			},
		},
	};
</script>
