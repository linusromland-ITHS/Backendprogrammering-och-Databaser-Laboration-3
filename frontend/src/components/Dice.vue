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
		<div class="mt-6">
			<!--Table containg toplist for dice in values data-->
			<table class="w-full bg-slate-200 rounded-md">
				<thead>
					<tr>
						<th class="text-left p-2">Index</th>
						<th class="text-left p-2">Username</th>
						<th class="text-left p-2">Highest Value</th>
						<th class="text-left p-2">Average Value</th>
						<th class="text-left p-2">Number of rolls</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in values" :key="data">
						<td class="text-left p-2">{{ index + 1 }}</td>
						<td class="text-left p-2">{{ data.username }}</td>
						<td class="text-left p-2">{{ data.highestValue }}</td>
						<td class="text-left p-2">{{ data.averageValue }}</td>
						<td class="text-left p-2">{{ data.numberOfRolls }}</td>
					</tr>
					<tr v-if="values.length <= 0">
						<td colspan="5" class="text-center text-lg">No dice rolled yet</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { useToast } from 'vue-toastification';

	export default {
		name: 'Dice',
		data() {
			return {
				dice: '/dice/dice.png',
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
				this.values = data.data;
				console.log(data);
			},
		},
		mounted() {
			const toast = useToast();

			this.getValues();

			this.sockets.subscribe(`diceRoll-${this.$route.params.roomId}`, async function (data) {
				if (this.values.length > 0 && data.length > 0 && this.values[0].username != data[0].username)
					toast.info(`${data[0].username} has taken the top spot!`);

				this.values = data;
			});
		},
		beforeUnmount() {
			this.sockets.unsubscribe(`diceRoll-${this.$route.params.roomId}`);
		},
	};
</script>
