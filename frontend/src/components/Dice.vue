<template>
	<div class="w-full">
		<div class="w-full flex flex-col items-center">
			<div class="w-1/4 m-4">
				<img :src="dice" alt="dice" v-if="dice" />
			</div>
			<button
				class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150"
				@click="rollDice"
			>
				Roll Dice
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Dice',
		data() {
			return {
				dice: null,
				values: [],
			};
		},
		methods: {
			async rollDice() {
				const request = await fetch('/api/dice', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						roomID: this.$route.params.roomId,
					}),
				});

				const data = await request.json();
				this.dice = `/dice/dice${data.data.value}.png`;
			},
			async getValues() {
				const request = await fetch(`/api/dice/${this.$route.params.roomId}/toplist`);
				const data = await request.json();
				this.values = data.values;
				console.log(data);
			},
		},
		mounted() {
			this.getValues();
		},
	};
</script>
