<template>
    <div>
        <div>
            <div class="d-flex align-items-center justify-content-between mb-3 ">
                <h4>All Categories</h4>
                <div class="d-flex align-items-center justify-content-end add--button" @click="add_item = !add_item" role="button" style="gap:5px">
                    <span class="material-icons">
                        add_circle
                    </span>
                    <span>Add Category</span>
                </div>
            </div>
            <div class="items">
                <div class="category shadow-lg p-3 bg-white rounded-lg" v-for="(item, index) in categories" :key="index">
                    <div class="d-flex justify-content-between">
                        <img class="mb-3 rounded-circle shadow-sm" :src="baseurl + '/' + item.icon_image + '?' + Date.now() " alt="">
                        <div class="d-flex align-items-center" style="gap: 5px">
                            <span class="material-icons text-success" role="button" style="font-size:18px" @click="editCategoryModal(item)">
                                edit
                            </span>
                            <span class="material-icons text-danger" role="button" style="font-size:18px" @click="deleteCategoryModal(item)">
                                delete
                            </span>
                        </div>
                    </div>
                    <h5> {{ item.category_name }} </h5>
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
                <h4 class="mb-3 text-dark">Add New Category</h4>
                <div>
                    <p class="text-danger" style="font-size: 0.7rem" v-for="(error, index) in errors.icon_image" :key="index"> {{ index+1 }}. {{ error }} </p>
                    <p v-for="(error, index) in errors.category_name" :key="index">{{ index+1 }}. {{ error}} </p>
                </div>
                
                <div class="add-item-content">
                    <form action="" @submit.prevent="addCategory">
                        <div class="mb-3">
                            <label for="">Enter Category Name</label>
                            <input type="text" v-model="dataObj.category_name">
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
                    <form action="" @submit.prevent="editCategory">
                       
                        <div class="mb-3">
                            <label for="">Enter New Category Name</label>
                            <input type="text" v-model="dataObj.category_name">
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
                        <button class="btn-danger w-100 add--button p-2" @click="deleteCategory">Yes</button>
                        <button  class="btn-success w-100 add--button p-2" @click="delete_item = !delete_item ">No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            categories: [],
            baseurl: 'https://api.risingwork.com/',
            payload: {
                category_name: '',
                icon_image: null
            },
            dataObj: {
                category_name: '',
                icon_image: null
            },
            new_icon_image: '',
            add_item: false,
            edit_item: false,
            delete_item: false,
            loading: false,
            item_id: '',
            loading2: false,
            loading3: false,
            errors: {},
        }
    },
    methods:{
        async getCategories(){
            try {
                let res = await this.$axios.get('/all-categories')
                console.log(res);
                this.categories = res.data.categories
            } catch (error) {
                console.log(error);
            }
        },
        async addCategory(){
            let formData = new FormData;
            formData.append('category_name', this.dataObj.category_name)
            formData.append('icon_image', this.dataObj.icon_image)
            this.loading = true
            try {
                let res = await this.$axios.post('/admin/create-category', formData)
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
                this.errors = error.response.data.errors
                console.log(this.errors);
                    this.$toastify({
                    text: `${error.response.data.message}`,
                    className: "info",
                    style: {
                        background: "#f00",
                    },
                    }).showToast();
            }
            this.loading = false
            this.getCategories()
            this.payload = {};
            var preview = document.getElementById("file-ip-1-preview2");
            preview.style.display = "none";
        },
        async editCategoryModal(item){
            console.log(item.id);
            this.item_id = item.id
            this.getCategory();
            this.edit_item = true
        },
        async getCategory(){
            try {
                let res = await this.$axios.get(`/find-category/${this.item_id}`)
                console.log(res);
                this.payload = res.data.category
                console.log(this.payload.icon_image);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategoryModal(item){
            this.delete_item = true
            console.log(item.id);
            this.item_id = item.id
        },
        async editCategory(){
            this.loading2 = true
             let formData = new FormData;
            formData.append('category_name', this.payload.category_name)
            formData.append('icon_image', this.new_icon_image)
            try {
                let res = await this.$axios.post(`/admin/edit-category/${this.item_id}`, formData)
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
            this.getCategory();
            this.new_icon_image = null
            this.getCategories();
            var preview = document.getElementById("file-ip-1-preview2");
            preview.style.display = "none";
        },
        async deleteCategory(){
            this.loading3 = true
            try {
                let res = await this.$axios.post(`admin/delete-category/${this.item_id}`)
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
            this.getCategories()
        },
        showPreview($event) {
      var input = event.target;
      this.dataObj.icon_image = input.files[0];
      // this.dataObj.icon_image  = URL.createObjectURL(event.target.files[0])
      console.log(this.dataObj.icon_image);
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
        this.getCategories()
    }
}
</script>