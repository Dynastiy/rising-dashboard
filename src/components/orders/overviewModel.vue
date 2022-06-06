<template>
    <div>
        <div>
            <div class="overview" v-if="overviewData">
                <div class="order--details d-flex align-items-center justify-content-between mt-3" >
                    <div class="left">
                        <div class="d-flex align-items-bottom" style="gap:5px">
                            <h5 class="text-dark text-uppercase">OrderID: #{{ createRef(overviewData.id) }}</h5><span class="small" role="button" @click="viewProduct(overviewData)" style="color:var(--secondary-color)">View Product</span>
                            <!-- <router-link :to="" style="color: var(--primary-color)">View Product</router-link> -->
                        </div>
                        <!-- <button @click="checkWallet">Get Data</button> -->
                        <small class="text-muted">
                            {{ timeStamp(overviewData.created_at) }}
                        </small>
                        
                        <div class=" dropdown mt-3" >
                                <button type="button" class="btn--other" data-toggle="dropdown" aria-expanded="false"
                                v-if="overviewData.status !== 'delivered'">
                                    Update Status
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="javascript:void(0)" v-show="overviewData.status !== 'in-progress' " @click="updateStatus(overviewData, 'in-progress')">In Progress</a>
                                    <a class="dropdown-item" href="javascript:void(0)" @click="updateStatus(overviewData, 'completed')" v-show="overviewData.status !== 'completed' ">Completed</a>
                                    <a class="dropdown-item" href="javascript:void(0)" @click="updateStatus(overviewData, 'delivered')" v-show="overviewData.status !== 'delivered' ">Delivered</a>
                                    <a class="dropdown-item text-danger" href="javascript:void(0)" @click="updateStatus(overviewData, 'canceled')" v-show="overviewData.status !== 'canceled' ">Cancelled</a>
                                </div>
                            </div>
                    </div>
                    <div class="right" :class="overviewData.status">
                        <span class="text-capitalize">Status:  {{ overviewData.status }} </span>
                    </div>
                </div>

                <hr>

                <!-- Product Details  -->

                <div>
                    <div class="product--details">
                        <div class="d-flex align-items-center justify-content-between">
                            <h5 class="text-dark text-capitalize">
                                Product: {{ overviewData.product_name }}
                            </h5>
                            <h5 class="text-dark text-capitalize">
                                Plan: {{ overviewData.plan_name }} - ${{ overviewData.total_amount }}
                            </h5>
                        </div>
                    </div>
                </div>

                <hr>

                <div class="features">
                    <!-- <p class="text-secondary"> {{  }} </p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {createRef, timeStamp} from '@/plugins/filter'
export default {
    props:['overviewData'],
    data(){
        return{
            createRef, timeStamp,
            designerId: '',
            id: this.$route.params.id,
        }
    },
    methods:{
        viewProduct(overviewData){
            this.$router.push({name:'product-details', params:{id: overviewData.product_id}})
        },
        getOrder(){
            this.$axios.get(`/admin/find-order/${this.id}`)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        updateStatus(overviewData, value){
            // console.log(overviewData, value);
            let payload = {
                status: value
            }
            this.$axios.post(`admin/edit-order-status/${overviewData.id}`, payload)
            .then((res)=>{
                console.log(res);
                this.$emit('reload')
            })
            .catch((err)=>{
                console.log(err)
            }
            )
        }
        // findUser(){
        //     this.$axios.get(`/admin/find-user/${this.designerId}`)
        //     .then((res)=>{
        //         console.log(res.data);
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     })
        // }
    },
    mounted(){
        this.getOrder();
    }
    
}
</script>