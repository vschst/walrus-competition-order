<template>
  <v-chip :color="statusColor" label small>
    {{ statusText }}
  </v-chip>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "OrderStatus",
  props: {
    status: {
      type: String,
      default: "new"
    }
  },
  computed: {
    statusColor() {
      switch (this.status) {
        case "rejected":
          return "red";
        case "accepted":
          return "green";
        case "new":
        case "payment":
          return "yellow";
      }

      return null;
    },
    statusText() {
      switch (this.status) {
        case "rejected":
          return "Отклонена";
        case "accepted":
          return "Принята";
        case "new":
        case "payment":
          return "Требует оплаты";
      }

      return "";
    }
  }
});
</script>
