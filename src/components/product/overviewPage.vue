<template>
  <div>
    <div class="create-product">
      <form action="" @submit.prevent="updateProduct()">
        <div class="d-flex mb-4 add-item-content" style="gap: 20px">
          <div class="w-100">
            <label for="">Product Name</label>
            <input type="text" v-model="payload.name" />
          </div>
          <div class="w-100">
            <label for="">Choose Category</label>
            <select name="" id="" v-model="payload.category_id">
              <option
                v-for="item in categories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.category_name }}
              </option>
            </select>
          </div>
        </div>
        <div>
              <div class="d-flex justify-content-center" v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="text-right" v-else>
                <button class="btn-dark btn">Update Product</button>
              </div>
            </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      id: this.$route.params.id,
      payload: {
          name: '',
          category_id:''
      },
      categories: '',
      loading: false,
    };
  },
  methods: {
    async getSingleProduct() {
      try {
        let res = await this.$axios.get(`find-product/${this.id}`);
        this.payload = res.data.product;
        console.log(res.data);
        this.product_details = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(){
            this.loading = true
             let formData = new FormData;
            formData.append('name', this.payload.name)
            formData.append('price', 3)
            formData.append('delivery_time', 3)
            formData.append('category_id', this.payload.category_id)
            try {
                let res = await this.$axios.post(`/admin/edit-product/${this.id}`, formData)
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
            this.loading = false;
            this.getSingleProduct();
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
    
  },
  mounted() {
    this.getSingleProduct();
    this.getCategories()
  },
};
</script>