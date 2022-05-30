<template>
    <div>
        <div>
            <div class="delivery mt-3 text-center" >
                <div v-for="delivered in deliveredFiles" :key="delivered.id">
                    <p class="text-capitalize mb-3 mt-3">{{ delivered.description }} </p>
                    <img :src='url + delivered.sample_file ' class="delivery--image" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {

    props:['deliveredFiles'],
    data(){
        return{
            url: 'https://api.risingwork.com/',
            id: this.$route.params.id
        }
    },
    mounted(){
        
    }
}
</script>