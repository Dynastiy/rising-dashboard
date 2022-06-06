<template>
  <div>
    <section class="mt-4">
      <h3 class="text-bold">User List</h3>
      <div class="mt-4 other--tables">
        <div class="search--field d-flex align-items-center ml-auto">
          <span class="material-icons"> search </span>
          <input
            type="search"
            v-model="search_data"
            name=""
            id=""
            placeholder="Search by name. . . "
            @keyup="getUser"
          />
        </div>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                Fetching Data . . .
              </tr>
              <tr v-for="(user, index) in users.data" :key="index" v-else>
                <td> {{ index + 1 }} </td>
                <!-- <td>{{ user.id }}</td> -->
                <td class="text-capitalize">{{ user.first_name }} {{ user.last_name }} </td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone_no }}</td>
                <td>
                  <span class="user" :class="[user.status]"> {{ user.status }} </span>
                </td>
                <td class="d-flex align-items-center " style="gap:20px">
                  <button
                    class="ban font-weight-bold new-button"
                    v-if="user.status === 'active'"
                    @click="showModal(user)"
                  >
                    Ban
                  </button>
                  <button
                    @click="showModal2(user)"
                    class="unban font-weight-bold new-button"
                    v-else
                  >
                    Activate
                  </button>
                  <button v-if="user.role == 'buyer' " class="add--button btn-dark btn" @click="makeDesigner(user)">Make Designer</button>
                  <button class="btn add--button btn-dark" @click="goToUser(user)">
                            View More
                        </button>                       
                </td>
                
              </tr>
              <tr v-show="users.total === 0" class="text-danger">
                Nothing Here . . .
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pagination :meta="users" @next="getUsers"/>
        </div>
      </div>
    </section>

    <!-- loading Modal -->
    <div class="loader" v-show="loader">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Modal to Confirm Ban or Unban User -->
    <div class="sure-modal" v-show="confirm_box">
      <div class="are-you-sure text-center">
        <h1>
          💡⁉️ <br />
          Are you Sure?
        </h1>
        <div class="d-flex justify-content-center mt-3" style="gap: 10px">
          <button class="btn btn-success" @click="userAction">Yes</button
          ><button class="btn btn-danger" @click="closeModal">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/appPagination.vue'
import {
  nairaFilter,
  percentFilter,
  percentageFilter,
  timeStamp,
} from "@/plugins/filter.js";
export default {
  components:{
    pagination
  },
  data() {
    return {
      nairaFilter,
      percentFilter,
      percentageFilter,
      timeStamp,
      loading: false,
      users: [],
      search_data: "",
      confirm_box: false,
      action: '',
      id: '',
      loader: false,  
    };
  },
  methods: {
    goToUser(user){
      this.$router.push({name:'user-details', params: { id: user.id } })
    },
    async getUsers(page = 1) {
      this.loading = true;
      try {
        let res = await this.$axios.get(`/admin/get-users/?page=${page}`)
        console.log(res.data);
        this.users = res.data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    makeDesigner(user){
      let payload = { role: 'designer' }
      this.loader = true;
      this.$axios.post(`admin/edit-user-role/${user.id}`, payload)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        this.loader = false
        this.getUsers()
      })
    },
    async getUser() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `/admin/get-users?name=${this.search_data}`
        );
        console.log(res.data);
        this.users = res.data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async userAction(){
      // let status = this.action
      // console.log(status)
      let formData = new FormData()
      formData.append("status", this.action)
      try {
        let res = await this.$axios.post(
          `/admin/edit-user-status/${this.id}`, formData
        );
        console.log(res.data);
        this.getUsers();
        this.confirm_box = false;
        this.$toastify({
          text: `${res.data.message}`,
          className: "info",
          style: {
            background: "green",
          },
        }).showToast();
      } catch (error) {
        console.log(error);
        this.confirm_box = false
      }
    },
    closeModal(){
      this.confirm_box = !this.confirm_box
    },
    showModal(user){
      this.confirm_box = !this.confirm_box
      this.action = "banned";
      this.id = user.id
      console.log(user.id);
    },
    showModal2(user){
      this.confirm_box = !this.confirm_box
      this.action = "unbanned";
      console.log(user.id);
      this.id = user.id
    }
  },
  async created() {
    this.getUsers();
  },
};
</script>
