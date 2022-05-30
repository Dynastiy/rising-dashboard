<template>
    <div>
        <div>
            <div class="messages mt-4">
                <div class="text-right mb-3">
                    <span title="Refresh Messages" role="button" @click="refreshMessages">
                        <!-- <IconComponent icon="bx:refresh" style="font-size:36px"/> -->
                    </span>
                </div>
                <div class="chat--area">
                    <div class="chat--screen">
                        <div class="message--content" :class="{'active': loggedInuser !== chat.user_id }"  v-for="chat in chats" :key="chat.id">
                            <p>{{ chat.message }}</p>
                            <small class="text-muted" style="font-size: 0.7rem"> {{ timeStamp(chat.created_at) }} </small>
                        </div>
                    </div>
                    <div class="message--area" >
                        <input type="text" placeholder="Write Something" v-model="payload.message">
                        <div style="background-color: var(--primary-color);" class="d-flex align-items-center p-2" role="button" @click="sendMessage"> 
                            <!-- <IconComponent icon="fluent:send-24-filled" style="font-size:20px; color: #fff"/> -->
                            <span class="material-icons" style=" color: #fff" >
                                send
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {createRef, timeStamp} from '@/plugins/filter'
export default {
    props:['chats'],
    data(){
        return{
            createRef, timeStamp,
             isAdmin: false,
             loggedInuser: '',
            payload: {
                message: '',
                order_id: this.$route.params.id,
            }
        }
    },
    methods:{
        sendMessage(){
        this.$axios.post('/send-message', this.payload)
        .then((res)=>{
            console.log(res);
            this.isAdmin = true
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            this.$emit('reload');
            this.payload = {};
        })
    },
    refreshMessages(){
        this.$emit('reload');
    }
    },
    beforeMount(){
        this.loggedInuser = this.$store.getters.getUser.id;
    }
}
</script>

