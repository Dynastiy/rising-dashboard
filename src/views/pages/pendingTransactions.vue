<template>
  <div>
    <h3 class="text-bold">Pending Transactions</h3>
    <div class="mt-4 other--tables">
      <div class="table-responsive">
        <table class="table table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Wallet Address </th>
              <th scope="col">Amount (NGN)</th>
              <th scope="col">Amount (BNB)</th>
              <th scope="col">Payment Proof</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              Fetching Data . . .
            </tr>
             <tr v-for="(deposit, index) in deposits.data" :key="index" v-else>
              <td> {{ index + 1 }} </td>
              <td>{{ timeStamp(deposit.created_at) }}</td>
              <td> {{ deposit.wallet_address }} </td>
              <td>&#8358;{{ nairaFilter(deposit.amount_naira) }}</td>
              <td>{{ deposit.amount_bnb }}BNB</td>
              <td>
                <a
                  target="_blank"
                  :href="'https://api.buybnb.io/' + deposit.payment_proof"
                >
                 View Proof
                </a>
              </td>
              <td>
                <span :class="[deposit.status]"> {{ deposit.status }} </span>
              </td>
              <td>
                <button
                  class="view--more mr-2"
                  @click="creditUser(deposit)"
                >
                  Credit
                </button>
                <button class="view--more bg-danger border-danger" @click="cancelDeposit(deposit)">Cancel</button>
              </td>
            </tr>
            <tr v-show="deposits.total === 0" class="text-danger">
              Nothing Here . . .
            </tr>
          </tbody>
        </table>
      </div>

       <div>
                          <pagination :meta="deposits" @next="getDeposits"/>
                        </div>
    </div>

    <!-- Modal to Credit User -->
    <div class="sure-modal" v-show="confirm_box">
      <div class="are-you-sure text-center">
        <h1>
          <!-- 💡⁉️ <br /> -->
          Credit User
        </h1>
         <div class="mt-3" v-if="loading2">
                <div class="center" >
                    <div class="form-input">
                    <div class="preview">
                        <img id="file-ip-1-preview" />
                    </div>
                    <label class="px-3 py-1" for="file-ip-1">Upload Proof</label>
                    <input
                        type="file"
                        id="file-ip-1"
                        accept="image/*"
                        @change="showPreview($event)"
                    />
                    </div>
                </div>
                <div class="mt-3">
                    <label for="">Description</label>
                    <div>
                        <input class="form-control" v-model="description" type="text" name="" id="">
                    </div>
                </div>
            </div>

            <div v-else>
                <p class="text-danger">Please Wait</p>
            </div>

        <div class="d-flex justify-content-center mt-3" style="gap: 10px">
          <button class="btn btn-success" @click="credit">Done</button
          ><button class="btn btn-danger" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  nairaFilter,
  percentFilter,
  percentageFilter,
  timeStamp,
} from "@/plugins/filter.js"; 
import pagination from '@/components/appPagination.vue'
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
      deposits: [],
      confirm_box: false,
      credit_proof : null,
      description: '',
      loading2: false,
    };
  },
  methods: {
    showPreview($event) {
      var input = event.target; 
      this.credit_proof = input.files[0];
      console.log(this.credit_proof);
      if ($event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
      }
    },
    async getDeposits(page=1) {
      this.loading = true;
      try {
        let res = await this.$axios.get(`/admin/get-deposits?page=${page}&status=pending`);
        console.log(res.data);
        this.deposits = res.data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async completeDeposit(){
      try {
        let formData = new FormData();
          formData.append("status", "completed");
          let res = await this.$axios.post('/admin/update-deposit-status/'+this.id, formData)
          console.log(res);
          this.getDeposits();
        } catch (error) {
          console.log(error);
        }
    },
    async cancelDeposit(deposit){
      try {
        let formData = new FormData();
          formData.append("status", "canceled");
          let res = await this.$axios.post('/admin/update-deposit-status/'+deposit.id, formData)
          console.log(res);
          this.getDeposits();
        } catch (error) {
          console.log(error);
        }
    },
    creditUser(deposit){
      this.id = deposit.id
        this.confirm_box = !this.confirm_box
    },
    closeModal(){
      this.confirm_box = !this.confirm_box
    },
  async credit(){
    this.loading2 = true;
       try {
        let formData = new FormData();
          formData.append("credit_proof", this.credit_proof);
          formData.append("description", this.description);
          let res = await this.$axios.post('/admin/credit-user/'+this.id, formData)
          console.log(res);
          this.completeDeposit()
          this.getDeposits();
        } catch (error) {
          console.log(error);
        }
        this.loading2 = false;
      this.confirm_box = !this.confirm_box
      this.getDeposits();
    }
  },
  async created() {
    this.getDeposits();
  },
};
</script>
