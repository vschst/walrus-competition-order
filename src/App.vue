<template>
  <v-app id="app">
    <navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  components: {
    Navbar
  }
})
</script>

<style lang="scss">
#app {
  background: #0E0E2C;
  color: #2c3e50;
}
</style>
