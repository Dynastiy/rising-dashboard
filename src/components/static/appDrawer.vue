<template>
  <div>
    <div class="main--app--drawer shadow-lg">
      <div class="top--image text-center">
        <img src="@/assets/img/rising.svg" width="150" alt="" />
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
      </ul>
    </div>
  </div>
</template>


<script>
import menu_items from "@/api/menu.js";
export default {
  data: () => {
    return {
      menu: menu_items,
    };
  },
};
</script>