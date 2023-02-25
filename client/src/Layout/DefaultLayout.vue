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
    <main>
      <div class="relative md:ml-64 bg-blueGray-100">
        <div class=" md:px-10 mx-auto w-full  mt-4">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
