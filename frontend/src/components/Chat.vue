<template>
	<div class="w-full">
		<ul>
			<li v-for="(message, index) in messages" :key="index">
				<p>
					<span class="font-bold">{{ message.user.username }}:</span> {{ message.message }}
				</p>
			</li>
		</ul>
		<input
			type="text"
			v-model="messageInput"
			@keyup.enter="sendMessage"
			class="border border-gray-200 p-1 rounded-md w-full"
			placeholder="Write your message here..."
		/>
	</div>
</template>

<script>
	export default {
		name: 'Chat',
		data() {
			return {
				messages: [],
				messageInput: '',
				user: {},
			};
		},
		methods: {
			async getMessages() {
				const request = await fetch(`/api/message/?roomID=${this.$route.params.roomId}`);
				const data = await request.json();
				if (data.success) this.messages = data.messages;
			},
			sendMessage() {
				const message = {
					roomID: this.$route.params.roomId,
					message: this.messageInput,
					user: this.user,
				};
				this.$socket.emit('message', message);
				this.messageInput = '';
			},
			async getUser() {
				const response = await fetch('/api/user');
				const data = await response.json();
				this.user = data.user;
			},
		},
		mounted() {
			this.getMessages();
			this.getUser();

			this.sockets.subscribe(`messages-${this.$route.params.roomId}`, function (data) {
				this.messages.push(data);
			});
		},
		beforeUnmount() {
			this.sockets.unsubscribe(`messages-${this.$route.params.roomId}`);
		},
	};
</script>
