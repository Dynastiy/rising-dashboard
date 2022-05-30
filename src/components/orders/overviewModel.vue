<template>
    <div>
        <div>
            <div class="overview" v-if="overviewData">
                <div class="order--details d-flex align-items-center justify-content-between mt-3" >
                    <div class="left">
                        <div>
                            <h5 class="text-dark text-uppercase">OrderID: #{{ createRef(overviewData.id) }}</h5>
                            <!-- <router-link :to="" style="color: var(--primary-color)">View Product</router-link> -->
                        </div>
                        <small class="text-muted">
                            {{ timeStamp(overviewData.created_at) }}
                        </small>
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
            createRef, timeStamp
        }
    }
}
</script>