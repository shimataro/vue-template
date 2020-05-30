import Vue from "vue";

import App from "./components/App.vue";

const app = new Vue({ // eslint-disable-line @typescript-eslint/no-unused-vars
	el: '#app',
	components: {
		App,
	},
	render(createElement)
	{
		return createElement("App");
	},
});
