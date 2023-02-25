<script >
import Navigation from '../components/Navigation.vue';
import TheWelcome from '../components/TheWelcome.vue'
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
