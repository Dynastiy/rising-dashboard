<template>
  <div>
    <div class="create-post-mask">
      <div class="create-post-container">
        <div class="create-post-content">
          <div v-if="!loading">
            <h2 class="font-weight-bold">Are you Sure?</h2>
            <p>You can always log back in at any time.</p>
            <div class="d-flex mt-3" style="gap:20px">
                <div class="">
              <button class="btn btn-danger main--btn w-100 py-1" @click="logout">
                Logout
              </button>
            </div>
            <div class="">
              <button class="btn btn-success following w-100 py-1" @click="close">
                Cancel
              </button>
            </div>
            </div>
          </div>
          <div v-else>
            <p>Logging out ...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue2";
export default {
  components: {
    // Icon,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async logout() {
      
    this.loading = true;
      try {
        let res = await this.$axios.post("/auth/signout/");
        console.log(res);
        this.$store.dispatch("logout");
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
      this.$router.replace("/sign-in");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
