<template>
  <v-app id="order-app">
    <order-created v-if="isOrderCreated"/>
    <order-form v-else/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import OrderCreated from "./components/OrderCreated.vue";
import OrderForm from './components/OrderForm.vue';

export default Vue.extend({
  name: 'App',
  components: {
    OrderCreated,
    OrderForm
  },
  data() {
    return {
      isOrderCreated: false
    }
  },
  mounted() {
    this.$root.$on('onOrderCreatedSuccessfully', () => {
      this.isOrderCreated = true
    })
  }
});
</script>

<style lang="scss">
#order-app {
  background: #0E0E2C;
}
</style>
