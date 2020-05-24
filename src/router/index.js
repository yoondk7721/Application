import Vue from 'vue'
import Router from 'vue-router'
import Application from "../views/Application";
import NotFound from "../views/NotFound";
import Admin from "../views/Admin";

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Application',
			component: Application
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Admin
		},
		{
			path: '/*',
			name :'404',
			component: NotFound
		}
	]
})
