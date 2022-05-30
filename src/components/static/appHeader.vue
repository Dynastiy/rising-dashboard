<template>
    <div>
        <div class="dashboard-app-header shadow-sm" id="dashboard--header">
            <div class="top--nav d-flex align-items-center justify-content-between">
                  <div class="menu--open">
                    <span class="material-icons" id="tog" style="font-size: 36px">
                        menu
                    </span>
                </div>
                
                <div class="d-flex align-items-center ml-auto" style="gap:20px">
                    <span class="material-icons">
                        notifications
                    </span>
                    <span v-if="getUser.first_name" class="user--avatar text-capitalize" :class="[getUser.first_name.charAt(0)]">
                       {{ getUser.first_name.charAt(0) }}
                    </span>
                    <div>
                      <span class="d-lg-block text-capitalize">{{ getUser.first_name }} {{ getUser.last_name }} </span>
                      <span @click="logout" role="button" class="small">Logout</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Logout Confirmation box -->
        <Logout @close="closeConfirmBox" v-show="logout_confirmation"/>

        <!-- App Drawer for MObile  -->
        <div class="main--app--drawer shadow-lg" id="side-bar">
            <div class="menu--close text-right p-3">
                <span class="material-icons" style="font-size: 36px">
                    close
                </span>
            </div>
      <div class="top--image text-center">
        <router-link to="/"><img src="@/assets/img/icon.svg" width="80" alt="" /></router-link>
      </div>
      <ul class="list-unstyled">
        <li v-for="item in menu" :key="item.id">
          <span class="menu--header"> {{ item.menu_header }} </span>
          <ul v-if="item.sub_menu">
            <li v-for="sub_item in item.sub_menu" :key="sub_item.id">
              <router-link :to="sub_item.url" class="align-items-center d-flex" style="gap:15px">
                <span class="material-icons">
                {{ sub_item.icon }}
                </span>
                <span> {{ sub_item.menu_item }} </span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javscript:void(0)" @click="logout">
            <span class="material-icons">
              power
            </span>
            <span>
              Logout
            </span>
          </a>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
import menu_items from "@/api/menu.js";
import Logout from '@/components/modals/logoutConfirm.vue'
export default {
  components:{
    Logout
  },
  data: () => {
    return {
      menu: menu_items,
      user: '',
      logout_confirmation: false
    };
  },
  methods:{
    logout(){
      this.logout_confirmation = !this.logout_confirmation
        },
        closeConfirmBox() {
        this.logout_confirmation = !this.logout_confirmation
        },
  },
   mounted(){
        const toggller = document.getElementById("tog");
        const sidee = document.getElementById('side-bar');
        // const closeMenu = document.getElementById('close-menu');
        const bodyEl = document.getElementsByTagName('body')[0]
        document.onclick = function(e) {
          if(e.target.id !== "tog" && e.target.id !== "side-bar"){
            sidee.classList.remove('active');
            bodyEl.classList.remove("active");
          }
        }
        toggller.onclick = function(){
        sidee.classList.toggle('active');
        bodyEl.classList.toggle("active")
        }
        // closeMenu.onclick = function(){
        // sidee.classList.remove('active');
        // bodyEl.classList.remove("active")
        // }
    },
    computed:{
      getUser(){
        return this.$store.getters.getUser;
      }
    }
    //  created: {
    //   getUser(){
    //     t
    //   }
    // }
}
</script>