<template>
    <div>
        <div>

            
            <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="mb-3">
                     <button class="add--button d-flex align-items-center " style="gap:5px" @click="goBack()"> <span class="material-icons">
                        arrow_back_ios
                        </span> <span>Go Back</span></button>
                </div>
                <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-link active" id="nav-overview-tab" data-toggle="tab" href="#nav-overview" role="tab" aria-controls="nav-overview" aria-selected="true">Overview</a>
                    <a class="nav-link" id="nav-requirements-tab" data-toggle="tab" href="#nav-requirements" role="tab" aria-controls="nav-requirements" aria-selected="false">Requirements</a>
                    <a class="nav-link" id="nav-delivery-tab" data-toggle="tab" href="#nav-delivery" role="tab" aria-controls="nav-delivery" aria-selected="false">Delivery Unit</a>
                    <a class="nav-link" id="nav-delivered-tab" data-toggle="tab" href="#nav-delivered" role="tab" aria-controls="nav-delivered" aria-selected="false">Delivered Files</a>
                    <a class="nav-link" id="nav-messages-tab" data-toggle="tab" href="#nav-messages" role="tab" aria-controls="nav-messages" aria-selected="false">Messages</a>
                </div>
            </nav>
            <div class="tab-content mt-3" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab">  <Overview :overviewData = "overview" @reload="getOrder"/></div>
                <div class="tab-pane fade" id="nav-requirements" role="tabpanel" aria-labelledby="nav-requirements-tab"> <Requirements :requirementsData = "requirements"/> </div>
                <div class="tab-pane fade" id="nav-delivery" role="tabpanel" aria-labelledby="nav-delivery-tab"> Delivered Unit </div>
                <div class="tab-pane fade" id="nav-delivered" role="tabpanel" aria-labelledby="nav-delivered-tab"> <Delivered :deliveredFiles="delivered"/> </div>
                <div class="tab-pane fade" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab"> 
                    <Messages :chats="messages" @reload="getOrder"/> </div>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
import Messages from '@/components/orders/messagesModel.vue'
import Overview from '@/components/orders/overviewModel.vue'
import Requirements from '@/components/orders/requirementsModel.vue'
import Delivered from '@/components/orders/deliveredModel.vue'
export default {
    components: {
        Messages, Overview, Requirements, Delivered
    },
    data(){
        return{
            id: this.$route.params.id,
            messages: [],
            overview: [],
            requirements: [],
            delivered: []
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        getOrder(){
            this.$axios.get(`/admin/find-order/${this.id}`)
            .then((res)=>{
                console.log(res);
                this.messages = res.data.order.chats
                this.overview = res.data.order
                this.requirements = res.data.order.requirement
                this.delivered = res.data.order.delivered_items
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.getOrder()
    }
}
</script>