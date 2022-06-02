<template>
    <div>
       <h3 class="text-bold">Pending Orders</h3>
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
                                <tr  v-for="(order, index) in orders.pending_orders.data" :key="index" v-else>
                                    <td>  {{ index+1 }} </td>
                                    <td> {{ order.user.first_name }} {{ order.user.last_name }} </td>
                                    <td role="button" @click="view_more(order)"> {{ order.product_name }} </td>
                                    <td> ${{ order.total_amount }} </td>
                                    <td> <span :class="order.status"> {{ order.status }} </span> </td>
                                    <td> {{ timeStamp(order.created_at) }} </td>
                                    <td class="d-flex " style="gap:15px"> <button class="add--button" @click="view_more(order)">View More</button> 
                                        <button class="add--button btn-dark btn" v-if="order.designer_id" disabled>Assigned</button>
                                        <div class="btn-group dropleft" v-else>
                                          <button class="add--button" data-toggle="dropdown" aria-expanded="false" >Assign</button> 
                                          <div class="dropdown-menu">
                                              <a class="dropdown-item" href="javascript:void(0)" v-for="designer in designers" :key="designer.id" @click="assign(order, designer)"> {{ designer.first_name }} {{ designer.first_name }} </a>
                                          </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="orders.pending_orders.total === 0 " class="text-danger">Nothing Here . . .</tr>
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
            designers:[],
        }
    },
    methods:{
      view_more(order){
        this.$router.push({ name: 'order-details', params:{ id: order.id } })
      },
      getDesigners(){
        this.$axios.get('all-designers')
        .then((res)=>{
          console.log(res);
          this.designers = res.data.designers
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      assign(order, designer){
        let payload = {designer_id: designer.id}
        this.$axios.post(`admin/order-assign-designer/${order.id}`, payload)
        .then((res)=>{
          console.log(res);
          // this.getAnalytics()
        })
        .catch((err)=>{
          console.log(err);
        })
        .finally(()=>{
          // this.orders = this.$store.getters.getDashboard
          this.getAnalytics()
        })
        this.getAnalytics()
        console.log(order.id);
        console.log(designer.id);
      },
      async getAnalytics(){
            let res = await this.$axios.get('/admin/dashboard')
            console.log(res.data );
            // this.analytics = 
            this.orders = res.data
            // let dashboard = res.data
            // this.$store.dispatch('dashboard', { dashboard })
        },
    },
    beforeMount(){
      // this.orders = this.$store.getters.getDashboard
      // console.log(this.orders);
    },
    mounted(){
      this.getDesigners()
      this.getAnalytics()
    }
   
}
</script>