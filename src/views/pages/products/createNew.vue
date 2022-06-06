<template>
  <div>
    <div class="bg-white create-product p-4 rounded-lg shadow-sm">
      <button class="btn btn-dark d-flex align-items-center" style="gap:10px" @click="goBack()">
          <span class="material-icons">
              arrow_back
          </span>
          <span>
              Go Back
          </span>
          </button>
      <div class="mt-4">
        <h4 class="mb-4 text-dark">Add New Product</h4>
        <div class="add-item-content">
          <form action="" @submit.prevent="addProduct">
            <div class="d-flex mb-4" style="gap: 20px">
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
            <div class="mb-2">
              <label for="">Product Description</label>
              <vue-editor
                v-model="payload.description"
                :editor-toolbar="customToolbar"
              ></vue-editor>
            </div>
            <div class="my-4">
              <label for="mb-3">Upload Preview Photos</label>
              <div class="row mt-3">
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
              <div class="center">
                <div class="form-input">
                  <div class="preview">
                    <img id="file-ip-1-preview" />
                  </div>
                  <label class="px-3 py-1 m-0" for="file-ip-1"
                    >Add Thumbnail Photo</label
                  >
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
              <div class="text-right" v-else>
                <button class="btn-dark btn">Create Product</button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
      baseurl: "https://api.risingwork.com/",
      payload: {
        name: "",
        icon_image: null,
        photo_one: null,
        photo_two: null,
        photo_three: null,
        photo_four: null,
        photo_five: null,
        description: "<p>Enter Product Description.</p>",
        category_id: "",
      },
      dataObj: {
        name: "",
        description: "",
      },
      new_icon_image: "",
      categories: "",
      add_item: false,
      edit_item: false,
      delete_item: false,
      add_plan: false,
      add_feature: false,
      loading: false,
      item_id: "",
      loading2: false,
      loading3: false,
      product_id: "",
      feature_product_id: "",
    };
  },
  methods: {
    async getCategories() {
      try {
        let res = await this.$axios.get("/all-categories");
        console.log(res);
        this.categories = res.data.categories;
      } catch (error) {
        console.log(error);
      }
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
    async addProduct() {
      let formData = new FormData();
      formData.append("name", this.payload.name);
      formData.append("app_icon", this.payload.icon_image);
      formData.append("photo_one", this.payload.photo_one);
      formData.append("photo_two", this.payload.photo_two);
      formData.append("photo_three", this.payload.photo_three);
      formData.append("photo_four", this.payload.photo_four);
      formData.append("photo_five", this.payload.photo_five);
      formData.append("description", this.payload.description);
      formData.append("price", 3);
      formData.append("delivery_time", 3);
      formData.append("category_id", this.payload.category_id);
      this.loading = true;
      try {
        let res = await this.$axios.post("/admin/create-product", formData);
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
      this.loading = false;
      this.payload = {};
      var preview = document.getElementById("file-ip-1-preview2");
      preview.style.display = "none";
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>