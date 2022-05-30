<template>
    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between mb-3 ">
                <h4>All Products</h4>
                <div class="d-flex align-items-center justify-content-end add--button" @click="add_item = !add_item" role="button" style="gap:5px">
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
                                    <a class="dropdown-item" href="javascript:void(0)" @click="editProductModal(item)">Edit Product</a>
                                    <a class="dropdown-item" href="javascript:void(0)" @click="addPlan(item)">Add Plan</a>
                                    <a class="dropdown-item" href="javascript:void(0)"  @click="addFeature(item)">Add Features</a>
                                    <a class="dropdown-item text-danger" href="javascript:void(0)" @click="deleteProductModal(item)">Delete Product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 class="text-uppercase"> {{ item.name }} </h5>
                    <p class="text-secondary small text-capitalize"> {{ sliceHash2(item.description) }} </p>
                    <p class="text-secondary small"> <span v-if="item.delivery_time !== 'null' ">{{ item.delivery_time }} Days</span> <span v-else>Not Specified</span> </p>
                    <h6> {{ dollarFilter(item.price) }} </h6>

                    <div class="text-right">
                        <button class="add--button mt-3" @click="goToProduct(item)">
                            View More
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Add item Modal  -->
        <div class="add-item-modal" v-show="add_item">
            <div class="add-item-container">
                <div class="mb-2 text-right">
                    <span class="material-icons text-danger" role="button" @click="add_item = !add_item">
                        close
                    </span>
                </div>
                <h4 class="mb-3 text-dark">Add New Product</h4>
                <div class="add-item-content">
                    <form action="" @submit.prevent="addProduct">
                        <div class="mb-3">
                            <label for="">Product Name</label>
                            <input type="text" v-model="payload.name">
                        </div>
                         <div class="mb-3">
                            <label for="">Product Description</label>
                            <textarea v-model="payload.description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="">Choose Category</label>
                            <select name="" id="" v-model="payload.category_id">
                                <option v-for="item in categories" :key="item.id" :value="item.id"> {{ item.category_name }} </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="">Upload Preview Photos</label>
                            <div class="row">
                                <input
                                    class="col-md-4 mb-3"
                                    type="file"
                                    accept="image/*"
                                    @change="photoOneUpload($event)"
                                />
                                <input
                                class="col-md-4 mb-3"
                                    type="file"
                                    accept="image/*"
                                    @change="photoTwoUpload($event)"
                                />
                                <input
                                class="col-md-4 mb-3"
                                    type="file"
                                    accept="image/*"
                                    @change="photoThreeUpload($event)"
                                />
                                <input
                                class="col-md-4"
                                    type="file"
                                    accept="image/*"
                                    @change="photoFourUpload($event)"
                                />
                                <input
                                class="col-md-4"
                                    type="file"
                                    accept="image/*"
                                    @change="photoFiveUpload($event)"
                                />
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="center" >
                                <div class="form-input">
                                <div class="preview">
                                    <img id="file-ip-1-preview" />
                                </div>
                                <label class="px-3 py-1 m-0" for="file-ip-1">Add Thumbnail Photo</label>
                                <input
                                    type="file"
                                    id="file-ip-1"
                                    accept="image/*"
                                    @change="showPreview($event)"
                                />
                            </div>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-center" v-if="loading">
                                <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <button class="add--item" v-else>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

         <!-- Edit item Modal  -->
        <div class="add-item-modal" v-show="edit_item">
            <div class="add-item-container">
                <div class="mb-2 text-right">
                    <span class="material-icons text-danger" role="button" @click="edit_item = !edit_item">
                        close
                    </span>
                </div>
                <h4 class="mb-3 text-dark">Edit</h4>
                <div class="add-item-content">
                    <form action="" @submit.prevent="editProduct">
                       
                        <div class="mb-3">
                            <label for="">Enter New Product Name</label>
                            <input type="text" v-model="dataObj.name">
                        </div>
                        <div class="mb-3">
                            <label for="">New Product Description</label>
                            <textarea v-model="dataObj.description"></textarea>
                        </div>
                        <div class="mb-3">
                            <div class="center" >
                                <div class="form-input2">
                                <div class="preview d-flex align-items-center">
                                     <!-- <div>
                                        <h6>Old Thumbnail Photo</h6>
                                        <img :src="baseurl + '/' + payload.icon_image " />
                                    </div> -->
                                    <div>
                                        <h6>New Thumbnail Photo</h6>
                                        <img id="file-ip-1-preview2" />
                                    </div>
                                </div>
                                <label class="px-3 py-1 m-0" for="file-ip-2">Edit Thumbnail Photo</label>
                                <input
                                    type="file"
                                    id="file-ip-2"
                                    accept="image/*"
                                    @change="showPreview2($event)"
                                />
                            </div>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-center" v-if="loading2">
                                <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <button class="add--item" v-else>Edit</button>
                        </div>
                    </form>
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
import { dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit } from '@/plugins/filter.js'
import AddFeature from '@/components/modals/addFeature.vue';
export default {
    components:{
    AddPlan,
    AddFeature
},
    data(){
        return {
            dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit,
            products: [],
            baseurl: 'https://api.risingwork.com/',
            payload: {
                name: '',
                icon_image: null,
                photo_one: null,
                photo_two: null,
                photo_three: null,
                photo_four: null,
                photo_five: null,
                description: '',
                // price: null,
                category_id: ''
            },
            dataObj:{
                name: '',
                description: ''
            },
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
        goToProduct(item){
            // this.$router.push({name:'product-details', params:{id: item.id}})
        window.open(`https://rising-work.netlify.app/services/?id=${item.id}`)
        },
        addPlan(item){
            this.product_id = item.id;
            console.log(this.product_id);
            this.add_plan = !this.add_plan
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
        photoOneUpload() {
      var input = event.target;
      this.payload.photo_one = input.files[0];
      console.log(this.payload.photo_one);
    },
    photoTwoUpload() {
      var input = event.target;
      this.payload.photo_two = input.files[0];
      console.log(this.payload.photo_two);
    },
    photoThreeUpload() {
      var input = event.target;
      this.payload.photo_three = input.files[0];
      console.log(this.payload.photo_three);
    },
    photoFourUpload() {
      var input = event.target;
      this.payload.photo_four = input.files[0];
      console.log(this.payload.photo_four);
    },
    photoFiveUpload() {
      var input = event.target;
      this.payload.photo_five = input.files[0];
      console.log(this.payload.photo_five);
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
        async getCategories(){
            try {
                let res = await this.$axios.get('/all-categories')
                console.log(res);
                this.categories = res.data.categories
            } catch (error) {
                console.log(error);
            }
        },
        async addProduct(){
            let formData = new FormData;
            formData.append('name', this.payload.name)
            formData.append('app_icon', this.payload.icon_image)
            formData.append('photo_one', this.payload.photo_one)
            formData.append('photo_two', this.payload.photo_two)
            formData.append('photo_three', this.payload.photo_three)
            formData.append('photo_four', this.payload.photo_four)
            formData.append('photo_five', this.payload.photo_five)
            formData.append('description', this.payload.description)
            formData.append('price', 3)
            formData.append('delivery_time', 3)
            formData.append('category_id', this.payload.category_id)
            this.loading = true
            try {
                let res = await this.$axios.post('/admin/create-product', formData)
                console.log(res);
                this.add_item = !this.add_item;
                    this.$toastify({
                    text: `${res.data.message}`,
                    className: "info",
                    style: {
                        background: "#034B03",
                    },
                    }).showToast();
            } catch (error) {
                console.log(error.response.data);
                    this.$toastify({
                    text: `${error.response.data.message}`,
                    className: "info",
                    style: {
                        background: "#f00",
                    },
                    }).showToast();
            }
            this.loading = false
            this.getProducts()
            this.payload = {};
            var preview = document.getElementById("file-ip-1-preview2");
            preview.style.display = "none";
        },
        async editProductModal(item){
            console.log(item.id);
            this.item_id = item.id
            this.getProduct();
            this.edit_item = true
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
        async editProduct(){
            this.loading2 = true
             let formData = new FormData;
            formData.append('name', this.dataObj.name)
            formData.append('description', this.dataObj.description)
            formData.append('icon_image', this.new_icon_image)
            formData.append('price', 3)
            formData.append('delivery_time', 3)
            try {
                let res = await this.$axios.post(`/admin/edit-product/${this.item_id}`)
                console.log(res);
                this.edit_item = false
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
            this.loading2 = false;
            // this.getCategory();
            this.new_icon_image = null
            this.getProducts();
            var preview = document.getElementById("file-ip-1-preview2");
            preview.style.display = "none";
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
        showPreview($event) {
      var input = event.target;
      this.payload.icon_image = input.files[0];
      // this.payload.icon_image  = URL.createObjectURL(event.target.files[0])
      console.log(this.payload.icon_image);
      if ($event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
      }
    },
    showPreview2($event) {
         var input = event.target;
        this.new_icon_image = input.files[0];
        console.log(this.new_icon_image);
        if ($event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview2");
        preview.src = src;
        preview.style.display = "block";
        }
    },
    },
    mounted(){
      
        this.getProducts();
        this.getCategories();
        
    }
    
}
</script>