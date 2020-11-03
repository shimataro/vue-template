<template lang="pug">
	div
		h1 Vue template
		p {{ message }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "App",
	data()
	{
		return {
			message: process.env.MESSAGE,
		};
	},
});
</script>

<style lang="sass" scoped>
h1
	color: green
</style>
