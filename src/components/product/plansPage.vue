<template>
  <div>
    <div class="create-product">
        
        <div class="d-flex justify-content-between align-items-center">
                <button class="add--button" @click="add_benefit = !add_benefit">
                  Add Description
                </button>
              </div>

              <div class="add--benefit my-2" v-show="add_benefit">
                <form action="" @submit.prevent="addBenefit">
                  <div class="d-flex align-items-center" style="gap: 20px">
                    <input type="text" class="w-100" v-model="name" />
                    <button class="add--button px-4">Add</button>
                  </div>
                </form>
              </div>

      <div class="">
        <div
          class="plan--selector rounded-lg shadow-sm w-100"
          id="myDIV"
          v-for="plan in payload.plans"
          :key="plan.id"
        >
          <div
            role="button"
            class="
              nav--item
              p-3
              my-3
              rounded-lg
              row
              align-items-center
              justify-content-between
              w-100
              text
            "
            :class="{ active: isActive === plan.id }"
            @click="selectPlan(plan)"
          >
            <h6 class="">{{ plan.name }}</h6>
            <div class="">
              <div class="d-flex align-items-center" style="gap: 30px">
                <h5 v-if="product.price !== 'null'">${{ plan.price }}</h5>
                <span v-else>Free</span>
                <span v-if="product.delivery_time !== 'null'"
                  >{{ plan.delivery_time }} Days</span
                >
                <span v-else>Not Specified</span>
              </div>
            </div>
            <!-- <div>
                    <button
                        class="btn--other"
                        
                    >
                    Update
                  </button>
                  <span
                    class="material-icons"
                    
                    role="button"
                  >
                    edit
                  </span>

                  <span class="material-icons text-danger" role="button" >
                    delete
                  </span>
            </div> -->
          </div>

          <div class="pb-3 px-3" v-show="plan_details === plan.id">
            <div class="">
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
              <tr v-for="(plan_desc, index) in benefits" :key="index">
                  <td> {{ index+1 }}. </td>
                  <td class="text-capitalize"> {{ plan_desc.name }} </td>
                  <td> <span :class="plan_desc.status" class="text-capitalize"> {{ plan_desc.status }} </span> </td>
                  <td> <button class="btn--other" v-if="plan_desc.status == 'unavailable' " @click="makeAvailable(plan, plan_desc)">Make Available</button>
                        <button class="btn--other2" v-else @click="makeUnavailable(plan, plan_desc)"> Make Unavailable </button>
                  </td>
                  
              </tr>
            </tbody>
          </table>
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      product: {},
      id: this.$route.params.id,
      payload: {
        description: "",
      },
      categories: "",
      loading: false,
      product_details: '',
      isActive: false,
      plan_details: false,
      name: '',
      add_benefit: false,
      plan: {},
      benefits: [],
      plan_id: '',
      planIds: []
    };
  },
  methods: {
    makeAvailable(plan, plan_desc){
        console.log(plan.id, plan_desc.id);
        this.$axios.post(`admin/update-plan-description/${plan.id}/desc/${plan_desc.id}`)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
          this.findSinglePlan()
        })
    },
    makeUnavailable(plan, plan_desc){
        this.$axios.post(`admin/update-plan-description/${plan.id}/desc/${plan_desc.id}`)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
          this.findSinglePlan()
        })
    },
    selectPlan(plan){
          this.isActive = ( this.isActive === plan.id ) ? null : plan.id;
          this.plan_details = ( this.plan_details === plan.id ) ? null : plan.id;
          this.plan_id = plan.id
          this.findSinglePlan();
        },
    async getSingleProduct() {
      try {
        let res = await this.$axios.get(`find-product/${this.id}`);
        this.payload = res.data.product;
        console.log(res.data.product.plans);
        let planIds = res.data.product.plans
        let plan = 0
        for(plan of planIds){
            console.log(plan.id);
            this.planIds.push(plan.id)
        }
        console.log(this.planIds);
        this.product_details = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    findSinglePlan(){
      this.$axios.get(`admin/get-plan-description/${this.plan_id}`)
      .then((res)=>{
        console.log(res);
        this.plan = res.data
        console.log(this.plan);
        this.benefits = res.data.descriptions
        console.log(this.benefits);
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    addBenefit(){
      console.log(this.planIds);
      let payload = {
        name: this.name,
        plan_ids: this.planIds,
      }
      this.$axios.post(`admin/create-plan-description/`, payload)
      .then((res)=>{
        console.log(res);
        this.name = ''
      })
      .catch((err)=>{
        console.log(err);
      })
      this.add_benefit = false
    },
    updateProduct() {
      alert("hello Wrld");
    },
  },
  mounted() {
    this.getSingleProduct();
  },
};
</script>