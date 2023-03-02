<template lang="">
  <aside class="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
    <div class="flex flex-col justify-between h-full">
      <div class="flex-grow">
        <div class="px-4 py-6 text-center border-b">
          <h1 class="text-xl font-bold leading-none"><span class="text-yellow-700">Task Manager</span> App</h1>
        </div>
        <div class="p-4">
          <ul class="space-y-1">
            <li v-for="(item,index) in menus.Menu" :key="index">
              <router-link :to="item.slug" class="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="text-lg mr-4" viewBox="0 0 16 16">
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"></path>
                </svg>{{item.name}}
              </router-link>
            </li>
           
          </ul>
        </div>
      </div>
      <div class="p-4">
        <button type="button" class="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"  @click.prevent="logOut">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
          </svg>
        </button> <span class="font-bold text-sm ml-2">Logout</span>
      </div>
    </div>
  </aside>
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
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }

  },
};
</script>
<style lang="css" scope>
.router-link-exact-active {
  display: flex !important;
  font-weight: 700 !important;
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  background: rgb(254 240 138) !important;
  border-radius: 0.75rem !important;
  align-items: center !important;
}
</style>
