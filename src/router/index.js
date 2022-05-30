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
                    import ( /* webpackChunkName: "about" */ '../views/pages/categories/viewCategories.vue')
            },
            {
                path: '/products',
                name: 'Products',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/products/viewProducts.vue')
            },
            {
                path: '/products/:id',
                name: 'product-details',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/products/_id.vue')
            },
            {
                path: '/all-orders',
                name: 'Orders',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/allOrders.vue')
            },
            {
                path: '/pending-orders',
                name: 'Pending',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/pendingOrders.vue')
            },
            {
                path: '/delivered-orders',
                name: 'delivered-orders',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/deliveredOrders.vue')
            },
            {
                path: '/in-progress-orders',
                name: 'In-progress',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/inProgress.vue')
            },
            {
                path: '/completed-orders',
                name: 'completed',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/completedOrders.vue')
            },
            {
                path: '/cancelled-orders',
                name: 'Cancelled',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/cancelledOrders.vue')
            },
            {
                path: '/orders/:id',
                name: 'order-details',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/orders/_id.vue')
            },
            {
                path: '/user-list',
                name: 'User List',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/pages/user/userView.vue')
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
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router