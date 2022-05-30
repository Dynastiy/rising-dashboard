<template>
    <div>
       <h3 class="text-bold">In Progress Orders</h3>
             <div class="mt-4 other--tables">
                  <!-- <div class="search--field d-flex align-items-center ml-auto">
                    <span class="material-icons">
                        search
                    </span>
                    <input type="search" v-model="search_data" name="" id="" placeholder="Search by Wallet Address or Reference No. . . " @keyup="getDeposit">
                </div> -->
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
                                
                                
                                <tr v-if="loading">Fetching Data . . .</tr>
                                <tr role="button" @click="view_more(order)" v-for="(order, index) in orders.inprogress_orders.data" :key="index" v-else>
                                    <td>  {{ index+1 }} </td>
                                    <td> {{  }} </td>
                                    <td> {{ order.product_name }} </td>
                                    <td> {{ order.total_amount }} </td>
                                    <td> <span :class="order.status"> {{ order.status }} </span> </td>
                                    <td> {{ timeStamp(order.created_at) }} </td>
                                    <td> <button class="add--button" @click="view_more(order)">View More</button>  </td>
                                </tr>
                                <tr v-show="orders.inprogress_orders.total === 0 " class="text-danger">Nothing Here . . .</tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                          <!-- <pagination :meta="deposits" @next="getDeposits"/> -->
                        </div>
                </div>
    </div>
</template>


<script>
// import pagination from '@/components/appPagination.vue'
 import { nairaFilter, percentFilter, percentageFilter, timeStamp } from '@/plugins/filter.js'
export default {
  components:{
    // pagination
  },
    data(){
        return {
            nairaFilter, percentFilter, percentageFilter, timeStamp,
            loading: false,
            orders: [],
        }
    },
    methods:{
      view_more(order){
        this.$router.push({ name: 'order-details', params:{ id: order.id } })
      },
    },
    beforeMount(){
      this.orders = this.$store.getters.getDashboard
      console.log(this.orders);
    }
   
}
</script>