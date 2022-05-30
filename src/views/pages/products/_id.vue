<template>
    <div>
        <div>
            <div class="viewProduct">
                View Product By Id
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            id: this.$route.params
        }
    }
}
</script>