<template>
    <div>
       <h3 class="text-bold">Completed Transactions</h3>
             <div class="mt-4 other--tables">
                     <div class="table-responsive">
                            <table class="table table-centered table-nowrap mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Wallet Address </th>
                                    <th scope="col">Amount (NGN)</th>
                                    <th scope="col">Amount (BNB)</th>
                                    <th scope="col">Payment Proof</th>
                                    <th scope="col">Credit Proof</th>
                                    <!-- <th scope="col">Status</th> -->
                                    <!-- <th scope="col">Actions</th> -->
                                </tr>
                                </thead>
                               <tbody>
                                
                                
                                <tr v-if="loading">Fetching Data . . .</tr>
                                 <tr v-for="(deposit, index) in deposits.data" :key="index" v-else>
                                     <td> {{ index + 1 }} </td>
                                    <td>{{ timeStamp(deposit.created_at) }} </td>
                                    <td> {{ deposit.wallet_address }} </td>
                                    <td>&#8358;{{ nairaFilter(deposit.amount_naira) }} </td>
                                    <td>{{ deposit.amount_bnb }}BNB</td>
                                    <td> <a target="_blank" :href=" 'https://api.buybnb.io/' + deposit.payment_proof "> View Deposit Proof  </a> </td>
                                    <!-- <td> <span :class="[deposit.status]"> {{ deposit.status }} </span> </td> -->
                                    <td v-if="deposit.payment_report"> <a target="_blank" :href=" 'https://api.buybnb.io/' + deposit.payment_report.credit_proof "> View Credit Proof</a> </td>
                                    
                                </tr>
                                <tr v-show="deposits.total === 0 " class="text-danger">Nothing Here . . .</tr>
                                </tbody>
                            </table>
                        </div>
                 <div>
                          <pagination :meta="deposits" @next="getDeposits"/>
                        </div>
                </div>
    </div>
</template>


<script>
 import { nairaFilter, percentFilter, percentageFilter, timeStamp } from '@/plugins/filter.js'
 import pagination from '@/components/appPagination.vue'
export default {
    components:{
        pagination
    },
    data(){
        return {
            nairaFilter, percentFilter, percentageFilter, timeStamp,
            loading: false,
            deposits: []
        }
    },
    methods: {
        async getDeposits(page=1){
            this.loading = true;
            try {
                let res = await this.$axios.get(`/admin/get-deposits?page=${page}&status=completed`)
            console.log(res.data);
            this.deposits = res.data
            } catch (error) {
                console.log(error);
            }
            this.loading = false
        }
    },
    async created(){
        this.getDeposits()
    }
}
</script>