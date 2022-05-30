<template>
    <div>
         <div class="add-item-modal">
            <div class="add-item-container">
                <div class="mb-2 text-right">
                    <span class="material-icons text-danger" role="button" @click="$emit('close')">
                        close
                    </span>
                </div>
                <h4 class="mb-3 text-dark">Add New Feature</h4>
                <div class="add-item-content">
                    <form action="" @submit.prevent="addFeature">
                       {{ product2_id }}
                        <div class="mb-3">
                            <label for="">Feature Name</label>
                            <input type="text" v-model="dataObj.name">
                        </div>
                        <div class="mb-3">
                            <label for="">Price</label>
                            <input type="text" v-model="dataObj.price" placeholder="Enter Price in $"/>
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
    props:['product2_id'],
    data(){
        return {
            dataObj: {
                name: '',
                price: '',
                product_id: ''
            },
            loading2: false,
        }
    },
    methods: {
        addFeature(){
            this.$axios.post('/admin/create-feature', this.dataObj)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                this.dataObj = {}
            })
            this.$emit('close')
            console.log(this.dataObj);
        }
    },
    mounted(){
        this.dataObj.product_id = this.product2_id
    }
}
</script>