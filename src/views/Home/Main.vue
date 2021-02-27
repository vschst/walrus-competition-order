<template>
  <v-container>
    <v-layout justify-center>
      <v-card class="pa-4 my-10" :loading="isLoading" width="1000">
        <template slot="progress">
          <div class="text-center my-10">
            <v-progress-circular
                :size="80"
                color="red"
                indeterminate
            ></v-progress-circular>
          </div>
        </template>
        <template v-if="!isLoading">
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
            <v-data-table
                :headers="ordersHeaders"
                :items="orders"
                hide-default-footer
                disable-pagination
            >
              <template #item.index="{ item }">
                {{ orders.indexOf(item) + 1 }}
              </template>
              <template #item.last_name="{ item }">
                <span class="font-weight-bold">
                  {{ getFullName(item.last_name, item.first_name, item.middle_name) }}
                </span>
              </template>
              <template #item.status="{ item }">
                <order-status :status="item.status"/>
              </template>
            </v-data-table>
          </v-card-text>
        </template>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import OrderStatus from '@/components/OrderStatus.vue'
import { Competitions } from "@/api";
import { getFullName } from "@/utils/members";
import { Order } from "./interfaces/order.interface";

export default Vue.extend({
  name: 'HomeMain',
  components: {
    OrderStatus
  },
  data() {
    return {
      isLoading: true,
      competition: {
        name: '',
        description: null
      },
      orders: [] as Order[],
      ordersHeaders: [
        {
          text: '#',
          value: 'index',
          sortable: false
        },
        {
          text: 'ФИО',
          value: 'last_name',
          sortable: true
        },
        {
          text: 'Клуб',
          value: 'club_name',
          sortable: true
        },
        {
          text: 'Город',
          value: 'location',
          sortable: true
        },
        {
          text: "Статус заявки",
          sortable: false,
          value: "status",
          align: "center"
        }
      ]
    }
  },
  async mounted() {
    await this.loadCompetitionOrdersData()
  },
  methods: {
    getFullName,
    async loadCompetitionOrdersData() {
      try {
        const { data } = await Competitions.getCompetitionPublicOrders()

        const { name, description, orders } = data

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