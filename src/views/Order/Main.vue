<template>
  <order-created v-if="isOrderCreated"/>
  <order-form v-else/>
</template>

<script lang="ts">
import Vue from 'vue'
import OrderForm from "./Form.vue";
import OrderCreated from "./Created.vue";

export default Vue.extend({
  name: 'OrderMain',
  components: {
    OrderForm,
    OrderCreated
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
})
</script>