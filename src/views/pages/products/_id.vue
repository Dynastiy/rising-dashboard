<template>
  <div>
    <div class="">
      <div class="">
        <div class="view">
          <div class="left__side bg-white shadow-sm p-4">
            <div class="top__data d-flex" style="gap: 20px">
              <div class="feat__image">
                <img
                  :src="
                    baseurl +
                    product.app_icon
                  "
                  alt=""
                />
              </div>
              <div
                class="content"
                
              >
                <h3 class="text-capitalize mb-3">{{ product.name }}</h3>
                <div class="d-flex justify-content-between align-items-center" style="gap:20px">
                  <p class="text-secondary"><span v-if="product.price !== 'null' ">${{ product.price }}</span> <span v-else>Free</span> </p>
                  <p class="small">
                    <span
                      class="font-weight-bold d-flex align-items-center"
                      
                    >
                      <span v-if="product_details.sum_rating == 0" class="small mr-3">
                        No rating yet
                      </span>
                      <span v-else class="mr-4">
                        <star-rating
                          v-model="product_details.sum_rating"
                          v-bind:max-rating="5"
                          inactive-color="#000"
                          active-color="#ffd700"
                          v-bind:star-size="12"
                          :show-rating="false"
                        ></star-rating>
                      </span>
                      <span class="">
                        <i
                          class="fa fa-user text-secondary mt-2"
                          aria-hidden="true"
                        ></i>
                        Total Reviews: {{ product_details.total_reviews }}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="images d-flex mt-5" style="gap: 10px; width:100%; overflow-x: scroll">
              <div>
               
                <!-- Button trigger modal -->
                <button type="button"  data-toggle="modal" data-target="#exampleModal">
                   <img :src="baseurl+product.photo_one" class="" alt="">
                </button>

                <!-- Modal -->
                <div class="modal fade" style="min-height: 100vh" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body d-flex justify-content-center">
                        <img :src="baseurl+product.photo_one" class="modal-img" alt="">
                      </div>
                      <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
               <div>
               
                <!-- Button trigger modal -->
                <button type="button"  data-toggle="modal" data-target="#exampleModal2">
                   <img :src="baseurl+product.photo_two" class="" alt="">
                </button>

                <!-- Modal -->
                <div class="modal fade" style="min-height: 100vh" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body d-flex justify-content-center">
                        <img :src="baseurl+product.photo_two" class="modal-img" alt="">
                      </div>
                      <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
               <div>
               
                <!-- Button trigger modal -->
                <button type="button"  data-toggle="modal" data-target="#exampleModal3">
                   <img :src="baseurl+product.photo_three" class="" alt="">
                </button>

                <!-- Modal -->
                <div class="modal fade" style="min-height: 100vh" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body d-flex justify-content-center">
                        <img :src="baseurl+product.photo_three" class="modal-img" alt="">
                      </div>
                      <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
               <div>
               
                <!-- Button trigger modal -->
                <button type="button"  data-toggle="modal" data-target="#exampleModal4">
                   <img :src="baseurl+product.photo_four" class="" alt="">
                </button>

                <!-- Modal -->
                <div class="modal fade" style="min-height: 100vh" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body d-flex justify-content-center">
                        <img :src="baseurl+ product.photo_four" class="modal-img" alt="">
                      </div>
                      <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>

                <div>
               
                <!-- Button trigger modal -->
                <button type="button"  data-toggle="modal" data-target="#exampleModal5">
                   <img :src="baseurl+product.photo_five" class="" alt="">
                </button>

                <!-- Modal -->
                <div class="modal fade" style="min-height: 100vh" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body d-flex justify-content-center">
                        <img :src="baseurl+ product.photo_five" class="modal-img" alt="">
                      </div>
                      <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div class="mid__content">
              <div class="my-4">
                <h4 class="mb-1">Description</h4>
                <p class="text-muted">{{ product.description }}</p>
              </div>
              
              <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Plans</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Features</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="">
                            <div class="plan--selector rounded-lg shadow-sm w-100" id="myDIV" v-for="plan in product.plans" :key="plan.id" >
                                <div role="button"  class="nav--item p-3 my-3 rounded-lg row align-items-center justify-content-between w-100 text" :class="{ active: (isActive === plan.id)}" @click="selectPlan(plan)">
                                    <h5 class="col-4"> {{ plan.name }} </h5>
                                    <div class="col-7">
                                      <div class="d-flex align-items-center" style="gap:30px">
                                          <h5 v-if="product.price !== 'null' ">${{ plan.price }}</h5> <span v-else>Free</span> 
                                          <span v-if="product.delivery_time !== 'null' ">{{ plan.delivery_time }} Days</span> <span v-else>Not Specified</span> 
                                        </div> 
                                    </div>
                                </div>

                                 <div class="pb-3 px-3" v-show="plan_details === plan.id ">
                                  <div class="">
                                      <div class="d-flex justify-content-between align-items-center">
                                        <h5>Benefits</h5>
                                        <button class="add--button" @click="add_benefit = !add_benefit ">
                                          Add Benefit
                                        </button>
                                      </div>
                                      
                                      <div class="add--benefit my-2" v-show="add_benefit">
                                        <form action="" @submit.prevent="addBenefit"> 
                                          <div class="d-flex align-items-center" style="gap:20px">
                                            <input type="text" class="w-100" v-model="name"> 
                                            <button class="add--button px-4">Add</button>
                                          </div>
                                        </form>
                                      </div>
                                      
                                      <div>
                                        <ul>
                                          <li v-for="(plan_desc, index) in benefits" :key="index">
                                            <span>
                                               {{ index+1 }}. {{plan_desc.name}}
                                            </span>
                                            <span>

                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                  </div>
                              </div>
                            </div>
                        </div>

                       
                    </div>
                    <div class="tab-pane fade mt-2" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row py-3 align-items-center " v-for="feature in product.features" :key="feature.id">
                            <h6 class="col-4 text-capitalize"> {{ feature.name }} </h6>
                            <h4 class="col-8"> +${{ feature.price }} </h4>
                        </div>
                    </div>
                </div>
              </div>

              <hr>
              
            </div>
            <div class="hr2"></div>
            <div class="additional_info mt-3">
              <h4 class="mb-3">Additional Information</h4>
               <div style="display:grid; grid-template-columns: repeat(3, 1fr); grid-gap:1.2rem">
                <div v-if="product.category" class="text-capitalize"> 
                  <h6 class="font-weight-bold small">Category</h6>
                  <p class="small">{{ product.category.category_name }}</p>
                </div>
                <div class="text-capitalize">
                  <h6 class="font-weight-bold small">Views</h6>
                  <p class="small">{{ product.views }}</p>
                </div>
                <div>
                  <h6 class="font-weight-bold small">Last Updated</h6>
                  <p class="small">{{ timeStamp(product.updated_at) }}</p>
                </div>
              </div>
          </div>
          </div>
          <div class="right__side bg-white shadow-sm p-3">
            <h5 class="pl-3 mb-3">Similar Apps</h5>
           <div class="" v-for="similar_app in similar_apps" :key="similar_app.id">
             <router-link :to="'/products/' + similar_app.id">
               <div class="shadow-sm p-3 d-flex align-items-center" style="gap:20px">
               <img
                  :src="
                    baseurl +
                    similar_app.app_icon
                  "
                  class="immagg"
                  alt=""
                  style="width: 50px; height:50px"
                />
             <div>
               <h6 class="text-dark"> {{ similar_app.name }} </h6>
               <p class="small m-0"> {{ sliceHash(similar_app.description) }} </p>
                <p class="text-secondary m-0 small"> <span v-if="similar_app.price !== 'null' ">${{ similar_app.price }}</span> <span v-else>Free</span> </p>
             </div>
             </div>
             </router-link>
           </div>
        </div>
        </div>
      </div>
    </div>


    <div class="loader" v-show="loading">

