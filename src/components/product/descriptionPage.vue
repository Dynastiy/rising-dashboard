<template>
  <div>
    <div class="create-product">
      <form action="" @submit.prevent="updateProduct()">
        <vue-editor
               
                v-model="payload.description"
                :editor-toolbar="customToolbar"
              ></vue-editor>
            <div class="mt-4">
              <div class="d-flex justify-content-center" v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="text-right" v-else>
                <button class="btn-dark btn">Update Description</button>
              </div>
            </div>
      </form>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
        customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
      ],
      product: {},
      id: this.$route.params.id,
      payload: {
          description:''
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
            formData.append('description', this.payload.description)
            formData.append('price', 3)
            formData.append('delivery_time', 3)
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