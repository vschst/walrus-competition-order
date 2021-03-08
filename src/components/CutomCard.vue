<template>
  <v-card class="pa-4 my-10" :loading="loading" :width="width">
    <template slot="progress">
      <div class="text-center my-10">
        <v-progress-circular
            :size="80"
            color="red"
            indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="!loading">
      <slot/>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CustomCard',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 1000
    }
  }
})
</script>