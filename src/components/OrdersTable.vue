<template>
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
    <template #item.birthdate="{ item }">
      {{ getAgeFromBirthdate(item.birthdate) }}
    </template>
    <template #item.status="{ item }">
      <order-status :status="item.status"/>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Order } from "./interfaces/order.interface";
import { getFullName, getAgeFromBirthdate } from "@/utils/members";
import OrderStatus from '@/components/OrderStatus.vue'
import { DataTableHeader } from "vuetify";

export default Vue.extend({
  name: 'OrdersTable',
  props: {
    orders: {
      type: Array as PropType<Order[]>,
      required: true
    },
    hideStatus: {
      type: Boolean,
      default: false
    }
  },
  components: {
    OrderStatus
  },
  data() {
    const ordersHeaders = [
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
        text: 'Возраст',
        value: 'birthdate',
        sort: (a: any, b: any) => {
          const ageA = getAgeFromBirthdate(a)
          const ageB = getAgeFromBirthdate(b)

          if (ageA == ageB) {
            return 0
          }
          else if (ageA < ageB) {
            return -1
          }
          else {
            return 1
          }
        }
      }
    ] as DataTableHeader[]

    if (!this.hideStatus) {
      ordersHeaders.push({
        text: "Статус заявки",
        sortable: false,
        value: "status",
        align: "center"
      })
    }

    return {
      ordersHeaders
    }
  },
  methods: {
    getFullName,
    getAgeFromBirthdate
  }
})
</script>