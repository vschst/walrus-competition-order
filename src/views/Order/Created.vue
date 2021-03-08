<template>
  <v-container>
    <v-layout justify-center>
      <v-card class="pa-4 my-10" :width="800">
        <v-card-title class="mb-6">
          <h2 class="font-weight-black">
            Заявка успешно создана!
          </h2>
        </v-card-title>
        <v-card-subtitle>
          <p class="text-h6 font-weight-medium mb-6">
            С вами свяжется организатор соревнований для подтверждения участия.
          </p>
        </v-card-subtitle>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'OrderCreated'
})
</script>