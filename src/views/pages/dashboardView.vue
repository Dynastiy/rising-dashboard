<template>
    <div>
        <h2>Analytics</h2>
        <h1>Welcome Admin 😊</h1>
        <!-- Analytics  -->
        <section class="mt-4 analytics">
            <div class="price--options-1 price--options">
                <h1>
                    {{ dashboard.deposits_total }}
                </h1>
                <h6>Total Deposits</h6>
            </div>
             <div class="price--options-2 price--options">
                <h1>
                    {{ dashboard.pending_deposits_total }}
                </h1>
                <h6>Pending Deposits</h6>
            </div>
             <div class="price--options-3 price--options">
                <h1>
                    {{ dashboard.completed_deposits_total }}
                </h1>
                <h6>Completed Deposits</h6>
            </div>
             <div class="price--options-4 price--options">
                <h1>
                    {{ dashboard.canceled_deposits_total }}
                </h1>
                <h6>Cancelled Deposits</h6>
            </div>
        </section>

        <!-- Transactions Table  -->
        <section class="mt-4">
            <h3 class="text-bold">Deposits</h3>
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
                                    <!-- <th scope="col">Actions</th> -->
                                </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(deposit, index) in deposits.data" :key="index">
                                     <td> {{ index + 1 }} </td>
                                    <td>{{ timeStamp(deposit.created_at) }} </td>
                                    <td> {{ deposit.wallet_address }} </td>
                                    <td>&#8358;{{ nairaFilter(deposit.amount_naira) }} </td>
                                    <td>{{ deposit.amount_bnb }}BNB</td>
                                    <td> <a target="_blank" :href=" 'https://api.buybnb.io/' + deposit.payment_proof ">View Deposit Proof </a> </td>
                                    <td v-if="deposit.payment_report"> <a target="_blank" :href=" 'https://api.buybnb.io/' + deposit.payment_report.credit_proof ">View Credit Proof </a> </td>
                                    <!-- <td> <span :class="[deposit.status]"> {{ deposit.status }} </span> </td> -->
                                    <!-- <td><button class="view--more" @click="creditUser()">Credit</button></td> -->
                                </tr>
                                
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
            dashboard: {},
            deposits: []
        }
    },
    methods: {
        async getAnalytics(){
            let res = await this.$axios.get('/admin/dashboard')
            console.log(res.data );
            this.dashboard = res.data
            this.deposits = res.data.completed_deposits
            console.log(this.deposits);
        }
    },
    async created(){
        this.getAnalytics()
    }
}
</script>