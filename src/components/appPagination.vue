<template>
    <div>
        <div class="pagination__page">
       
                <button class="   mr-3" @click="nextPage(page=1)" v-if="meta.current_page > 1 "> First</button>
            
                <a class="mr-3" @click="nextPage(meta.current_page - 1)"  v-if="meta.current_page > 1 " > &laquo; </a>
            
             <ul class="list-unstyled d-flex paged align-items-center m-0">
                <li v-for="page in meta.last_page" :key="page">
                    <a class="mr-3" @click.prevent="nextPage(page)" :class="{current: meta.current_page === page }"  v-if="Math.abs(page - meta.current_page) < 5 ||  page === 10 || page == meta.last_page - 1 || page == 0"> {{ page }} </a>
                </li>
             </ul>

             <!-- <div class=" ml-3">
               <span> Page {{meta.current_page}} </span> of <span> {{ meta.last_page }} </span>
             </div> -->

            
                <a class="" @click="nextPage(meta.current_page+1)" v-if="meta.current_page !== meta.last_page "> &raquo; </a>
            
                <button class="ml-3 " @click="nextPage(meta.last_page)"  v-if="meta.current_page !== meta.last_page "> Last </button>

        
    </div>
    </div>
</template>

<script>
// import helpers from '@/helpers/index.js'
export default {
  props:[
'meta'
  ],
    data(){
        return{
            // pages: {},
            // page: this.$route.query.page,
        }
    },
    methods:{
     nextPage(page) {
      this.$emit('next', page)
    },
  },
  async created(){
    // this.getPages();
  }
    
}
</script>

<style>
 .paged a.first::after {
  content:'...'
}

.paged a.last::before {
  content:'...'
}
</style>