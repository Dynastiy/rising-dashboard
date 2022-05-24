<template>
    <div>
        <app-header/>
        
        <app-drawer/>
        <div id="main--dashboard">
            <router-view/>
        </div>
    </div>
</template>

<script>
import AppDrawer from '@/components/static/appDrawer.vue'
import AppHeader from '@/components/static/appHeader.vue'
export default {
    components: {
        AppDrawer, AppHeader
    },
     async created(){
        if (!this.$store.getters.isLoggedIn) {
            this.$toastify({
          text: `Please Login`,
          className: "alert",
          style: {
            background: "red",
          },
        }).showToast();
      this.$router.push("/sign-in");
    }
   }
}
</script>