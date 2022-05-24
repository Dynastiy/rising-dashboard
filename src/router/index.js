import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '../views/layouts/dashboardLayout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: DashboardLayout,
        children: [{
                path: '/',
                name: 'Dashboard',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/dashboardView.vue')
            },
            {
                path: '/categories',
                name: 'Categories',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/viewCategories.vue')
            },
            {
                path: '/products',
                name: 'Products',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/viewProducts.vue')
            },
            {
                path: '/transactions',
                name: 'Transactions',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/allTransactions.vue')
            },
            {
                path: '/pending',
                name: 'Pending',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/pendingTransactions.vue')
            },
            {
                path: '/completed',
                name: 'completed',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/completedTransactions.vue')
            },
            {
                path: '/cancelled',
                name: 'Cancelled',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/cancelledTransactions.vue')
            },
            {
                path: '/user-list',
                name: 'User List',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/userView.vue')
            },
        ]
    },
    {
        path: '/sign-in',
        name: 'Sign In',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/auth/signIn.vue')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router