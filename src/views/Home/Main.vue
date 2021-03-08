<template>
  <v-container fill-height>
    <v-layout justify-center>
      <custom-card class="align-self-center" :loading="isLoading" :width="1000">
        <v-card-title class="mb-6">
          <h1 class="font-weight-black">
            {{ competition.name }}
          </h1>
        </v-card-title>
        <v-card-subtitle>
          <h1 class="font-weight-medium mb-2">
            Список участников
          </h1>
        </v-card-subtitle>
        <v-card-text>
          <orders-table :orders="orders"/>
        </v-card-text>
      </custom-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Competitions } from '@/api'
import { Orders } from "@/api";
import OrdersTable from "@/components/OrdersTable.vue";
import { Order } from "@/components/interfaces/order.interface";
import CustomCard from "@/components/CutomCard.vue"

export default Vue.extend({
  name: 'HomeMain',
  components: {
    OrdersTable,
    CustomCard
  },
  data() {
    return {
      isLoading: true,
      competition: {
        id: null,
        name: '',
        description: null
      },
      orders: [] as Order[],
    }
  },
  async mounted() {
    await this.loadOrdersData()
  },
  methods: {
    async loadOrdersData() {
      try {
        const response = await Promise.all([
          Competitions.getCompetitionData(),
          Orders.getPublicOrders()
        ])
        const { data: competition } = response[0]
        const { data: orders } = response[1]
        const { id, name, description } = competition

        this.competition.id = id
        this.competition.name = name
        this.competition.description = description
        this.orders = orders
        this.isLoading = false
      }
      catch (error) {
        console.error(error)
      }
    }
  }
})
</script>