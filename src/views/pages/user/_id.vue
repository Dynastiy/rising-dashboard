<template>
    <div>
        <div>
            <section class="">
		<div class="">
			<h1 class="mb-3">User</h1>
			<div class="bg-white shadow rounded-lg row">
				<div class=" border-right col-md-4 p-5">
					<div class="p-3">
						<div class="img-circle text-center mb-3">
							<img v-if="userData.profile_photo" src="img/user2.jpg" alt="Image" class="shadow">
                            <span class="span--user" v-else :class="userData.first_name.charAt(0)"> {{ userData.first_name.charAt(0) }} </span>
						</div>
						<h5 class="text-center">{{ userData.first_name }} {{ userData.last_name }}</h5>
                        <div class="d-flex align-items-center justify-content-center mt-2" style="gap:10px">
                            <div class="status ">
                                <div class="completed" v-if="userData.status === 'active' ">
                                    Active
                                </div>
                                <div class="cancelled" v-else>
                                    Banned
                                </div>
                                
                            </div>
                            <div class="verified">
                                <div class="cancelled" v-if="userData.verification_code === null ">
                                   Not Verified
                                </div>
                                <div class="completed" v-else>
                                    Verified
                                </div>
                            </div>
                        </div>
					</div>
				</div>
				
                <div class="col-md-8 p-5">
                    <h3 class="mb-4">User Details</h3>
                    <div>
                        <h5 class="text-secondary"> Name </h5>
                        <p > {{ userData.first_name }} {{ userData.last_name }} </p>
                    </div>
                    <hr>
                        <div>
                        <h5 class="text-secondary"> Email </h5>
                        <p> {{ userData.email }} </p>
                    </div>
                    <hr>
                        <div>
                        <h5 class="text-secondary"> Phone Number </h5>
                        <p> {{ userData.phone_no }} </p>
                    </div>
                    <hr>
                    <div>
                        <h5 class="text-secondary"> Country </h5>
                        <p> {{ userData.country }} </p>
                    </div>
                    <hr>
                    <div>
                        <h5 class="text-secondary"> About</h5>
                        <p> {{ userData.about }} </p>
                    </div>
                </div>
			</div>
		</div>
	</section>

        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            // userData: {
            //     first_name: '',
            //     last_name: '',
            //     phone_no: '',
            //     about: '',
            //     country: '',
            //     email: ''
            // },
            // credentials:{
			// 	old_password: '',
			// 	new_password: '',
            // },
            // countries: {},
            id: this.$route.params.id,
            userData: {}
        }
    },
    methods:{
       getUser(){
           this.$axios.get(`admin/find-user/${this.id}`)
           .then((res)=>{
               console.log(res.data.user);
               this.userData = res.data.user
           })
           .catch((err)=>{
               console.log(err);
           })
       }
    },
    mounted(){
        this.getUser()
    },
    computed:{
        
    }
}
</script>