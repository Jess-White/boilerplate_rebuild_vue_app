import Vue from 'vue';
import VueRouter from 'vue-router';

import UsersNew from '../views/UsersNew.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
// import About from '../views/About.vue';

import Dashboard from '../views/Dashboard.vue';

import GrantsIndex from '../views/GrantsIndex.vue';
import GrantsFinalizeShow from '../views/GrantsFinalizeShow.vue';
import GrantsShow from '../views/GrantsShow.vue';
// import GrantsEdit from '../views/GrantsEdit.vue';

import ReportsNew from '../views/ReportsNew.vue';
import ReportsIndex from '../views/ReportsIndex.vue';
import ReportsShow from '../views/ReportsShow.vue';
import ReportsFinalizeShow from '../views/ReportsFinalizeShow.vue';

// import ReportsEdit from '../views/ReportsEdit.vue';

import BiosIndex from '../views/BiosIndex.vue';
// import BiosEdit from '../views/BiosEdit.vue';
import BiosShow from '../views/BiosShow.vue';

import BoilerplatesIndex from '../views/BoilerplatesIndex.vue';
// import BoilerplatesEdit from '../views/BoilerplatesEdit.vue';
import BoilerplatesShow from '../views/BoilerplatesShow.vue';

import CategoriesIndex from '../views/CategoriesIndex.vue';
// import CategoriesEdit from '../views/CategoriesEdit.vue';
import CategoriesShow from '../views/CategoriesShow.vue';

import FundingOrgsIndex from '../views/FundingOrgsIndex.vue';
// import FundingOrgsEdit from '../views/FundingOrgsEdit.vue';
import FundingOrgsShow from '../views/FundingOrgsShow.vue';

import OrganizationsIndex from '../views/OrganizationsIndex.vue';
// import OrganizationsEdit from '../views/OrganizationsEdit.vue';
import OrganizationsShow from '../views/OrganizationsShow.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/users/new', name: 'users-new', component: UsersNew },

	{ path: '/login', name: 'login', component: Login },
	{ path: '/logout', name: 'logout', component: Logout },

	{ path: '/', name: 'root', component: Login },

	{ path: '/dashboard', name: 'dashboard', component: Dashboard },

	{ path: '/grants', name: 'grants-index', component: GrantsIndex },
	{ path: '/grants/:id', name: 'grants-show', component: GrantsShow },
	{
		path: '/grants/:id/finalize',
		name: 'grants-finalize-show',
		component: GrantsFinalizeShow,
	},

	{ path: '/reports', name: 'reports-index', component: ReportsIndex },
	{ path: '/reports/new', name: 'reports-new', component: ReportsNew },
	{ path: '/reports/:id', name: 'reports-show', component: ReportsShow },
	{
		path: '/reports/:id/finalize',
		name: 'reports-finalize-show',
		component: ReportsFinalizeShow,
	},

	// {path: '/reports/:id/edit', name: 'reports-edit', component: ReportsEdit},

	{ path: '/categories', name: 'categories-index', component: CategoriesIndex },
	{
		path: '/categories/:id',
		name: 'categories-show',
		component: CategoriesShow,
	},
	// {path: '/categories/:id/edit', name: 'categories-edit', component: CategoriesEdit},

	{
		path: '/organizations',
		name: 'organizations-index',
		component: OrganizationsIndex,
	},
	{
		path: '/organizations/:id',
		name: 'organizations-show',
		component: OrganizationsShow,
	},
	// {path: '/organizations/:id/edit', name: 'organizations-edit', component: OrganizationsEdit},

	{
		path: '/funding_orgs',
		name: 'funding-orgs-index',
		component: FundingOrgsIndex,
	},
	{
		path: '/funding_orgs/:id',
		name: 'funding-orgs-show',
		component: FundingOrgsShow,
	},
	// {path: '/funding-orgs/:id/edit', name: 'funding-orgs-edit', component: FundingOrgsEdit},

	{ path: '/bios', name: 'bios-index', component: BiosIndex },
	{ path: '/bios/:id', name: 'bios-show', component: BiosShow },
	// {path: '/bios/:id/edit', name: 'bios-edit', component: BiosEdit},

	{
		path: '/boilerplates',
		name: 'boilerplates-index',
		component: BoilerplatesIndex,
	},
	{
		path: '/boilerplates/:id',
		name: 'boilerplates-show',
		component: BoilerplatesShow,
	},
	// {path: '/boilerplates/:id/edit', name: 'boilerplates-edit', component: BoilerplatesEdit},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// router.beforeEach((to, from, next) => {
// 	if (to.name === 'login' || to.name === 'users-new') {
// 		return next();
// 	}
// 	const jwt = localStorage.getItem('jwt');
// 	if (jwt) {
// 		return next();
// 	}
// 	next('/login/');
// });

export default router;
