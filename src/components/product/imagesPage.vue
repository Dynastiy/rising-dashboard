<template>
    <div>
        <div class="d-flex justify-content-between">
            <div>
                <img :src="baseurl+payload.app_icon" class="product--image" alt="">
                <h5 class="mt-3">Product Image</h5>
            </div>

            <div class="">
                <div class="d-flex" style="gap:20px">
                    <img :src="baseurl+payload.photo_one" class="featured--image" alt="">
                    <img :src="baseurl+payload.photo_two" class="featured--image" alt="">
                    <img :src="baseurl+payload.photo_three" class="featured--image" alt="">
                    <img :src="baseurl+payload.photo_four" class="featured--image" alt="">
                    <img :src="baseurl+payload.photo_five" class="featured--image" alt="">
                </div>
                <div>
                    <h5 class="mt-3">Featured Images</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      baseurl: 'https://api.risingwork.com/services/photos/',
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
  },
  mounted() {
    this.getSingleProduct();
  },
};
</script>