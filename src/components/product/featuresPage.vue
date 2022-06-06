<template>
  <div>
    <div>
      <div>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Plan Details</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                Fetching Data . . .
              </tr>
              <tr v-for="(feature, index) in payload.features" :key="index">
                <td>{{ index + 1 }}.</td>
                <td class="text-capitalize">
                  {{ feature.name }}
                  <input
                    class="form-control"
                    v-show="editing === feature.id"
                    type="text"
                    v-model="item.name"
                  />
                </td>
                <td>
                  ${{ feature.price }}
                  <input
                    type="text"
                    class="form-control"
                    v-show="editing === feature.id"
                    v-model="item.price"
                  />
                </td>
                <td class="d-flex align-items-center" style="gap: 30px">
                  <button
                    class="btn--other"
                    v-if="editing === feature.id"
                    @click="updateFeature(feature)"
                  >
                    Update
                  </button>
                  <span
                    class="material-icons"
                    v-else
                    @click="editFeature(feature)"
                    role="button"
                  >
                    edit
                  </span>

                  <span class="material-icons text-danger" role="button" @click="deleteModal(feature)">
                    delete
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
                    <div class="d-flex justify-content-center" v-if="loading2">
                        <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class="mt-3 d-flex align-items-center" style="gap:20px" v-else>
                        <button class="btn-danger w-100 add--button p-2" @click="deleteFeature">Yes</button>
                        <button  class="btn-success w-100 add--button p-2" @click="delete_item = !delete_item ">No</button>
                    </div>
                </div>
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
      id: this.$route.params.id,
      payload: {
        name: "",
        category_id: "",
      },
      item: {
        price: "",
        name: "",
      },
      loading: false,
      editing: false,
      delete_item: false,
      feature_id: '',
      loading2: false,
    };
  },
  methods: {
    editFeature(feature) {
      //   alert(feature.id)
      this.editing = this.editing === feature.id ? null : feature.id;
    },
    async getSingleProduct() {
      try {
        let res = await this.$axios.get(`find-product/${this.id}`);
        this.payload = res.data.product;
        console.log(res.data);
        this.product_details = res.data;
      } catch (error) {
        console.log(error);
      }
      this.editing = false;
    },
    updateFeature(feature) {
      let payload = {
        name: this.item.name,
        price: this.item.price,
      };
      this.$axios
        .post(`admin/edit-feature/${feature.id}`, payload)
        .then((res) => {
          console.log(res);
          this.getSingleProduct();
            this.$toastify({
          text: `${res.data.message}`,
          className: "info",
          style: {
            background: "#034B03",
          },
        }).showToast();
        })
        .catch((err) => [console.log(err)]);
    },
    deleteModal(feature){
        this.delete_item = !this.delete_item
        this.feature_id = feature.id
    },
    deleteFeature() {
        this.loading2 = true
      this.$axios
        .post(`admin/delete-feature/${this.feature_id}`)
        .then((res) => {
          console.log(res);
          this.$toastify({
          text: `${res.data.message}`,
          className: "info",
          style: {
            background: "#034B03",
          },
        }).showToast();
        })
        .catch((err) => {
          console.log(err);
          this.$toastify({
          text: `Something Went wrong`,
          className: "info",
          style: {
            background: "red",
          },
        }).showToast();
        });
        this.loading2 = false
        this.delete_item = !this.delete_item
          this.getSingleProduct();
    },
  },
  mounted() {
    this.getSingleProduct();
  },
};
</script>