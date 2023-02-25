

<template>
  <router-view />
</template>

<script>

import DefaultLayout from "./Layout/DefaultLayout.vue";

export default {
  components: {

    DefaultLayout,
  },
  data() {
    return {
      layout: null,
    };
  },
  watch: {
    $route(to) {
      // set layout by route meta
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout
      } else {
        this.layout = "DefaultLayout"
      }
    },
  },
};
</script>
