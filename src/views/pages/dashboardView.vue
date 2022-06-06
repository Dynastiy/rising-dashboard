<template>
    <div>
        <h2>Analytics</h2>
        <h1>Welcome Admin 😊</h1>
        <!-- Analytics  -->
        <section class="mt-4 analytics">
            <div class="price--options-1 price--options">
                <h1>
                    {{ analytics.orders_total }}
                </h1>
                <h6>Total Orders</h6>
            </div>
             <div class="price--options-2 price--options">
                <h1>
                    {{ analytics.users_total }}
                </h1>
                <h6>Users</h6>
            </div>
             <div class="price--options-3 price--options">
                <h1>
                    {{ analytics.products_total }}
                </h1>
                <h6>Products</h6>
            </div>
             <div class="price--options-4 price--options">
                <h1>
                    {{ analytics.completed_orders_total }}
                </h1>
                <h6>Completed Orders</h6>
            </div>
            <div class="price--options-3 price--options">
                <h1>
                    {{ analytics.delivered_orders_total }}
                </h1>
                <h6>Delivered Orders</h6>
            </div>
             <div class="price--options-4 price--options">
                <h1>
                    {{ analytics.pending_orders_total }}
                </h1>
                <h6>Pending Orders</h6>
            </div>
             <div class="price--options-2 price--options">
                <h1>
                    {{ analytics.inprogress_orders_total }}
                </h1>
                <h6>In Progress Orders</h6>
            </div>
             <div class="price--options-1 price--options">
                <h1>
                    {{ analytics.canceled_orders_total }}
                </h1>
                <h6>Cancelled Orders</h6>
            </div>
        </section>

        <!-- Transactions Table  -->
        <section class="mt-4">
            <h3 class="text-bold">All orders</h3>
             <div class="mt-4 other--tables">
                     <div class="table-responsive">
                            <table class="table table-centered table-nowrap mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Buyer</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                               <tbody>
                                
                                
                                <!-- <tr v-if="loading">Fetching Data . . .</tr> -->
                                <tr role="button" @click="view_more(order)" v-for="(order, index) in analytics.all_orders.data" :key="index">
                                    <td>  {{ index+1 }} </td>
                                    <td> {{ order.user.first_name }} {{ order.user.last_name }} </td>
                                    <td> {{ order.product_name }} </td>
                                    <td> ${{ order.total_amount }} </td>
                                    <td> <span :class="order.status"> {{ order.status }} </span> </td>
                                    <td> {{ timeStamp(order.created_at) }} </td>
                                    <td> <button class="add--button" @click="view_more(order)">View More</button>  </td>
                                </tr>
                                <tr v-show="analytics.all_orders.total === 0 " class="text-danger">Nothing Here . . .</tr>
                                </tbody>
                            </table>
                        </div>
                </div>
        </section>
    </div>
</template>

<script>
 import { nairaFilter, percentFilter, percentageFilter, timeStamp } from '@/plugins/filter.js'
export default {
    data(){
        return {
            nairaFilter, percentFilter, percentageFilter, timeStamp,
            
        }
    },
    methods: {
        async getAnalytics(){
            let res = await this.$axios.get('/admin/dashboard')
            console.log(res.data );
            // this.analytics = 
            let dashboard = res.data
            this.$store.dispatch('dashboard', { dashboard })
        },
       
      view_more(order){
        this.$router.push({ name: 'order-details', params:{ id: order.id } })
      },
    },
    computed: {
      analytics() {
        return this.$store.getters.getDashboard;
      }
    },
    beforeMount(){
        this.getAnalytics()
    }
}
</script>