<template lang="">
  <div class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
    <h1>Logo</h1>
    <ul class="flex flex-col-reverse">
      <li
        v-for="(item, index) in menus.Menu"
        :key="index"
        class="mt-0.5 w-full  p-4 pr-0"
      >
        
          <router-link  :to="item.slug" >
           
              {{ item.name }}
             </router-link>
        
      </li>
    </ul>
  </div>
</template>
<script>
import { axiosinstance } from "../api/api";

export default {
  name: "Navigation",
  // const params = 
  data() {

    return {
      menus: [],
      errors: [],

    };
  },
  mounted() {
    this.getMenu();

  },
  watch: {

  },
  methods: {
    getMenu() {
      axiosinstance.get("menu").then((res) => {
        console.log(res.data);
        this.menus = res.data;
      });
    },

  },
};
</script>
<style lang="css" scope>
.router-link-exact-active {
  color: blue;
}
</style>
