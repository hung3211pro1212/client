<script >
import Navigation from '../components/Navigation.vue';
 export default {
  name: 'DefaultLayout',
  components: {
    Navigation
  }
}


</script>

<template>
  <div class=" ">

    <Navigation />

    <main class="col-span-3">
      <router-view />
    </main>
  </div>
</template>
