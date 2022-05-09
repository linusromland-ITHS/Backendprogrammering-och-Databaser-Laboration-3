<template>
	<div>
		<div>
			<img :src="dice" alt="dice" v-if="dice" />
			<button @click="rollDice">Roll Dice</button>
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
					data: JSON.stringify({
						roomID: this.$route.params.roomID,
					}),
				});

				const data = await request.json();
				console.log(data);
				this.dice = `/dice/dice${data.data.value}.png`;
			},
			async getValues() {
				const request = await fetch('/api/dice');
				const data = await request.json();
				this.values = data.values;
			},
		},
		mounted() {
			this.getValues();
		},
	};
</script>