<div class="content--loader" >
   <div class="loading">
<p>Starting ...</p>
      <span></span>
   </div>
</div>
    </div>
  </div>
</template>

<script>
import { dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit } from '@/plugins/filter.js'
import StarRating from "vue-star-rating";
export default {
  name: "IdPage",
  components: {
    StarRating,
  },
  data() {
    return {
      dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit,      
      product: {},
      baseurl: 'https://api.risingwork.com/services/photos/',
      id: this.$route.params.id,
      reviews: [],
      rating: "",
      similar_apps: [],
      loading: false,
      product_details: '',
      isActive: false,
      plan_details: false,
      plan_id: '',
      name: '',
      add_benefit: false,
      plan: {},
      benefits: []
    };
  },

  methods: {
    addBenefit(){
      let payload = {
        name: this.name,
        plan_id: this.plan_id
      }
      this.$axios.post(`admin/create-plan-description/`, payload)
      .then((res)=>{
        console.log(res);
        this.findSinglePlan()
        this.name = ''
      })
      .catch((err)=>{
        console.log(err);
      })
      this.add_benefit = false
    },
    selectPlan(plan){
            this.isActive = ( this.isActive === plan.id ) ? null : plan.id;
            this.plan_details = ( this.plan_details === plan.id ) ? null : plan.id;
            this.plan_id = plan.id
            this.findSinglePlan();
        },
    async getSingleProduct() {
      try {
        let res = await this.$axios.get(`find-product/${this.id}`)
        this.product = res.data.product
        console.log(res.data);
        this.product_details = res.data
        this.similar_apps = res.data.similar_product
      } catch (error) {
        console.log(error);
      }
    },
    findSinglePlan(){
      this.$axios.get(`find-plan/${this.plan_id}`)
      .then((res)=>{
        console.log(res);
        this.plan = res.data
        this.benefits = res.data.plan.plan_descriptions
        console.log(this.benefits);
      })
      .catch((err)=>{
        console.log(err);
      })
    },
  },
  async created() {
    this.getSingleProduct();
  },
};
</script>

