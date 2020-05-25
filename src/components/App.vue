<template lang="pug">
	div
		h1 Vue template
		p {{ message }}
</template>

<script lang="ts">
import Vue from "vue";

const component: Vue.Component = {
	name: "App",
	data: () =>
	{
		return {
			message: "hell, word",
		};
	},
};

export default component;
</script>

<style lang="sass" scoped>
h1
	color: green
</style>
