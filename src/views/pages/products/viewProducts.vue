<template>
    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between mb-3 ">
                <h4>All Products</h4>
                <div class="d-flex align-items-center justify-content-end add--button" @click="createNew" role="button" style="gap:5px">
                    <span class="material-icons">
                        add_circle
                    </span>
                    <span>Add Product</span>
                </div>
            </div>
            <div class="items">
                <div class="category shadow-lg p-3 bg-white rounded-lg" v-for="(item, index) in products.data" :key="index">
                    <div class="d-flex justify-content-between">
                        <img class="mb-3 rounded-circle" :src="baseurl + 'services/photos/' + item.app_icon + '?' + Date.now() " alt="">
                        <div class="d-flex align-items-center" style="gap: 5px">
                            
                           
                            <div class="btn-group dropleft">
                                <span type="button"  class="material-icons" data-toggle="dropdown" aria-expanded="false">
                                    more_vert
                                </span>
                                <div class="dropdown-menu">
                                    <!-- <a class="dropdown-item" href="javascript:void(0)" @click="editProductModal(item)">Edit Product</a> -->
                                    <a class="dropdown-item" href="javascript:void(0)" @click="addPlan(item)">Add Plan</a>
                                    <a class="dropdown-item" href="javascript:void(0)"  @click="addFeature(item)">Add Features</a>
                                    <a class="dropdown-item text-danger" href="javascript:void(0)" @click="deleteProductModal(item)">Delete Product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 class="text-uppercase"> {{ item.name }} </h5>
                    <p class="text-secondary small text-capitalize" v-html="sliceHash2(item.description)"> </p>
                    <p class="text-secondary small"> <span v-if="item.delivery_time !== 'null' ">{{ item.delivery_time }} Days</span> <span v-else>Not Specified</span> </p>
                    <h6> {{ dollarFilter(item.price) }} </h6>

                    <div class="d-flex justify-content-between mt-3">
                        <button class="btn btn-danger" @click="deleteProductModal(item)">
                            Delete 
                        </button>
                        <button class="btn btn-dark" @click="goToProduct(item)">
                            View More
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm Delete Modal  -->
        <div class="add-item-modal" v-show="delete_item">
            <div class="add-item-container">
                <div class="mb-2 text-right">
                    <span class="material-icons text-danger" role="button" @click="delete_item = !delete_item">
                        close
                    </span>
                </div>
                <h4 class="mb-3 text-dark">Delete</h4>
                <div class="add-item-content">
                    <h4 class="text-center">Are you sure? 🤔</h4>
                    <div class="d-flex justify-content-center" v-if="loading3">
                        <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class="mt-3 d-flex align-items-center" style="gap:20px" v-else>
                        <button class="btn-danger w-100 add--button p-2" @click="deleteProduct">Yes</button>
                        <button  class="btn-success w-100 add--button p-2" @click="delete_item = !delete_item ">No</button>
                    </div>
                </div>
            </div>
        </div>

        <AddPlan @close="closePlanModal" v-show="add_plan" :item_id="product_id"/>
        <AddFeature @close="closeFeatureModal" v-show="add_feature" :product2_id="feature_product_id"/>
    </div>
</template>

<script>
import AddPlan from '@/components/modals/addPlan.vue'
//  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit } from '@/plugins/filter.js'
import AddFeature from '@/components/modals/addFeature.vue';
export default {
    components:{
    AddPlan,
    AddFeature,
},
    data(){
        return {
            dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit,
            products: [],
            baseurl: 'https://api.risingwork.com/',
            
            new_icon_image: '',
            categories: '',
            add_item: false,
            edit_item: false,
            delete_item: false,
            add_plan: false,
            add_feature: false,
            loading: false,
            item_id: '',
            loading2: false,
            loading3: false,
            product_id: '',
            feature_product_id: ''
        }
    },
    methods:{
        createNew(){
            this.$router.push('/products/create-new')
        },
        goToProduct(item){
            this.$router.push({name:'product-details', params:{id: item.id}})
        // window.open(`https://rising-work.netlify.app/service/?id=${item.id}`)
        },
        addPlan(item){
            this.add_plan = !this.add_plan;
            this.product_id = item.id;
            console.log(this.product_id);
        },
        addFeature(item){
            this.feature_product_id = item.id;
            console.log(this.feature_product_id);
            this.add_feature = !this.add_feature
        },
        closePlanModal(){
            this.add_plan = !this.add_plan
            this.getProducts()
        },
        closeFeatureModal(){
            this.add_feature = !this.add_feature
            this.getProducts()
        },
        
        async getProducts(){
            try {
                let res = await this.$axios.get('admin/dashboard')
                console.log(res);
                this.products = res.data.all_products
            } catch (error) {
                console.log(error);
            }
        },
        
        async getProduct(){
            try {
                let res = await this.$axios.get(`/find-product/${this.item_id}`)
                console.log(res);
                this.dataObj = res.data.product
                console.log(this.payload.icon_image);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProductModal(item){
            this.delete_item = true
            console.log(item.id);
            this.item_id = item.id
        },
        async deleteProduct(){
            this.loading3 = true
            try {
                let res = await this.$axios.post(`admin/delete-product/${this.item_id}`)
                console.log(res);
                this.delete_item = false
                this.$toastify({
                    text: `${res.data.message}`,
                    className: "info",
                    style: {
                        background: "#034B03",
                    },
                    }).showToast();
            } catch (error) {
                console.log(error);
                this.$toastify({
                    text: `${error.response.data.message}`,
                    className: "info",
                    style: {
                        background: "#f00",
                    },
                    }).showToast();
            }
            this.loading3 = false
            this.getProducts()
        },
    },
    mounted(){
      
        this.getProducts();
        
    }
    
}
</script>

<style>
#editor1{
    height: 150px;
}
</style>