<style>
* {
  /* font-family: "Work Sans", sans-serif; */
  margin: 0;
  padding: 0;
}
 .close {
    font-size: 5rem;
    color: #fff;
    opacity: unset;
  }
  .modal-content {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    min-height: 100vh;
    border-radius: none !important;
    position: fixed;
    top: 0;
    left: 0;
  }
  .modal-header {
    border-bottom: none;
    padding: 0;
  }
  .modal-img {
    height: 25rem !important;
    width: 15rem !important;
  }
  .images button {
    border: none;
  }
.mobile__single__app {
  display: none;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.7rem;
}
.a,
.b,
.c,
.d,
.e,
.A,
.B,
.C,
.D,
.E {
  background-color: #ff0000;
  color: #fff;
}
.f,
.g,
.h,
.i,
.j,
.J,
.I,
.H,
.G,
.F {
  background-color: #ffb20f;
  color: #fff;
}
.K,
.L,
.M,
.N,
.O,
.P,
.m,
.n,
.o,
.p,
.k,
.l {
  background-color: #000;
  color: #fff;
}
.q,
.r,
.s,
.t,
.u,
.Q,
.R,
.S,
.T,
.U {
  background-color: #01445f;
  color: #fff;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}
.right__side p {
  color: #000;
  margin-top: 1rem;
}
.view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.btn__tag {
  background: #d2b68146;
  border: 1px solid #d2b681;
  color: #000;
  padding: 0.1rem 4rem !important;
  border-radius: 20px;
}
.feat__image img {
  /* object-fit: contain; */
  height: 100px;
  width: 100px;
}
.images div img {
  height: 150px;
  width: 100px;
  border-radius: 5px;
  object-fit: cover;
}
.vl {
  width: 0.2px;
  height: 3rem;
  background-color: #999;
}
.fa--download {
  font-size: 1.5rem;
}
.immg {
  height: 60px !important;
  width: 60px !important;
}
a:hover {
  text-decoration: none;
}
/* body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #000;
} */


.content--loader {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content--loader .loading {
  width: 80px;
  height: 50px;
  position: relative;
}
.content--loader .loading p {
  top: 0;
  padding: 0;
  margin: 0;
  color: #a67b3e;
  font-family: "Oxygen", sans-serif;
  animation: text 3.5s ease both infinite;
  font-size: 12px;
  letter-spacing: 1px;
}
@keyframes text {
  0% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }
  40% {
    letter-spacing: 2px;
    transform: translateX(26px);
  }
  80% {
    letter-spacing: 1px;
    transform: translateX(32px);
  }
  90% {
    letter-spacing: 2px;
    transform: translateX(0px);
  }
  100% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }
}
.content--loader .loading span {
  background-color: #a67b3e;
  border-radius: 50px;
  display: block;
  height: 16px;
  width: 16px;
  bottom: 0;
  position: absolute;
  transform: translateX(64px);
  animation: loading 3.5s ease both infinite;
}
.content--loader .loading span:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #d2b681;
  border-radius: inherit;
  animation: loading2 3.5s ease both infinite;
}
@keyframes loading {
  0% {
    width: 16px;
    transform: translateX(0px);
  }
  40% {
    width: 100%;
    transform: translateX(0px);
  }
  80% {
    width: 16px;
    transform: translateX(64px);
  }
  90% {
    width: 100%;
    transform: translateX(0px);
  }
  100% {
    width: 16px;
    transform: translateX(0px);
  }
}
@keyframes loading2 {
  0% {
    transform: translateX(0px);
    width: 16px;
  }
  40% {
    transform: translateX(0%);
    width: 80%;
  }
  80% {
    width: 100%;
    transform: translateX(0px);
  }
  90% {
    width: 80%;
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0px);
    width: 16px;
  }
}
@media (max-width: 990px) {
  .view {
    display: unset;
  }
  .web__single__app {
    display: none;
  }
  .mobile__single__app {
    display: unset;
  }
  h3,
  h4 {
    font-weight: bold;
  }
  .close {
    font-size: 5rem;
    color: #fff;
    opacity: unset;
  }
  .modal-content {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    min-height: 100vh;
    border-radius: none !important;
    position: fixed;
    top: 0;
    left: 0;
  }
  .modal-header {
    border-bottom: none;
    padding: 0;
  }
  .modal-img {
    height: 43rem !important;
    width: 23rem !important;
  }
  .images button {
    border: none;
  }
}
</style>