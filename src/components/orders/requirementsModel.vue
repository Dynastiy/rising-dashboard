<template>
    <div>
        <div>
            <div class="requirements" v-if="requirementsData">
                <!-- View requirement -->
                <div>
                    <h3 class="text-capitalize"> {{ requirementsData.business_name }} </h3>
                    <h6 class="text-capitalize"> {{ requirementsData.business_description }} </h6>

                    <div class="images">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="" alt="">
                            </div>
                            <div class="col-md-6">
                                <img src="" alt="">
                            </div>
                            <div class="col-md-6">
                                <img src="" alt="">
                            </div>
                            <div class="col-md-6">
                                <img src="" alt="">
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
    props:['requirementsData'],
    data(){
        return{
            requirement: false,
            value: '',
            id: this.$route.params.id
        }
    },
    methods: {
        
    },
    mounted() {
        // this.payload = this.requirementsData;
    }
}
</script>