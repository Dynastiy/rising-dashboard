<template>
  <div>
    <div>

            
            <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="mb-3">
                     <button class="add--button d-flex align-items-center " style="gap:5px" @click="goBack()"> <span class="material-icons">
                        arrow_back_ios
                        </span> <span>Go Back</span></button>
                </div>
                <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-link active" id="nav-overview-tab" data-toggle="tab" href="#nav-overview" role="tab" aria-controls="nav-overview" aria-selected="true">Overview</a>
                    <a class="nav-link" id="nav-description-tab" data-toggle="tab" href="#nav-description" role="tab" aria-controls="nav-description" aria-selected="false">Description</a>
                    <a class="nav-link" id="nav-plans-tab" data-toggle="tab" href="#nav-plans" role="tab" aria-controls="nav-plans" aria-selected="false">Plans</a>
                    <a class="nav-link" id="nav-features-tab" data-toggle="tab" href="#nav-features" role="tab" aria-controls="nav-features" aria-selected="false">Features</a>
                    <a class="nav-link" id="nav-images-tab" data-toggle="tab" href="#nav-images" role="tab" aria-controls="nav-images" aria-selected="false">Images</a>
                </div>
            </nav>
            <div class="tab-content mt-3" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab">  <Overview /></div>
                <div class="tab-pane fade" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab"> <Description /> </div>
                <div class="tab-pane fade" id="nav-plans" role="tabpanel" aria-labelledby="nav-plans-tab"> <Plans/> </div>
                <div class="tab-pane fade" id="nav-features" role="tabpanel" aria-labelledby="nav-features-tab"> <Features/> </div>
                <div class="tab-pane fade" id="nav-images" role="tabpanel" aria-labelledby="nav-images-tab"> <Images /> </div>
            </div>
            </div>
        </div>
  </div>
</template>

<script>
import Overview from '@/components/product/overviewPage.vue'
import Images from '@/components/product/imagesPage.vue'
import Plans from '@/components/product/plansPage.vue'
import Description from '@/components/product/descriptionPage.vue'
import Features from '@/components/product/featuresPage.vue'
export default {
  name: "IdPage",
  components: {
    Overview, Images, Plans, Description, Features
  },
  data() {
    return {
      
    };
  },

  methods: {
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>

