<template>
    <div>
         <div class="add-item-modal">
            <div class="add-item-container">
                <div class="mb-2 text-right">
                    <span class="material-icons text-danger" role="button" @click="$emit('close')">
                        close
                    </span>
                </div>
                <h4 class="mb-3 text-dark">Add New Plan</h4>

                <div class="add-item-content">
                    <form action="" @submit.prevent="addPlan">
                       
                        <div class="mb-3">
                            <label for="">Plan Name</label>
                            <input type="text" v-model="dataObj.name">
                        </div>
                        <div class="mb-3">
                            <label for="">Price</label>
                            <input type="text" v-model="dataObj.price" placeholder="Enter Price in $"/>
                        </div>
                        <div class="mb-3">
                            <label for="">Delivery Time</label>
                            <input type="text" v-model="dataObj.delivery_time" placeholder="Enter delivery time in days"/>
                        </div>
                        <div>
                            <div class="d-flex justify-content-center" v-if="loading2">
                                <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <button class="add--item" v-else>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['item_id'],
    data(){
        return {
            dataObj: {
                name: '',
                price: '',
                delivery_time: '',
                product_id: ''
            },
            loading2: false,
        }
    },
    methods: {
        addPlan(){
            let payload = {
                name: this.dataObj.name,
                price: this.dataObj.price,
                delivery_time: this.dataObj.delivery_time,
                product_id: this.item_id,
            }
            console.log(this.dataObj);
            this.$axios.post('/admin/create-plan', payload)
            .then((res)=>{
                console.log(res);
                this.$toastify({
                    text: `Plan Created Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
                    },
                    }).showToast();

                this.dataObj = {}
            })
            .catch((err)=>{
                console.log(err);
                this.$toastify({
                    text: `Something Went wrong`,
                    className: "info",
                    style: {
                        background: "#f00",
                    },
                    }).showToast();
            })
            .finally(()=>{
            })
            this.$emit('close')
            console.log(this.dataObj);
        }
    },
    async created(){
        this.dataObj.product_id = this.item_id
        // console.log(this.dataObj.product_id);
        // console.log(this.$store.getters.getProductId);
    }
}
</script>